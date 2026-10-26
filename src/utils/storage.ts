import { Appointment } from '../types';
import { INITIAL_SAMPLE_APPOINTMENTS } from '../data/hospitalData';

const APPOINTMENTS_KEY = 'wecare_hospitals_appointments_v1';

export function getStoredAppointments(): Appointment[] {
  try {
    const raw = localStorage.getItem(APPOINTMENTS_KEY);
    if (!raw) {
      localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(INITIAL_SAMPLE_APPOINTMENTS));
      return INITIAL_SAMPLE_APPOINTMENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_SAMPLE_APPOINTMENTS;
  } catch (e) {
    console.error('Error reading appointments from storage:', e);
    return INITIAL_SAMPLE_APPOINTMENTS;
  }
}

export function saveAppointment(appointmentData: Omit<Appointment, 'id' | 'referenceNumber' | 'createdAt' | 'status'>): Appointment {
  const appointments = getStoredAppointments();
  
  // Generate a distinct reference number: WCH-2026-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const referenceNumber = `WCH-2026-${randomSuffix}`;
  const id = `apt-${Date.now()}-${randomSuffix}`;
  
  const newAppointment: Appointment = {
    ...appointmentData,
    id,
    referenceNumber,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  const updated = [newAppointment, ...appointments];
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving appointment:', e);
  }
  
  return newAppointment;
}

export function cancelAppointment(id: string): Appointment[] {
  const appointments = getStoredAppointments();
  const updated = appointments.map((apt) => {
    if (apt.id === id) {
      return { ...apt, status: 'cancelled' as const };
    }
    return apt;
  });
  
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error cancelling appointment:', e);
  }
  
  return updated;
}

export function deleteAppointment(id: string): Appointment[] {
  const appointments = getStoredAppointments();
  const updated = appointments.filter((apt) => apt.id !== id);
  try {
    localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting appointment:', e);
  }
  return updated;
}
