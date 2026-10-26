export type PageView = 'home' | 'about' | 'departments' | 'doctors' | 'book' | 'appointments' | 'admin';

export type ConsultationType = 'in_person' | 'video' | 'follow_up';

export interface Doctor {
  id: string;
  name: string;
  title: string;
  departmentId: string;
  departmentName: string;
  qualifications: string;
  experienceYears: number;
  rating: number;
  reviewCount: number;
  consultationFee: number;
  availableDays: string[];
  timeSlots: string[];
  languages: string[];
  bio: string;
  education: string[];
  fellowships: string[];
  awards: string[];
  opdRoom: string;
  avatarColor: string;
}

export interface Department {
  id: string;
  name: string;
  displayName?: string;
  tagline: string;
  shortDesc: string;
  cardDesc?: string;
  fullDesc: string;
  image?: string;
  category?: 'medical' | 'surgical' | 'diagnostic_support' | 'clinical' | 'care_services' | 'diagnostics' | 'support';
  isBookable?: boolean;
  headOfDepartment: string;
  phoneExtension: string;
  floor: string;
  bedCapacity: number;
  keyProcedures: string[];
  keyEquipments: string[];
  doctorIds: string[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  phone?: string;
  role?: 'admin' | 'patient';
  createdAt?: string;
}

export interface Appointment {
  id: string;
  userId?: string;
  referenceNumber: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  departmentId: string;
  departmentName: string;
  doctorId: string;
  doctorName: string;
  doctorTitle: string;
  date: string;
  timeSlot: string;
  consultationType: ConsultationType;
  symptoms: string;
  notes?: string;
  adminNotes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  fee: number;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatment: string;
  department: string;
  doctorName: string;
  quote: string;
  rating: number;
  date: string;
}

export interface HospitalFacility {
  id: string;
  title: string;
  description: string;
  category: string;
  stat: string;
}
