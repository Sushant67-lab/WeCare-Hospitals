import React, { useState, useEffect } from 'react';
import { Doctor, Department, Appointment } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { createAppointmentInFirestore } from '../services/appointmentsService';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  Building2,
  CalendarCheck,
  LogIn,
  UserPlus,
  ShieldCheck,
  LogOut,
  AlertCircle
} from 'lucide-react';

interface BookAppointmentPageProps {
  initialDoctor?: Doctor | null;
  initialDepartment?: Department | null;
  onAppointmentCreated: (appointment: Appointment) => void;
}

export const BookAppointmentPage: React.FC<BookAppointmentPageProps> = ({
  initialDoctor,
  initialDepartment,
  onAppointmentCreated
}) => {
  const { user, userProfile, openAuthModal, signOutUser } = useAuth();

  // Department & Doctor selection
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    initialDoctor ? initialDoctor.departmentId : initialDepartment ? initialDepartment.id : DEPARTMENTS[0]?.id || ''
  );
  
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(
    initialDoctor ? initialDoctor.id : ''
  );

  // Doctors belonging to the selected department
  const departmentDoctors = DOCTORS.filter(d => d.departmentId === selectedDeptId);

  useEffect(() => {
    if (initialDoctor && initialDoctor.departmentId === selectedDeptId) {
      setSelectedDoctorId(initialDoctor.id);
    } else {
      setSelectedDoctorId('');
    }
  }, [selectedDeptId, initialDoctor]);

  // Date - defaults to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState<string>(minDateStr);

  // Time slots
  const timeSlots = [
    'Morning (09:00 AM - 12:00 PM)',
    'Afternoon (01:00 PM - 04:00 PM)',
    'Evening (05:00 PM - 08:00 PM)',
    '09:00 AM - 09:30 AM',
    '10:00 AM - 10:30 AM',
    '11:30 AM - 12:00 PM',
    '02:00 PM - 02:30 PM',
    '03:30 PM - 04:00 PM',
    '05:00 PM - 05:30 PM',
    '06:30 PM - 07:00 PM'
  ];
  const [selectedTime, setSelectedTime] = useState<string>(timeSlots[0]);

  // Patient Info - auto-fill from authenticated user
  const [fullName, setFullName] = useState(userProfile?.displayName || user?.displayName || '');
  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [reason, setReason] = useState('');

  // Keep fields synced when user logs in or profile changes
  useEffect(() => {
    if (user) {
      if (!fullName) setFullName(userProfile?.displayName || user.displayName || '');
      if (!phone && userProfile?.phone) setPhone(userProfile.phone);
      if (!email && user.email) setEmail(user.email);
    }
  }, [user, userProfile]);

  // Form submission state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppointment, setSubmittedAppointment] = useState<Appointment | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!selectedDeptId) errs.dept = 'Please select a department';
    if (!selectedDate) errs.date = 'Please select a preferred date';
    if (!selectedTime) errs.time = 'Please select a preferred time slot';
    if (!fullName.trim()) errs.fullName = 'Full Name is required';
    if (!phone.trim()) errs.phone = 'Phone Number is required';
    if (!email.trim() || !email.includes('@')) errs.email = 'Valid Email Address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    if (!user) {
      openAuthModal('signin');
      return;
    }

    setIsSubmitting(true);

    const activeDept = DEPARTMENTS.find(d => d.id === selectedDeptId);
    const activeDoc = DOCTORS.find(d => d.id === selectedDoctorId);

    try {
      const newAppt = await createAppointmentInFirestore({
        patientName: fullName.trim(),
        patientPhone: phone.trim(),
        patientEmail: email.trim(),
        age: 30,
        gender: 'other',
        departmentId: selectedDeptId,
        departmentName: activeDept ? activeDept.name : 'General Medicine',
        doctorId: activeDoc ? activeDoc.id : 'any',
        doctorName: activeDoc ? activeDoc.name : 'Any Available Specialist',
        doctorTitle: activeDoc ? activeDoc.title : 'Consultant Physician',
        date: selectedDate,
        timeSlot: selectedTime,
        consultationType: 'in_person',
        symptoms: reason.trim() || 'General Consultation',
        notes: '',
        status: 'confirmed',
        fee: activeDoc ? activeDoc.consultationFee : 120
      }, user.uid);

      setIsSubmitting(false);
      setSubmittedAppointment(newAppt);
      onAppointmentCreated(newAppt);
    } catch (err) {
      console.error('Booking submission error:', err);
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setSubmittedAppointment(null);
    setReason('');
    setErrors({});
  };

  // Video Frame 10: Appointment Requested Confirmation Screen
  if (submittedAppointment) {
    return (
      <div className="py-12 sm:py-20 px-4 sm:px-8 max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Green Check Circle */}
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
            <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Appointment Requested!
            </h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Thank you for choosing WeCare Hospitals. Your appointment request has been securely recorded in your account. Our outpatient desk will contact you to confirm final timings.
            </p>
          </div>

          {/* Details summary */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 text-left text-xs sm:text-sm space-y-3">
            <div className="flex items-center justify-between pb-2.5 border-b border-slate-200">
              <span className="text-slate-500">Booking Reference</span>
              <span className="font-mono font-bold text-blue-600">{submittedAppointment.referenceNumber}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Department</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.departmentName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Doctor</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.doctorName}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Date & Time</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.date} · {submittedAppointment.timeSlot}</span>
            </div>

            <div className="flex items-center justify-between pt-2.5 border-t border-slate-200">
              <span className="text-slate-500">Patient</span>
              <span className="font-semibold text-slate-800">{submittedAppointment.patientName} ({submittedAppointment.patientPhone})</span>
            </div>
          </div>

          {/* Action button matching video frame 10 */}
          <div className="pt-2">
            <button
              onClick={handleBookAnother}
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-semibold text-sm rounded-full shadow-xs transition-all"
            >
              Book Another Appointment
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-14 px-4 sm:px-8 max-w-3xl mx-auto space-y-8">
      
      {/* Header section matching video */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
          Book an Appointment
        </h1>
        <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
          Fill in the details below to schedule your visit with our medical team.
        </p>
      </div>

      {/* User Auth Barrier if not signed in */}
      {!user ? (
        <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm overflow-hidden p-6 sm:p-8 space-y-6 text-center animate-in fade-in">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8 stroke-[2]" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Please Sign In to Book
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              WeCare Hospitals requires a verified patient account to store your appointment bookings, manage digital passes, and send confirmation reminders.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => openAuthModal('signin')}
              className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" />
              <span>Sign In</span>
            </button>

            <button
              type="button"
              onClick={() => openAuthModal('signup')}
              className="w-full sm:w-auto px-7 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm rounded-full transition-colors flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              <span>Create Account</span>
            </button>
          </div>

          <div className="pt-2 text-[11px] text-slate-400">
            Takes less than 30 seconds · HIPAA & Firebase Encrypted Data
          </div>
        </div>
      ) : (
        /* Logged In Status Banner */
        <div className="bg-blue-50/80 border border-blue-200/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold flex items-center justify-center text-sm shrink-0">
              {(userProfile?.displayName || user.displayName || user.email || 'P')[0].toUpperCase()}
            </div>
            <div>
              <p className="font-bold text-slate-900">
                Booking as {userProfile?.displayName || user.displayName || 'Patient'}
              </p>
              <p className="text-slate-500 text-[11px]">
                {user.email} {userProfile?.phone ? `· ${userProfile.phone}` : ''}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={signOutUser}
            className="text-slate-500 hover:text-rose-600 flex items-center gap-1.5 transition-colors font-medium self-end sm:self-center"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      )}

      {/* Main Single Card Form matching video */}
      <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden transition-opacity ${!user ? 'opacity-70 pointer-events-none' : ''}`}>
        
        {/* Blue Header Bar with Calendar Icon */}
        <div className="bg-blue-600 text-white px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Appointment Details</h2>
            <p className="text-xs text-blue-100">
              Please provide your consultation preferences and contact information
            </p>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* Section 1: Select Service & Time Slot */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Building2 className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                1. Select Service & Timing
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Department */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Department <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedDeptId}
                    onChange={(e) => setSelectedDeptId(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.dept ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  >
                    <option value="">Select Department</option>
                    {DEPARTMENTS.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.displayName || dept.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.dept && <p className="text-[11px] text-rose-600">{errors.dept}</p>}
              </div>

              {/* Doctor (Optional) */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Doctor (Optional)
                </label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                >
                  <option value="">Any Available Doctor</option>
                  {departmentDoctors.map((doc) => (
                    <option key={doc.id} value={doc.id}>
                      {doc.name} ({doc.title})
                    </option>
                  ))}
                </select>
              </div>

              {/* Preferred Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="date"
                    min={minDateStr}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.date ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.date && <p className="text-[11px] text-rose-600">{errors.date}</p>}
              </div>

              {/* Preferred Time Slot */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Preferred Time Slot <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.time ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.time && <p className="text-[11px] text-rose-600">{errors.time}</p>}
              </div>

            </div>
          </div>

          {/* Section 2: Patient Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                2. Patient Information
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.fullName && <p className="text-[11px] text-rose-600">{errors.fullName}</p>}
              </div>

              {/* Phone Number */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.phone ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-600">{errors.phone}</p>}
              </div>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 block">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@example.com"
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all ${
                      errors.email ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200'
                    }`}
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-600">{errors.email}</p>}
              </div>

              {/* Reason for Visit / Symptoms */}
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Reason for Visit / Symptoms
                </label>
                <div className="relative">
                  <textarea
                    rows={3}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Please briefly describe your symptoms or reason for visit..."
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Submit Button matching video */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !user}
              className="w-full py-3.5 px-6 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.99] rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting to Firebase...</span>
              ) : (
                <>
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book Appointment</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>

    </div>
  );
};
