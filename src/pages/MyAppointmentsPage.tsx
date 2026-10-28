import React, { useState } from 'react';
import { Appointment, PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { updateAppointmentStatusByAdmin } from '../services/appointmentsService';
import { 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  Search, 
  CalendarPlus, 
  FileText, 
  XCircle, 
  Trash2, 
  Printer, 
  CheckCircle2, 
  Building2, 
  LogIn,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Filter,
  Check,
  X,
  Stethoscope,
  Clock4,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface MyAppointmentsPageProps {
  appointments: Appointment[];
  allHospitalAppointments?: Appointment[];
  onNavigate: (page: PageView) => void;
  onViewPass: (appointment: Appointment) => void;
  onCancelAppointment: (id: string) => void;
  onDeleteAppointment: (id: string) => void;
  onAdminStatusChange?: (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed') => void;
}

export const MyAppointmentsPage: React.FC<MyAppointmentsPageProps> = ({
  appointments,
  allHospitalAppointments = [],
  onNavigate,
  onViewPass,
  onCancelAppointment,
  onDeleteAppointment,
  onAdminStatusChange
}) => {
  const { user, isAdmin, openAuthModal } = useAuth();

  // Admin tab mode: 'admin' (all hospital bookings) vs 'personal' (user's bookings)
  const [activeTab, setActiveTab] = useState<'admin' | 'personal'>(isAdmin ? 'admin' : 'personal');

  // Filters
  const [filterQuery, setFilterQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'confirmed' | 'cancelled' | 'completed'>('all');
  
  // Updating status state
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [cancelModalApt, setCancelModalApt] = useState<Appointment | null>(null);
  const [cancelReason, setCancelReason] = useState('');

  // Barrier if not signed in and not admin
  if (!user && !isAdmin) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 sm:px-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-xs">
          <Calendar className="w-8 h-8 stroke-[2]" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Sign In to View Appointments
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Please log in with your verified patient or admin account to access scheduled consultations, view digital admission passes, and manage hospital bookings.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => openAuthModal('signin')}
            className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-full shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Your Account</span>
          </button>
          <button
            onClick={() => openAuthModal('signup')}
            className="w-full sm:w-auto px-7 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm rounded-full transition-colors"
          >
            Create New Account
          </button>
        </div>
      </div>
    );
  }

  // Choose which appointment dataset to show
  const activeDataset = (isAdmin && activeTab === 'admin')
    ? (allHospitalAppointments.length > 0 ? allHospitalAppointments : appointments)
    : appointments;

  const handleAdminChangeStatus = async (
    aptId: string, 
    newStatus: 'pending' | 'confirmed' | 'cancelled' | 'completed',
    reason?: string
  ) => {
    setUpdatingId(aptId);
    try {
      await updateAppointmentStatusByAdmin(aptId, newStatus, reason);
      if (onAdminStatusChange) {
        onAdminStatusChange(aptId, newStatus);
      }
    } catch (err) {
      console.error('Error changing status:', err);
    } finally {
      setUpdatingId(null);
      setCancelModalApt(null);
      setCancelReason('');
    }
  };

  const filtered = (activeDataset || []).filter(apt => {
    if (!apt) return false;
    const q = (filterQuery || '').trim().toLowerCase();
    const matchesQuery = 
      !q ||
      (apt.referenceNumber || '').toLowerCase().includes(q) ||
      (apt.patientName || '').toLowerCase().includes(q) ||
      (apt.doctorName || '').toLowerCase().includes(q) ||
      (apt.departmentName || '').toLowerCase().includes(q) ||
      Boolean(apt.patientPhone && apt.patientPhone.includes(q)) ||
      Boolean(apt.patientEmail && apt.patientEmail.toLowerCase().includes(q));

    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;

    return matchesQuery && matchesStatus;
  });

  // KPI counters
  const totalCount = activeDataset.length;
  const pendingCount = activeDataset.filter(a => a.status === 'pending').length;
  const confirmedCount = activeDataset.filter(a => a.status === 'confirmed').length;
  const cancelledCount = activeDataset.filter(a => a.status === 'cancelled').length;
  const completedCount = activeDataset.filter(a => a.status === 'completed').length;

  return (
    <div className="space-y-8 pb-16">
      
      {/* Page Header */}
      <section className="bg-white border-b border-slate-200 py-8 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-100">
                {isAdmin ? (
                  <>
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>Hospital Administration Portal</span>
                  </>
                ) : (
                  <span>Patient Outpatient Portal</span>
                )}
              </div>
              
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                {isAdmin && activeTab === 'admin' 
                  ? 'Manage Hospital Appointments' 
                  : 'My Appointments'}
              </h1>
              <p className="text-sm text-slate-500 max-w-2xl">
                {isAdmin && activeTab === 'admin'
                  ? 'Review outpatient appointment requests, confirm patient slots, or cancel and manage clinical schedules in real-time.'
                  : 'View your scheduled visits, digital admission passes, and real-time consultation confirmation status.'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {isAdmin && (
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('admin')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === 'admin' 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Admin Operations ({totalCount})
                  </button>
                  <button
                    onClick={() => setActiveTab('personal')}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      activeTab === 'personal' 
                        ? 'bg-blue-600 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    My Bookings
                  </button>
                </div>
              )}

              <button
                onClick={() => onNavigate('book')}
                className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>New Booking</span>
              </button>
            </div>
          </div>

          {/* Admin Metric Strip */}
          {isAdmin && activeTab === 'admin' && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
              <div 
                onClick={() => setStatusFilter('all')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  statusFilter === 'all' ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100'
                }`}
              >
                <span className={`text-[11px] uppercase tracking-wider font-bold block ${statusFilter === 'all' ? 'text-slate-300' : 'text-slate-500'}`}>
                  Total Bookings
                </span>
                <span className="text-xl sm:text-2xl font-extrabold tabular-nums block mt-0.5">
                  {totalCount}
                </span>
              </div>

              <div 
                onClick={() => setStatusFilter('pending')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  statusFilter === 'pending' ? 'bg-amber-600 text-white border-amber-600' : 'bg-amber-50/70 border-amber-200/80 hover:bg-amber-100/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[11px] uppercase tracking-wider font-bold block ${statusFilter === 'pending' ? 'text-amber-100' : 'text-amber-700'}`}>
                    Pending Review
                  </span>
                  {pendingCount > 0 && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  )}
                </div>
                <span className={`text-xl sm:text-2xl font-extrabold tabular-nums block mt-0.5 ${statusFilter === 'pending' ? 'text-white' : 'text-amber-900'}`}>
                  {pendingCount}
                </span>
              </div>

              <div 
                onClick={() => setStatusFilter('confirmed')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  statusFilter === 'confirmed' ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-emerald-50/70 border-emerald-200/80 hover:bg-emerald-100/60'
                }`}
              >
                <span className={`text-[11px] uppercase tracking-wider font-bold block ${statusFilter === 'confirmed' ? 'text-emerald-100' : 'text-emerald-700'}`}>
                  Confirmed
                </span>
                <span className={`text-xl sm:text-2xl font-extrabold tabular-nums block mt-0.5 ${statusFilter === 'confirmed' ? 'text-white' : 'text-emerald-900'}`}>
                  {confirmedCount}
                </span>
              </div>

              <div 
                onClick={() => setStatusFilter('cancelled')}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  statusFilter === 'cancelled' ? 'bg-rose-600 text-white border-rose-600' : 'bg-rose-50/70 border-rose-200/80 hover:bg-rose-100/60'
                }`}
              >
                <span className={`text-[11px] uppercase tracking-wider font-bold block ${statusFilter === 'cancelled' ? 'text-rose-100' : 'text-rose-700'}`}>
                  Cancelled
                </span>
                <span className={`text-xl sm:text-2xl font-extrabold tabular-nums block mt-0.5 ${statusFilter === 'cancelled' ? 'text-white' : 'text-rose-900'}`}>
                  {cancelledCount}
                </span>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="Search reference ID, patient, phone, doctor..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
            />
            {filterQuery && (
              <button
                onClick={() => setFilterQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Status pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === 'all' 
                    ? 'bg-slate-900 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                All ({totalCount})
              </button>

              <button
                onClick={() => setStatusFilter('pending')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === 'pending' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Pending ({pendingCount})
              </button>

              <button
                onClick={() => setStatusFilter('confirmed')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === 'confirmed' 
                    ? 'bg-emerald-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Confirmed ({confirmedCount})
              </button>

              <button
                onClick={() => setStatusFilter('cancelled')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  statusFilter === 'cancelled' 
                    ? 'bg-rose-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancelled ({cancelledCount})
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* Appointment Cards List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        {filtered.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">No appointments found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {filterQuery 
                  ? `No consultations match your search "${filterQuery}".`
                  : 'There are no appointments under this filter.'}
              </p>
            </div>
            <button
              onClick={() => onNavigate('book')}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-full shadow-xs"
            >
              Schedule New Consultation
            </button>
          </div>
        ) : (
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
                    
                    {/* Top reference and status pill */}
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md">
                        {apt.referenceNumber}
                      </span>

                      {/* Status Badges */}
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

                    {/* Department & Doctor */}
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

                    {/* Timing & Modality Box */}
                    <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 space-y-2 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          Date:
                        </span>
                        <span className="font-semibold text-slate-900">{apt.date}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          Time Slot:
                        </span>
                        <span className="font-semibold text-slate-900">{apt.timeSlot}</span>
                      </div>
                      
                      <div className="flex items-center justify-between text-slate-600 pt-1 border-t border-slate-200/60">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          Patient:
                        </span>
                        <span className="font-semibold text-slate-900">{apt.patientName}</span>
                      </div>

                      {/* Admin View Additional Contact details */}
                      {isAdmin && activeTab === 'admin' && (
                        <>
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
                            <a href={`mailto:${apt.patientEmail}`} className="font-semibold text-blue-600 hover:underline truncate max-w-[170px]">
                              {apt.patientEmail}
                            </a>
                          </div>
                        </>
                      )}
                    </div>

                    {/* Reason/Symptoms */}
                    {apt.symptoms && (
                      <div className="text-xs text-slate-600 bg-slate-50/70 p-2.5 rounded-xl border border-slate-100">
                        <span className="font-semibold text-slate-700 block text-[11px]">Symptoms / Reason:</span>
                        <p className="italic text-slate-500 mt-0.5 line-clamp-2">
                          "{apt.symptoms}"
                        </p>
                      </div>
                    )}

                    {/* Admin Notes if any */}
                    {apt.adminNotes && (
                      <div className="text-xs bg-amber-50/80 text-amber-800 p-2.5 rounded-xl border border-amber-200">
                        <span className="font-bold block text-[11px]">Admin Remarks:</span>
                        <p className="mt-0.5">{apt.adminNotes}</p>
                      </div>
                    )}

                  </div>

                  {/* ADMIN ACTION PANEL: Whether confirmed or cancelled */}
                  {isAdmin && activeTab === 'admin' ? (
                    <div className="p-4 bg-slate-50/90 border-t border-slate-200 space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                        <span>Admin Status Actions</span>
                        {updatingId === apt.id && (
                          <span className="text-blue-600 font-semibold flex items-center gap-1 normal-case">
                            <RefreshCw className="w-3 h-3 animate-spin" />
                            Updating...
                          </span>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        
                        {/* Confirm Button */}
                        <button
                          type="button"
                          disabled={updatingId === apt.id || isConfirmed}
                          onClick={() => handleAdminChangeStatus(apt.id, 'confirmed')}
                          className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                            isConfirmed 
                              ? 'bg-emerald-100 text-emerald-800 cursor-default opacity-80' 
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-2xs active:scale-[0.98]'
                          }`}
                        >
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{isConfirmed ? 'Confirmed' : 'Confirm'}</span>
                        </button>

                        {/* Cancel Button */}
                        <button
                          type="button"
                          disabled={updatingId === apt.id || isCancelled}
                          onClick={() => setCancelModalApt(apt)}
                          className={`py-2 px-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
                            isCancelled 
                              ? 'bg-rose-100 text-rose-800 cursor-default opacity-80' 
                              : 'bg-rose-600 hover:bg-rose-700 text-white shadow-2xs active:scale-[0.98]'
                          }`}
                        >
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                          <span>{isCancelled ? 'Cancelled' : 'Cancel'}</span>
                        </button>

                      </div>

                      <div className="flex items-center justify-between pt-1 text-[11px]">
                        <button
                          type="button"
                          onClick={() => onViewPass(apt)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          View Pass
                        </button>

                        {isConfirmed && (
                          <button
                            type="button"
                            onClick={() => handleAdminChangeStatus(apt.id, 'completed')}
                            className="text-slate-600 hover:text-slate-900 font-medium"
                          >
                            Mark Completed →
                          </button>
                        )}

                        {isCancelled && (
                          <button
                            type="button"
                            onClick={() => handleAdminChangeStatus(apt.id, 'pending')}
                            className="text-amber-600 hover:text-amber-800 font-semibold"
                          >
                            Reopen to Pending
                          </button>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Patient Standard Footer */
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onViewPass(apt)}
                        className="flex-1 py-2 text-xs font-semibold text-blue-700 hover:text-blue-800 bg-white border border-slate-200 rounded-xl transition-colors text-center"
                      >
                        View Digital Pass
                      </button>

                      {isConfirmed || isPending ? (
                        <button
                          onClick={() => onCancelAppointment(apt.id)}
                          className="px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        >
                          Cancel
                        </button>
                      ) : (
                        <button
                          onClick={() => onDeleteAppointment(apt.id)}
                          className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                          title="Remove record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Admin Cancel Confirmation Modal with Optional Remarks */}
      {cancelModalApt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <ShieldAlert className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Cancel Appointment?</h3>
                <p className="text-xs text-slate-500">Ref: {cancelModalApt.referenceNumber}</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Are you sure you want to cancel the appointment for <strong>{cancelModalApt.patientName}</strong> with <strong>{cancelModalApt.doctorName}</strong> on {cancelModalApt.date}?
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700 block">
                Cancellation Reason / Note to Patient (Optional):
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Doctor in emergency surgery, patient requested reschedule, slot unavailable..."
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
                onClick={() => handleAdminChangeStatus(cancelModalApt.id, 'cancelled', cancelReason.trim())}
                className="px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
