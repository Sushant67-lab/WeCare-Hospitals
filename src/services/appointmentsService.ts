import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  deleteDoc, 
  query, 
  where,
  onSnapshot
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType, auth } from '../firebase/config';
import { Appointment } from '../types';
import { getStoredAppointments } from '../utils/storage';

const APPOINTMENTS_KEY = 'wecare_hospitals_appointments_v1';

/**
 * Deeply strips undefined properties from an object so Firestore setDoc/updateDoc never rejects.
 */
export function sanitizeForFirestore(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) {
      continue;
    }
    if (value !== null && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      result[key] = sanitizeForFirestore(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}

export async function createAppointmentInFirestore(
  appointmentData: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'> & { status?: 'pending' | 'confirmed' | 'cancelled' | 'completed' },
  userId?: string
): Promise<Appointment> {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `WCH-2026-${randomSuffix}`;
  const id = `apt-${Date.now()}-${randomSuffix}`;
  
  const currentAuthUser = auth.currentUser;
  const effectiveUserId = userId || currentAuthUser?.uid || 'guest';

  // Bookings are recorded with 'pending' status by default until reviewed and confirmed by the administrator
  const newAppointment: Appointment = {
    patientName: appointmentData.patientName || '',
    patientPhone: appointmentData.patientPhone || '',
    patientEmail: appointmentData.patientEmail || '',
    age: appointmentData.age ?? 30,
    gender: appointmentData.gender || 'other',
    departmentId: appointmentData.departmentId || '',
    departmentName: appointmentData.departmentName || '',
    doctorId: appointmentData.doctorId || 'any',
    doctorName: appointmentData.doctorName || 'Any Available Specialist',
    doctorTitle: appointmentData.doctorTitle || 'Consultant Physician',
    date: appointmentData.date || '',
    timeSlot: appointmentData.timeSlot || '',
    consultationType: appointmentData.consultationType || 'in_person',
    symptoms: appointmentData.symptoms || '',
    notes: appointmentData.notes ?? '',
    adminNotes: appointmentData.adminNotes ?? '',
    fee: appointmentData.fee ?? 120,
    id,
    userId: effectiveUserId,
    referenceNumber,
    status: appointmentData.status || 'pending',
    createdAt: new Date().toISOString()
  };

  const path = `appointments/${id}`;
  const cleanData = sanitizeForFirestore(newAppointment);

  try {
    const docRef = doc(db, 'appointments', id);
    await setDoc(docRef, cleanData);
    console.log(`[Firestore Success] Stored appointment ${id} in Firestore:`, cleanData);
  } catch (err) {
    console.warn('[Firestore Warn] Could not save appointment to Firestore cloud, saving to local cache:', err);
    try {
      handleFirestoreError(err, OperationType.CREATE, path);
    } catch (e) {
      // Diagnostic logged
    }
  }

  // Also save in local storage for instant offline resilience
  try {
    const local = getStoredAppointments();
    const updated = [newAppointment, ...local.filter(a => a.id !== id)];
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Local cache error:', e);
  }

  return newAppointment;
}

export async function fetchUserAppointments(userId: string): Promise<Appointment[]> {
  const path = 'appointments';
  try {
    const q = query(collection(db, 'appointments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const firestoreAppts: Appointment[] = [];
    querySnapshot.forEach((docSnap) => {
      firestoreAppts.push(docSnap.data() as Appointment);
    });

    if (firestoreAppts.length > 0) {
      return firestoreAppts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }
  } catch (err) {
    console.warn('Failed to fetch from Firestore, falling back to local cache:', err);
    try {
      handleFirestoreError(err, OperationType.GET, path);
    } catch (e) {
      // Diagnostic logged
    }
  }

  // Fallback to local storage
  const local = getStoredAppointments();
  return local.filter(apt => !apt.userId || apt.userId === userId);
}

export function subscribeToUserAppointments(
  userId: string,
  onUpdate: (appointments: Appointment[]) => void
) {
  const path = 'appointments';
  const q = query(collection(db, 'appointments'), where('userId', '==', userId));
  
  return onSnapshot(
    q,
    (querySnapshot) => {
      const appts: Appointment[] = [];
      querySnapshot.forEach((docSnap) => {
        appts.push(docSnap.data() as Appointment);
      });
      appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // If Firestore has documents, update with them
      if (appts.length > 0) {
        onUpdate(appts);
      } else {
        // Fallback to local
        const local = getStoredAppointments().filter(a => !a.userId || a.userId === userId);
        if (local.length > 0) onUpdate(local);
      }
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (e) {
        console.warn('Subscription error handled:', e);
      }
      const local = getStoredAppointments().filter(a => !a.userId || a.userId === userId);
      onUpdate(local);
    }
  );
}

// Admin: Subscribe to ALL hospital appointments across all patients
export function subscribeToAllAppointments(
  onUpdate: (appointments: Appointment[]) => void
) {
  const path = 'appointments';
  const colRef = collection(db, 'appointments');

  return onSnapshot(
    colRef,
    (querySnapshot) => {
      const appts: Appointment[] = [];
      querySnapshot.forEach((docSnap) => {
        appts.push(docSnap.data() as Appointment);
      });
      // Sort newest first
      appts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // If Firestore has documents, update with them
      if (appts.length > 0) {
        onUpdate(appts);
      } else {
        // Fallback to all local appointments
        const local = getStoredAppointments();
        onUpdate(local);
      }
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.GET, path);
      } catch (e) {
        console.warn('Admin subscription fallback to local storage:', e);
      }
      const local = getStoredAppointments();
      onUpdate(local);
    }
  );
}

// Admin: Update appointment status (confirm, cancel, complete, or reschedule)
export async function updateAppointmentStatusByAdmin(
  id: string,
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed',
  adminNotes?: string
): Promise<void> {
  const path = `appointments/${id}`;
  const payload: Record<string, any> = { 
    status,
    updatedAt: new Date().toISOString()
  };
  if (adminNotes !== undefined) {
    payload.adminNotes = adminNotes;
  }

  const cleanPayload = sanitizeForFirestore(payload);

  try {
    const docRef = doc(db, 'appointments', id);
    // Use merge: true so if document doesn't exist yet, it is created with status
    await setDoc(docRef, cleanPayload, { merge: true });
    console.log(`[Firestore Success] Updated appointment ${id} to ${status} in Firestore`);
  } catch (err) {
    console.warn('Failed to update Firestore status, updating local storage:', err);
    try {
      handleFirestoreError(err, OperationType.UPDATE, path);
    } catch (e) {
      // Handled
    }
  }

  // Update in local cache
  try {
    const local = getStoredAppointments();
    const updated = local.map(a => {
      if (a.id === id) {
        return { 
          ...a, 
          status, 
          adminNotes: adminNotes !== undefined ? adminNotes : a.adminNotes 
        };
      }
      return a;
    });
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Local cache error:', e);
  }
}

export async function cancelAppointmentInDb(id: string): Promise<void> {
  await updateAppointmentStatusByAdmin(id, 'cancelled');
}

export async function deleteAppointmentInDb(id: string): Promise<void> {
  const path = `appointments/${id}`;
  try {
    const docRef = doc(db, 'appointments', id);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Failed to delete in Firestore, deleting locally:', err);
    try {
      handleFirestoreError(err, OperationType.DELETE, path);
    } catch (e) {
      // Handled
    }
  }

  // Update local
  try {
    const local = getStoredAppointments();
    const updated = local.filter(a => a.id !== id);
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Local cache error:', e);
  }
}

/**
 * Syncs any offline / cached appointments to Firestore to ensure cloud database has all records.
 */
export async function syncLocalAppointmentsToFirestore(): Promise<void> {
  try {
    const local = getStoredAppointments();
    if (!local || local.length === 0) return;

    for (const apt of local) {
      try {
        const clean = sanitizeForFirestore({
          ...apt,
          notes: apt.notes ?? '',
          adminNotes: apt.adminNotes ?? ''
        });
        const docRef = doc(db, 'appointments', apt.id);
        await setDoc(docRef, clean, { merge: true });
      } catch (e) {
        // Continue syncing other items
      }
    }
  } catch (err) {
    console.warn('Could not sync local cache to Firestore:', err);
  }
}
