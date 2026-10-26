import React, { useState, useEffect } from 'react';
import { PageView, Doctor, Department, Appointment } from './types';
import { DEPARTMENTS, DOCTORS } from './data/hospitalData';
import { getStoredAppointments } from './utils/storage';
import { 
  fetchUserAppointments, 
  subscribeToUserAppointments, 
  subscribeToAllAppointments,
  cancelAppointmentInDb, 
  deleteAppointmentInDb 
} from './services/appointmentsService';

import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { EmergencyModal } from './components/EmergencyModal';
import { DoctorDetailModal } from './components/DoctorDetailModal';
import { DepartmentDetailModal } from './components/DepartmentDetailModal';
import { AppointmentPassModal } from './components/AppointmentPassModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { BookAppointmentPage } from './pages/BookAppointmentPage';
import { MyAppointmentsPage } from './pages/MyAppointmentsPage';
import { AdminPortalPage } from './pages/AdminPortalPage';

function HospitalApp() {
  const { user, isAdmin } = useAuth();

  // Page view state
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [allHospitalAppointments, setAllHospitalAppointments] = useState<Appointment[]>([]);

  // Selected entities for modals & flows
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState<Doctor | null>(null);
  const [selectedDeptForModal, setSelectedDeptForModal] = useState<Department | null>(null);
  const [doctorForBooking, setDoctorForBooking] = useState<Doctor | null>(null);
  const [departmentForBooking, setDepartmentForBooking] = useState<Department | null>(null);
  const [activePassAppointment, setActivePassAppointment] = useState<Appointment | null>(null);

  // Emergency Modal state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Sync user appointments with Firebase when user changes
  useEffect(() => {
    if (user) {
      const unsubscribe = subscribeToUserAppointments(user.uid, (userAppts) => {
        setAppointments(userAppts);
      });
      return () => unsubscribe();
    } else {
      const local = getStoredAppointments();
      setAppointments(local);
    }
  }, [user]);

  // Always subscribe to all hospital appointments if Admin
  useEffect(() => {
    if (isAdmin) {
      const unsubscribe = subscribeToAllAppointments((allAppts) => {
        setAllHospitalAppointments(allAppts);
      });
      return () => unsubscribe();
    }
  }, [isAdmin]);

  // Hash-based routing synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageView;
      const validPages: PageView[] = ['home', 'about', 'departments', 'doctors', 'book', 'appointments', 'admin'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookWithDoctor = (doctor: Doctor) => {
    setDoctorForBooking(doctor);
    setDepartmentForBooking(null);
    handleNavigate('book');
  };

  const handleBookDepartment = (dept: Department) => {
    setDepartmentForBooking(dept);
    setDoctorForBooking(null);
    handleNavigate('book');
  };

  const handleAppointmentCreated = (newAppointment: Appointment) => {
    setAppointments(prev => [newAppointment, ...prev.filter(a => a.id !== newAppointment.id)]);
    setAllHospitalAppointments(prev => [newAppointment, ...prev.filter(a => a.id !== newAppointment.id)]);
    setActivePassAppointment(newAppointment);
  };

  const handleCancelAppointment = async (id: string) => {
    await cancelAppointmentInDb(id);
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a));
    setAllHospitalAppointments(prev => prev.map(a => a.id === id ? { ...a, status: 'cancelled' as const } : a));
  };

  const handleDeleteAppointment = async (id: string) => {
    await deleteAppointmentInDb(id);
    setAppointments(prev => prev.filter(a => a.id !== id));
    setAllHospitalAppointments(prev => prev.filter(a => a.id !== id));
  };

  const handleAdminStatusChange = (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => {
    setAllHospitalAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
  };

  const activeCount = appointments.filter(a => a.status === 'confirmed').length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900 w-full max-w-full overflow-x-hidden">
      
      {/* 3-Zone Navigation Header */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        appointmentsCount={activeCount}
      />

      {/* Main Page Content */}
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
            onSelectDepartment={(dept) => setSelectedDeptForModal(dept)}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
          />
        )}

        {currentPage === 'departments' && (
          <DepartmentsPage
            onNavigate={handleNavigate}
            onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
            onSelectDepartment={(dept) => setSelectedDeptForModal(dept)}
            onBookDepartment={handleBookDepartment}
          />
        )}

        {currentPage === 'doctors' && (
          <DoctorsPage
            onNavigate={handleNavigate}
            onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
            onBookWithDoctor={handleBookWithDoctor}
          />
        )}

        {currentPage === 'book' && (
          <BookAppointmentPage
            initialDoctor={doctorForBooking}
            initialDepartment={departmentForBooking}
            onAppointmentCreated={handleAppointmentCreated}
          />
        )}

        {currentPage === 'appointments' && (
          <MyAppointmentsPage
            appointments={appointments}
            allHospitalAppointments={allHospitalAppointments}
            onNavigate={handleNavigate}
            onViewPass={(apt) => setActivePassAppointment(apt)}
            onCancelAppointment={handleCancelAppointment}
            onDeleteAppointment={handleDeleteAppointment}
            onAdminStatusChange={handleAdminStatusChange}
          />
        )}

        {currentPage === 'admin' && (
          <AdminPortalPage
            appointments={allHospitalAppointments.length > 0 ? allHospitalAppointments : appointments}
            onViewPass={(apt) => setActivePassAppointment(apt)}
            onAppointmentCreated={handleAppointmentCreated}
            onAdminStatusChange={handleAdminStatusChange}
          />
        )}
      </main>

      {/* Hospital Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
      />

      {/* Modals & Dialogs */}
      <AuthModal />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      <DoctorDetailModal
        doctor={selectedDoctorForModal}
        isOpen={!!selectedDoctorForModal}
        onClose={() => setSelectedDoctorForModal(null)}
        onBookWithDoctor={handleBookWithDoctor}
      />

      <DepartmentDetailModal
        department={selectedDeptForModal}
        doctors={DOCTORS}
        isOpen={!!selectedDeptForModal}
        onClose={() => setSelectedDeptForModal(null)}
        onSelectDoctor={(doc) => setSelectedDoctorForModal(doc)}
        onBookDepartment={handleBookDepartment}
      />

      <AppointmentPassModal
        appointment={activePassAppointment}
        isOpen={!!activePassAppointment}
        onClose={() => setActivePassAppointment(null)}
        onViewAllAppointments={() => handleNavigate('appointments')}
      />

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HospitalApp />
    </AuthProvider>
  );
}
