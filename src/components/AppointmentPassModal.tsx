import React from 'react';
import { Appointment } from '../types';
import { X, CheckCircle, Calendar, Clock, MapPin, Printer, Download, Share2, Video, User } from 'lucide-react';

interface AppointmentPassModalProps {
  appointment: Appointment | null;
  isOpen: boolean;
  onClose: () => void;
  onViewAllAppointments: () => void;
}

export const AppointmentPassModal: React.FC<AppointmentPassModalProps> = ({
  appointment,
  isOpen,
  onClose,
  onViewAllAppointments
}) => {
  if (!isOpen || !appointment) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadIcs = () => {
    // Generate clean .ics calendar file
    const [year, month, day] = appointment.date.split('-');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//WeCare Hospitals//Appointment Scheduler//EN
BEGIN:VEVENT
SUMMARY:WeCare Hospital: Consultation with ${appointment.doctorName}
DESCRIPTION:Ref: ${appointment.referenceNumber}\\nSpecialty: ${appointment.departmentName}\\nModality: ${appointment.consultationType}\\nPatient: ${appointment.patientName}
LOCATION:WeCare Hospitals, 742 Healthcare Boulevard
DTSTART:${year}${month}${day}T090000Z
DTEND:${year}${month}${day}T100000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${appointment.referenceNumber}-appointment.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden print:m-0 print:border-none print:shadow-none"
        role="dialog"
        aria-modal="true"
        aria-labelledby="pass-title"
      >
        {/* Pass Top Banner */}
        <div className="bg-sky-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors print:hidden"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-semibold tracking-wider uppercase text-sky-300">
                Official Digital Appointment Pass
              </span>
              <h2 id="pass-title" className="text-xl font-bold tracking-tight text-white">
                Booking Confirmed
              </h2>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-sky-800 flex items-center justify-between text-xs text-sky-200">
            <span>Reference ID</span>
            <span className="font-mono text-sm font-bold text-white tracking-wider tabular-nums">
              {appointment.referenceNumber}
            </span>
          </div>
        </div>

        {/* Pass Details */}
        <div className="p-6 space-y-5 text-slate-800">
          {/* Doctor & Dept Card */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[11px] font-medium text-slate-500">
                {appointment.departmentName}
              </span>
              <h3 className="text-base font-bold text-slate-900">
                {appointment.doctorName}
              </h3>
              <p className="text-xs text-slate-600">
                {appointment.doctorTitle}
              </p>
            </div>
            
            <div className="text-right shrink-0">
              <span className="text-[11px] text-slate-500 block">Consultation Type</span>
              <span className="text-xs font-semibold text-sky-800 bg-sky-100/70 px-2 py-0.5 rounded-md inline-block mt-0.5">
                {appointment.consultationType === 'in_person' ? 'In-Person Clinic Visit' : 
                 appointment.consultationType === 'video' ? 'Video Teleconsultation' : 'Follow-up Review'}
              </span>
            </div>
          </div>

          {/* Date, Time & Venue */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-1">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                Date
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {appointment.date}
              </span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
              <span className="text-[11px] text-slate-500 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                Time Slot
              </span>
              <span className="text-sm font-bold text-slate-900 block">
                {appointment.timeSlot}
              </span>
            </div>
          </div>

          {/* Patient Details */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Patient Name</span>
              <span className="font-semibold text-slate-900">{appointment.patientName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Age & Gender</span>
              <span className="text-slate-800 capitalize">{appointment.age} yrs · {appointment.gender}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Contact</span>
              <span className="text-slate-800">{appointment.patientPhone}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Status</span>
              <span className="text-emerald-700 font-semibold uppercase tracking-wider text-[11px]">
                {appointment.status}
              </span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-sky-50/60 border border-sky-100 rounded-xl p-3.5 text-xs text-sky-950 space-y-1">
            <p className="font-semibold text-sky-900">Patient Arrival Instructions:</p>
            <p className="text-sky-800">
              Please arrive 15 minutes prior to your slot at Outpatient Reception. Bring your digital pass or reference ID along with any past medical reports.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2 print:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1.5"
              title="Print Pass"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
            <button
              onClick={handleDownloadIcs}
              className="p-2 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-200/70 rounded-lg transition-colors flex items-center gap-1.5"
              title="Add to Calendar (.ics)"
            >
              <Download className="w-4 h-4" />
              <span>Calendar (.ics)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onViewAllAppointments();
              }}
              className="px-4 py-2 text-xs font-semibold text-sky-800 hover:bg-sky-100/80 rounded-xl transition-colors"
            >
              View My Appointments
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
