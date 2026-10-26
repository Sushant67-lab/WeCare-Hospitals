import React from 'react';
import { Department, Doctor } from '../types';
import { X, CheckCircle2, ShieldCheck, Stethoscope, Users, Building, ArrowRight, Phone } from 'lucide-react';

interface DepartmentDetailModalProps {
  department: Department | null;
  doctors: Doctor[];
  isOpen: boolean;
  onClose: () => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookDepartment: (department: Department) => void;
}

export const DepartmentDetailModal: React.FC<DepartmentDetailModalProps> = ({
  department,
  doctors,
  isOpen,
  onClose,
  onSelectDoctor,
  onBookDepartment
}) => {
  if (!isOpen || !department) return null;

  const departmentDoctors = doctors.filter(d => department.doctorIds.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dept-modal-title"
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 relative shrink-0">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-sky-400">
              Clinical Center of Excellence
            </span>
            <h2 id="dept-modal-title" className="text-2xl font-bold tracking-tight text-white">
              {department.name}
            </h2>
            <p className="text-sm text-slate-300">
              {department.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-4 border-t border-slate-800 mt-4">
            <span className="flex items-center gap-1.5">
              <Building className="w-4 h-4 text-sky-400" />
              {department.floor}
            </span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-sky-400" />
              {department.phoneExtension}
            </span>
            <span aria-hidden="true">·</span>
            <span>Capacity: {department.bedCapacity} dedicated beds</span>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {department.stats.map((s, idx) => (
              <div key={idx} className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                <span className="text-xs text-slate-500 block mb-0.5">{s.label}</span>
                <span className="text-xl font-bold text-slate-900 tabular-nums">{s.value}</span>
              </div>
            ))}
          </div>

          {/* Overview text */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
              Clinical Overview
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {department.fullDesc}
            </p>
            <p className="text-xs text-slate-500 pt-1">
              Led by <span className="font-semibold text-slate-800">{department.headOfDepartment}</span>
            </p>
          </div>

          {/* Key Procedures & Technology */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sky-600" />
                Key Clinical Procedures
              </h4>
              <ul className="space-y-1.5">
                {department.keyProcedures.map((proc, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 shrink-0" />
                    <span>{proc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Advanced Medical Technology
              </h4>
              <ul className="space-y-1.5">
                {department.keyEquipments.map((eq, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{eq}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Medical Specialists in this department */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-600" />
                Department Specialists ({departmentDoctors.length})
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {departmentDoctors.map((doc) => (
                <div 
                  key={doc.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-300 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${doc.avatarColor} text-white flex items-center justify-center font-bold text-sm shrink-0`}>
                        {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                          {doc.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {doc.title}
                        </p>
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center justify-between pt-1 border-t border-slate-100">
                      <span>{doc.experienceYears}+ Yrs Exp</span>
                      <span className="font-semibold text-slate-900">${doc.consultationFee}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectDoctor(doc);
                    }}
                    className="mt-3 w-full py-1.5 text-[11px] font-semibold text-sky-700 bg-sky-50 hover:bg-sky-100 rounded-lg transition-colors flex items-center justify-center gap-1"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
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
              onBookDepartment(department);
            }}
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors shadow-sm"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Book Consultation in {department.name.split(' ')[0]}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
