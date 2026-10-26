import React from 'react';
import { Doctor } from '../types';
import { X, Star, Calendar, Clock, MapPin, Award, GraduationCap, Globe, DollarSign, ArrowRight } from 'lucide-react';

interface DoctorDetailModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
  onBookWithDoctor: (doctor: Doctor) => void;
}

export const DoctorDetailModal: React.FC<DoctorDetailModalProps> = ({
  doctor,
  isOpen,
  onClose,
  onBookWithDoctor
}) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doctor-modal-title"
      >
        {/* Header with Doctor Banner */}
        <div className="bg-slate-900 text-white p-6 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${doctor.avatarColor} text-white flex items-center justify-center text-2xl font-bold shadow-md shrink-0 border-2 border-white/20`}>
              {doctor.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-wider font-semibold text-sky-400">
                {doctor.departmentName}
              </span>
              <h2 id="doctor-modal-title" className="text-2xl font-bold tracking-tight text-white">
                {doctor.name}
              </h2>
              <p className="text-sm text-slate-300">
                {doctor.title}
              </p>
              <div className="flex items-center gap-3 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-amber-300 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-300" />
                  {doctor.rating}
                </span>
                <span aria-hidden="true">·</span>
                <span>{doctor.reviewCount} verified reviews</span>
                <span aria-hidden="true">·</span>
                <span>{doctor.experienceYears} Years Exp</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable details */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Key Quick Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Consultation Fee</span>
              <span className="text-lg font-bold text-slate-900">${doctor.consultationFee}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">OPD Location</span>
              <span className="text-xs font-semibold text-slate-900 block truncate">{doctor.opdRoom}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Languages</span>
              <span className="text-xs font-semibold text-slate-900 block truncate">{doctor.languages.join(', ')}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
              <span className="text-xs text-slate-500 block mb-1">Experience</span>
              <span className="text-xs font-semibold text-slate-900 block">{doctor.experienceYears}+ Years</span>
            </div>
          </div>

          {/* Biography */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Professional Biography
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>
          </div>

          {/* Education & Qualifications */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-sky-600" />
              Education & Residency
            </h3>
            <ul className="space-y-2">
              {doctor.education.map((edu, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                  <span>{edu}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fellowships */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              Board Memberships & Fellowships
            </h3>
            <ul className="space-y-2">
              {doctor.fellowships.map((fel, idx) => (
                <li key={idx} className="text-xs text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span>{fel}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Available Timings */}
          <div className="space-y-2 bg-sky-50/70 border border-sky-100 p-4 rounded-xl">
            <h3 className="text-xs font-bold text-sky-950 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-sky-600" />
              Outpatient Clinic Schedule
            </h3>
            <div className="flex flex-wrap gap-2 text-xs font-medium text-sky-900 pt-1">
              <span>Days: {doctor.availableDays.join(', ')}</span>
              <span aria-hidden="true">·</span>
              <span>Slots: {doctor.timeSlots.join(' · ')}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
          >
            Close
          </button>
          
          <button
            onClick={() => {
              onClose();
              onBookWithDoctor(doctor);
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors shadow-sm"
          >
            <span>Book Appointment with {doctor.name.split(' ')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
