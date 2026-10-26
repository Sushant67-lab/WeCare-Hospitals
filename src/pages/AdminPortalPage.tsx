import React, { useState } from 'react';
import { Appointment, Doctor, Department } from '../types';
import { useAuth } from '../context/AuthContext';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { 
  createAppointmentInFirestore, 
  updateAppointmentStatusByAdmin, 
  deleteAppointmentInDb 
} from '../services/appointmentsService';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  LogIn, 
  Search, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Plus, 
  Check, 
  X, 
  CheckCircle2, 
  XCircle, 
  Clock4, 
  Trash2, 
  Printer, 
  RefreshCw, 
  FileText, 
  LogOut, 
  Building2, 
  Stethoscope,
  Filter,
  ArrowUpDown,
  Download,
  AlertCircle
} from 'lucide-react';

interface AdminPortalPageProps {
  appointments: Appointment[];
  onViewPass: (appointment: Appointment) => void;
  onAppointmentCreated: (appointment: Appointment) => void;
  onAdminStatusChange: (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  appointments,
  onViewPass,
  onAppointmentCreated,
  onAdminStatusChange
}) => {
  const { user, isAdmin, signInAsAdmin, signOutUser } = useAuth();

  // Admin login form states (strictly empty by default - user must input credentials)
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Operations filter & search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  const [deptFilter, setDeptFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Status updating state
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cancelModalApt, setCancelModalApt] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Add new booking modal state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [createSuccessMsg, setCreateSuccessMsg] = useState<string | null>(null);

  // New booking form fields
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');
  const [newPatientEmail, setNewPatientEmail] = useState('');
  const [newDeptId, setNewDeptId] = useState(DEPARTMENTS[0]?.id || '');
  const [newDoctorId, setNewDoctorId] = useState('');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [newDate, setNewDate] = useState(tomorrow.toISOString().split('T')[0]);
  const [newTimeSlot, setNewTimeSlot] = useState('Morning (09:00 AM - 12:00 PM)');
  const [newStatus, setNewStatus] = useState<'confirmed' | 'pending'>('confirmed');
  const [newSymptoms, setNewSymptoms] = useState('');
  const [newAdminNotes, setNewAdminNotes] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const availableDoctors = DOCTORS.filter(d => d.departmentId === newDeptId);

  // Handle Admin Login
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoginError(null);

    if (!adminEmail.trim() || !adminPassword) {
      setLoginError('Please enter administrator email and password.');
      return;
    }

    setLoginLoading(true);

    try {
      await signInAsAdmin(adminEmail.trim(), adminPassword);
    } catch (err: any) {
      console.error('Admin login error:', err);
      setLoginError('Invalid administrator credentials. Access denied.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Status Update
  const handleStatusUpdate = async (
    id: string, 
    newSt: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    reason?: string
  ) => {
    setUpdatingId(id);
    try {
      await updateAppointmentStatusByAdmin(id, newSt, reason);
      onAdminStatusChange(id, newSt);
    } catch (err) {
      console.error('Failed to change appointment status:', err);
    } finally {
      setUpdatingId(null);
      setCancelModalApt(null);
      setCancelReason('');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to permanently delete this appointment record?')) {
      await deleteAppointmentInDb(id);
      onAdminStatusChange(id, 'cancelled');
    }
  };

  // Validate and submit new booking from Admin End
  const handleCreateBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!newPatientName.trim()) errs.name = 'Patient name is required';
    if (!newPatientPhone.trim()) errs.phone = 'Contact phone is required';
    if (!newPatientEmail.trim() || !newPatientEmail.includes('@')) errs.email = 'Valid email is required';
    if (!newDate) errs.date = 'Date is required';

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setIsCreating(true);
    setFormErrors({});

    const selectedDept = DEPARTMENTS.find(d => d.id === newDeptId);
    const selectedDoc = DOCTORS.find(d => d.id === newDoctorId);

    try {
      const created = await createAppointmentInFirestore({
        patientName: newPatientName.trim(),
        patientPhone: newPatientPhone.trim(),
        patientEmail: newPatientEmail.trim(),
        age: 35,
        gender: 'other',
        departmentId: newDeptId,
        departmentName: selectedDept ? selectedDept.name : 'General Medicine',
        doctorId: selectedDoc ? selectedDoc.id : 'any',
        doctorName: selectedDoc ? selectedDoc.name : 'Assigned Staff Physician',
        doctorTitle: selectedDoc ? selectedDoc.title : 'Medical Specialist',
        date: newDate,
        timeSlot: newTimeSlot,
        consultationType: 'in_person',
        symptoms: newSymptoms.trim() || 'Admin-Registered Outpatient Consultation',
        notes: '',
        adminNotes: newAdminNotes.trim() ? `[Admin Created] ${newAdminNotes.trim()}` : '[Booked via Admin Portal]',
        fee: selectedDoc ? selectedDoc.consultationFee : 120
      }, user ? user.uid : 'admin');

      // Update status if created with confirmed
      if (newStatus === 'confirmed') {
        await updateAppointmentStatusByAdmin(created.id, 'confirmed');
        created.status = 'confirmed';
      }

      onAppointmentCreated(created);
      setCreateSuccessMsg(`Appointment ${created.referenceNumber} created successfully!`);
      
      // Reset form
      setNewPatientName('');
      setNewPatientPhone('');
      setNewPatientEmail('');
      setNewSymptoms('');
      setNewAdminNotes('');
      setIsAddModalOpen(false);

      setTimeout(() => setCreateSuccessMsg(null), 5000);
    } catch (err) {
      console.error('Failed to create booking from admin end:', err);
    } finally {
      setIsCreating(false);
    }
  };

  // Filtered dataset
  const filtered = appointments.filter(apt => {
    const matchesQuery = 
      apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (apt.patientPhone && apt.patientPhone.includes(searchQuery)) ||
      (apt.patientEmail && apt.patientEmail.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesDept = deptFilter === 'all' || apt.departmentId === deptFilter;

    return matchesQuery && matchesStatus && matchesDept;
  });

  // KPI Calculations
  const totalCount = appointments.length;
  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const confirmedCount = appointments.filter(a => a.status === 'confirmed').length;
  const cancelledCount = appointments.filter(a => a.status === 'cancelled').length;
  const completedCount = appointments.filter(a => a.status === 'completed').length;

  // 1. GATE: If not logged in as Admin, show restricted login screen
  if (!user || !isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-8 bg-slate-100">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 max-w-md w-full shadow-xl space-y-6">
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-md">
              <Lock className="w-8 h-8 text-blue-400 stroke-[2.2]" />
            </div>

            <div>
              <span className="inline-block text-[10px] uppercase tracking-widest font-extrabold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full mb-1">
                Restricted System Access
              </span>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                Hospital Admin Portal
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Please enter your administrator email and password to access the portal.
              </p>
            </div>
          </div>

          {user && !isAdmin && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span>Patient Account Active</span>
              </div>
              <p className="text-[11px] text-amber-700 leading-relaxed">
                You are currently signed in as a patient ({user.email}). Please enter administrator credentials below to gain admin access.
              </p>
            </div>
          )}

          {loginError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{loginError}</span>
            </div>
          )}

          {/* Admin Credentials Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Enter administrator email"
                  autoComplete="email"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Security Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Enter security password"
                  autoComplete="current-password"
                  className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loginLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Access Admin Portal</span>
                </>
              )}
            </button>
          </form>

        </div>
      </div>
    );
  }

  // 2. MAIN ADMIN PORTAL (Authenticated)
  return (
    <div className="space-y-8 pb-20">
      
      {/* Admin Operations Top Bar */}
      <section className="bg-slate-900 text-white py-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700 text-blue-300 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Central Clinical Administration Desk</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                WeCare Admin Booking Operations
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Logged in as <strong className="text-white">{user.email}</strong>. Manage outpatient confirmations, handle cancellations, and register new patients.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-all"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
                <span>New Booking</span>
              </button>

              <button
                onClick={signOutUser}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>

          {/* Quick Success Toast */}
          {createSuccessMsg && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                {createSuccessMsg}
              </span>
              <button onClick={() => setCreateSuccessMsg(null)} className="text-emerald-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* KPI Statistics Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            
            <div 
              onClick={() => setStatusFilter('all')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                statusFilter === 'all' 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-md' 
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-bold block opacity-80">
                All Bookings
              </span>
              <span className="text-2xl font-extrabold tabular-nums block mt-1">
                {totalCount}
              </span>
            </div>

            <div 
              onClick={() => setStatusFilter('pending')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                statusFilter === 'pending' 
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md' 
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-wider font-bold block opacity-80 text-amber-300">
                  Pending Review
                </span>
                {pendingCount > 0 && <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />}
              </div>
              <span className="text-2xl font-extrabold text-amber-400 tabular-nums block mt-1">
                {pendingCount}
              </span>
            </div>

            <div 
              onClick={() => setStatusFilter('confirmed')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                statusFilter === 'confirmed' 
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md' 
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-bold block opacity-80 text-emerald-300">
                Confirmed
              </span>
              <span className="text-2xl font-extrabold text-emerald-400 tabular-nums block mt-1">
                {confirmedCount}
              </span>
            </div>

            <div 
              onClick={() => setStatusFilter('cancelled')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                statusFilter === 'cancelled' 
                  ? 'bg-rose-600 text-white border-rose-500 shadow-md' 
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-bold block opacity-80 text-rose-300">
                Cancelled
              </span>
              <span className="text-2xl font-extrabold text-rose-400 tabular-nums block mt-1">
                {cancelledCount}
              </span>
            </div>

            <div 
              onClick={() => setStatusFilter('completed')}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                statusFilter === 'completed' 
                  ? 'bg-sky-600 text-white border-sky-500 shadow-md' 
                  : 'bg-slate-800/80 border-slate-700 hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="text-[11px] uppercase tracking-wider font-bold block opacity-80 text-sky-300">
                Completed
              </span>
              <span className="text-2xl font-extrabold text-sky-400 tabular-nums block mt-1">
                {completedCount}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* Control Filter Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reference, patient, phone, doctor..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Department dropdown */}
            <div className="relative">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="all">All Clinical Departments (32)</option>
                {DEPARTMENTS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.displayName || d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* View mode toggle */}
            <div className="flex bg-slate-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  viewMode === 'table' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Table View
              </button>
              <button
                onClick={() => setViewMode('cards')}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  viewMode === 'cards' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Card View
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Bookings View: Table or Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">No appointments found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {searchQuery 
                  ? `No hospital appointments match query "${searchQuery}".` 
                  : 'No appointments currently match this filter criteria.'}
              </p>
            </div>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-xs"
            >
              Add New Booking Directly
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* TABLE VIEW */
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="py-3.5 px-4">Booking Ref</th>
                    <th className="py-3.5 px-4">Patient Information</th>
                    <th className="py-3.5 px-4">Department & Doctor</th>
                    <th className="py-3.5 px-4">Date & Slot</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Admin Actions (Confirm / Cancel)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filtered.map((apt) => {
                    const isPending = apt.status === 'pending';
                    const isConfirmed = apt.status === 'confirmed';
                    const isCancelled = apt.status === 'cancelled';
                    const isCompleted = apt.status === 'completed';

                    return (
                      <tr key={apt.id} className="hover:bg-slate-50/70 transition-colors">
                        
                        {/* Ref */}
                        <td className="py-4 px-4 font-mono font-bold text-blue-700 whitespace-nowrap">
                          {apt.referenceNumber}
                        </td>

                        {/* Patient */}
                        <td className="py-4 px-4">
                          <p className="font-bold text-slate-900">{apt.patientName}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-0.5">
                            <a href={`tel:${apt.patientPhone}`} className="hover:text-blue-600 hover:underline">
                              {apt.patientPhone}
                            </a>
                            <span>·</span>
                            <a href={`mailto:${apt.patientEmail}`} className="hover:text-blue-600 hover:underline">
                              {apt.patientEmail}
                            </a>
                          </div>
                          {apt.symptoms && (
                            <p className="text-[11px] text-slate-400 italic line-clamp-1 mt-0.5">
                              "{apt.symptoms}"
                            </p>
                          )}
                        </td>

                        {/* Department & Doctor */}
                        <td className="py-4 px-4">
                          <span className="font-semibold text-slate-900 block">{apt.departmentName}</span>
                          <span className="text-[11px] text-slate-500">{apt.doctorName}</span>
                        </td>

                        {/* Date & Slot */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className="font-semibold text-slate-900 block">{apt.date}</span>
                          <span className="text-[11px] text-slate-500">{apt.timeSlot}</span>
                        </td>

                        {/* Status */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${
                            isConfirmed 
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                              : isPending 
                              ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                              : isCancelled 
                              ? 'bg-rose-50 text-rose-700 border border-rose-200'
                              : 'bg-blue-50 text-blue-700 border border-blue-200'
                          }`}>
                            {isConfirmed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                            {isPending && <Clock4 className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                            {isCancelled && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                            {isCompleted && <Check className="w-3.5 h-3.5 text-blue-600" />}
                            <span>{apt.status}</span>
                          </span>
                        </td>

                        {/* Admin Action Buttons */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Confirm Action */}
                            <button
                              type="button"
                              title="Confirm Appointment"
                              disabled={updatingId === apt.id || isConfirmed}
                              onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                                isConfirmed
                                  ? 'bg-emerald-100 text-emerald-800 opacity-60 cursor-default'
                                  : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                              }`}
                            >
                              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{isConfirmed ? 'Confirmed' : 'Confirm'}</span>
                            </button>

                            {/* Cancel Action */}
                            <button
                              type="button"
                              title="Cancel Appointment"
                              disabled={updatingId === apt.id || isCancelled}
                              onClick={() => setCancelModalApt(apt)}
                              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 transition-all ${
                                isCancelled
                                  ? 'bg-rose-100 text-rose-800 opacity-60 cursor-default'
                                  : 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                              }`}
                            >
                              <X className="w-3.5 h-3.5 stroke-[2.5]" />
                              <span>{isCancelled ? 'Cancelled' : 'Cancel'}</span>
                            </button>

                            {/* View Pass */}
                            <button
                              type="button"
                              title="View Patient Admission Pass"
                              onClick={() => onViewPass(apt)}
                              className="p-1.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <FileText className="w-4 h-4" />
                            </button>

                            {/* Delete */}
                            <button
                              type="button"
                              title="Delete Record"
                              onClick={() => handleDelete(apt.id)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* CARD VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((apt) => {
              const isPending = apt.status === 'pending';
              const isConfirmed = apt.status === 'confirmed';
              const isCancelled = apt.status === 'cancelled';
              const isCompleted = apt.status === 'completed';

              return (
                <div 
                  key={apt.id}
                  className={`bg-white rounded-3xl border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between ${
                    isPending 
                      ? 'border-amber-300 ring-2 ring-amber-100' 
                      : isConfirmed 
                      ? 'border-emerald-200' 
                      : 'border-slate-200'
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                        {apt.referenceNumber}
                      </span>

                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 ${
                        isConfirmed 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                          : isPending 
                          ? 'bg-amber-50 text-amber-700 border border-amber-200' 
                          : isCancelled 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
                        {isConfirmed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        {isPending && <Clock4 className="w-3.5 h-3.5 text-amber-600 animate-spin" />}
                        {isCancelled && <XCircle className="w-3.5 h-3.5 text-rose-600" />}
                        <span>{apt.status}</span>
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[11px] font-semibold text-blue-600 block uppercase tracking-wider">
                        {apt.departmentName}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900">
                        {apt.doctorName}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {apt.doctorTitle}
                      </p>
                    </div>

                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Patient:
                        </span>
                        <span className="font-semibold text-slate-900">{apt.patientName}</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400" />
                          Phone:
                        </span>
                        <a href={`tel:${apt.patientPhone}`} className="font-semibold text-blue-600 hover:underline">
                          {apt.patientPhone}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          Email:
                        </span>
                        <a href={`mailto:${apt.patientEmail}`} className="font-semibold text-blue-600 hover:underline truncate max-w-[160px]">
                          {apt.patientEmail}
                        </a>
                      </div>
                      <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Date & Slot:
                        </span>
                        <span className="font-semibold text-slate-900">{apt.date} · {apt.timeSlot.split(' ')[0]}</span>
                      </div>
                    </div>

                    {apt.symptoms && (
                      <div className="text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-semibold text-slate-700 block text-[11px]">Symptoms:</span>
                        <p className="italic text-slate-500 mt-0.5 line-clamp-2">"{apt.symptoms}"</p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      disabled={updatingId === apt.id || isConfirmed}
                      onClick={() => handleStatusUpdate(apt.id, 'confirmed')}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                        isConfirmed 
                          ? 'bg-emerald-100 text-emerald-800 opacity-60 cursor-default' 
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isConfirmed ? 'Confirmed' : 'Confirm'}</span>
                    </button>

                    <button
                      type="button"
                      disabled={updatingId === apt.id || isCancelled}
                      onClick={() => setCancelModalApt(apt)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                        isCancelled 
                          ? 'bg-rose-100 text-rose-800 opacity-60 cursor-default' 
                          : 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs'
                      }`}
                    >
                      <X className="w-3.5 h-3.5 stroke-[2.5]" />
                      <span>{isCancelled ? 'Cancelled' : 'Cancel'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onViewPass(apt)}
                      title="View Pass"
                      className="p-2 text-slate-500 hover:text-blue-600 bg-white border border-slate-200 rounded-xl"
                    >
                      <FileText className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* MODAL: Cancel with Reason */}
      {cancelModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Confirm Booking Cancellation</h3>
                <p className="text-xs text-slate-500">Ref: {cancelModalApt.referenceNumber}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Mark appointment for <strong>{cancelModalApt.patientName}</strong> with <strong>{cancelModalApt.doctorName}</strong> on {cancelModalApt.date} as cancelled?
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Administrative Cancellation Note:
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Doctor in emergency trauma surgery, rescheduled per patient request..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCancelModalApt(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
              >
                Go Back
              </button>
              <button
                type="button"
                disabled={updatingId === cancelModalApt.id}
                onClick={() => handleStatusUpdate(cancelModalApt.id, 'cancelled', cancelReason.trim())}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Cancel Appointment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add New Booking from Admin End */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-slate-200 my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Add New Booking (Admin End)
                  </h3>
                  <p className="text-xs text-slate-500">
                    Direct patient registration for walk-in or telephone appointments
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-4">
              
              {/* Patient Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Patient Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    placeholder="e.g. Eleanor Vance"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.name && <p className="text-[11px] text-rose-600">{formErrors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Contact Phone <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={newPatientPhone}
                    onChange={(e) => setNewPatientPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.phone && <p className="text-[11px] text-rose-600">{formErrors.phone}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={newPatientEmail}
                    onChange={(e) => setNewPatientEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  {formErrors.email && <p className="text-[11px] text-rose-600">{formErrors.email}</p>}
                </div>
              </div>

              {/* Department & Doctor */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Clinical Department <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newDeptId}
                    onChange={(e) => {
                      setNewDeptId(e.target.value);
                      setNewDoctorId('');
                    }}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.displayName || d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Assigned Doctor (Optional)
                  </label>
                  <select
                    value={newDoctorId}
                    onChange={(e) => setNewDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="">Any Available Specialist</option>
                    {availableDoctors.map(doc => (
                      <option key={doc.id} value={doc.id}>
                        {doc.name} ({doc.title})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Date, Time & Initial Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-1">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Time Window
                  </label>
                  <select
                    value={newTimeSlot}
                    onChange={(e) => setNewTimeSlot(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                    <option value="09:00 AM - 09:30 AM">09:00 AM - 09:30 AM</option>
                    <option value="11:30 AM - 12:00 PM">11:30 AM - 12:00 PM</option>
                    <option value="02:30 PM - 03:00 PM">02:30 PM - 03:00 PM</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Initial Status
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="confirmed">Confirmed (Instant)</option>
                    <option value="pending">Pending Review</option>
                  </select>
                </div>
              </div>

              {/* Symptoms & Admin Remarks */}
              <div className="space-y-1 pt-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Chief Complaint / Symptoms
                </label>
                <input
                  type="text"
                  value={newSymptoms}
                  onChange={(e) => setNewSymptoms(e.target.value)}
                  placeholder="e.g. Chest discomfort, post-operative surgical suture review..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 block">
                  Internal Administrative Remarks
                </label>
                <input
                  type="text"
                  value={newAdminNotes}
                  onChange={(e) => setNewAdminNotes(e.target.value)}
                  placeholder="e.g. Walk-in patient from ER triage, VIP insurance card verified"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-6 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs flex items-center gap-2 disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving to Firebase...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 stroke-[2.5]" />
                      <span>Create Appointment</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
