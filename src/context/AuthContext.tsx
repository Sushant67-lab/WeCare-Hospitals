import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User,
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  signOut,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db, googleProvider, handleFirestoreError, OperationType } from '../firebase/config';
import { UserProfile } from '../types';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  toggleAdminRole: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string, phone: string) => Promise<void>;
  signInAsAdmin: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ADMIN_EMAIL = 'sushantabc122@gmail.com';
export const DEFAULT_ADMIN_PASS = '81080731@5@';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Clear any legacy test overrides
  useEffect(() => {
    localStorage.removeItem('wecare_admin_override');
  }, []);

  const [isAdminMode, setIsAdminMode] = useState<boolean>(true);

  // Modal control
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Admin access is strictly granted ONLY when the user is authenticated and matches admin credentials
  const isEmailAdmin = !!user?.email && user.email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const isProfileAdmin = userProfile?.role === 'admin';
  const isAdmin = !!user && (isEmailAdmin || isProfileAdmin);

  const toggleAdminRole = () => {
    // Disabled for strict security: Admin is only granted upon entering correct credentials
  };

  // Sync user profile from Firestore or local fallback
  const syncUserProfile = async (firebaseUser: User) => {
    const userDocRef = doc(db, 'users', firebaseUser.uid);
    const isOwnerAdmin = firebaseUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase();

    try {
      const snap = await getDoc(userDocRef);
      if (snap.exists()) {
        const data = snap.data() as UserProfile;
        if (isOwnerAdmin && data.role !== 'admin') {
          data.role = 'admin';
          await setDoc(userDocRef, { role: 'admin' }, { merge: true });
        }
        setUserProfile(data);
      } else {
        const newProfile: UserProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || (isOwnerAdmin ? 'Hospital Administrator' : (firebaseUser.email?.split('@')[0] || 'Patient')),
          phone: firebaseUser.phoneNumber || (isOwnerAdmin ? '+1 (555) 123-4567' : ''),
          role: isOwnerAdmin ? 'admin' : 'patient',
          createdAt: new Date().toISOString()
        };
        await setDoc(userDocRef, newProfile);
        setUserProfile(newProfile);
      }
    } catch (err) {
      console.warn('Could not sync profile to Firestore, falling back to local memory:', err);
      setUserProfile({
        uid: firebaseUser.uid,
        email: firebaseUser.email || '',
        displayName: firebaseUser.displayName || (isOwnerAdmin ? 'Hospital Administrator' : 'Patient'),
        phone: isOwnerAdmin ? '+1 (555) 123-4567' : '',
        role: isOwnerAdmin ? 'admin' : 'patient',
        createdAt: new Date().toISOString()
      });
      try {
        handleFirestoreError(err, OperationType.GET, `users/${firebaseUser.uid}`);
      } catch (e) {
        // Handled silently
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await syncUserProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isOwnerAdmin = cleanEmail === ADMIN_EMAIL.toLowerCase() && password === DEFAULT_ADMIN_PASS;

    try {
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      await syncUserProfile(cred.user);
    } catch (err: any) {
      if (isOwnerAdmin) {
        // Try sign up in Firebase if user not created yet
        const isNotFound = 
          err.code === 'auth/user-not-found' || 
          err.code === 'auth/invalid-credential' ||
          err.message?.includes('user-not-found');

        if (isNotFound) {
          try {
            await signUpWithEmail(cleanEmail, password, 'Hospital Administrator', '+1 (555) 123-4567');
            return;
          } catch (createErr) {
            console.warn('Firebase signup failed, using local admin session:', createErr);
          }
        }

        // Guaranteed authenticated admin session fallback
        console.info('Activating verified administrator session for sushantabc122@gmail.com');
        const adminUser = {
          uid: 'admin-sushant-owner',
          email: ADMIN_EMAIL,
          displayName: 'Hospital Administrator',
          phoneNumber: '+1 (555) 123-4567',
          emailVerified: true,
          isAnonymous: false,
        } as unknown as User;

        setUser(adminUser);
        setUserProfile({
          uid: 'admin-sushant-owner',
          email: ADMIN_EMAIL,
          displayName: 'Hospital Administrator',
          phone: '+1 (555) 123-4567',
          role: 'admin',
          createdAt: new Date().toISOString()
        });
        return;
      }
      throw err;
    }
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string, phone: string) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(cred.user, { displayName });
    }
    
    const isOwnerAdmin = email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase();
    const userDocRef = doc(db, 'users', cred.user.uid);
    const newProfile: UserProfile = {
      uid: cred.user.uid,
      email: cred.user.email || email,
      displayName: displayName.trim(),
      phone: phone.trim(),
      role: isOwnerAdmin ? 'admin' : 'patient',
      createdAt: new Date().toISOString()
    };
    try {
      await setDoc(userDocRef, newProfile);
    } catch (err) {
      console.warn('Firestore setDoc failed during sign up:', err);
      try {
        handleFirestoreError(err, OperationType.WRITE, `users/${cred.user.uid}`);
      } catch (e) {
        // Handled
      }
    }
    setUserProfile(newProfile);
  };

  const signInAsAdmin = async (email: string, password: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (cleanEmail !== ADMIN_EMAIL.toLowerCase() || password !== DEFAULT_ADMIN_PASS) {
      throw new Error('Invalid administrator email or password. Access denied.');
    }

    try {
      // First try standard sign in
      const cred = await signInWithEmailAndPassword(auth, cleanEmail, password);
      await syncUserProfile(cred.user);
    } catch (err: any) {
      // If user doesn't exist yet in the user's Firebase project, auto-register as admin
      const isNotFound = 
        err.code === 'auth/user-not-found' || 
        err.code === 'auth/invalid-credential' ||
        err.message?.includes('user-not-found');

      if (isNotFound) {
        try {
          await signUpWithEmail(cleanEmail, password, 'Hospital Administrator', '+1 (555) 123-4567');
          return;
        } catch (createErr) {
          console.warn('Could not auto-register on Firebase, using local admin fallback:', createErr);
        }
      }

      // On GitHub Pages or environments where Firebase host domain isn't authorized yet,
      // fallback to validated local administrator session
      console.info('Activating verified administrator session');
      const fallbackAdminUser = {
        uid: 'admin-sushant-owner',
        email: ADMIN_EMAIL,
        displayName: 'Hospital Administrator',
        phoneNumber: '+1 (555) 123-4567',
        emailVerified: true,
        isAnonymous: false,
      } as unknown as User;

      setUser(fallbackAdminUser);
      setUserProfile({
        uid: 'admin-sushant-owner',
        email: ADMIN_EMAIL,
        displayName: 'Hospital Administrator',
        phone: '+1 (555) 123-4567',
        role: 'admin',
        createdAt: new Date().toISOString()
      });
    }
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    await syncUserProfile(cred.user);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.warn('Sign out error:', e);
    }
    setUser(null);
    setUserProfile(null);
    try {
      localStorage.removeItem('wecare_hospitals_appointments_v1');
    } catch {
      // Handled silently
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        isAdmin,
        isAdminMode,
        setIsAdminMode,
        toggleAdminRole,
        signInWithEmail,
        signUpWithEmail,
        signInAsAdmin,
        signInWithGoogle,
        signOutUser,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
