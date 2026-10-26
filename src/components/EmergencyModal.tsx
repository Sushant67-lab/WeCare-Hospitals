import React from 'react';
import { Phone, AlertTriangle, X, ShieldAlert, Clock, MapPin, Ambulance } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-rose-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-dialog-title"
      >
        {/* Urgent Header */}
        <div className="bg-rose-600 px-6 py-5 text-white flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 id="emergency-dialog-title" className="text-xl font-bold tracking-tight">
                24/7 Emergency & Level-1 Trauma
              </h2>
              <p className="text-xs text-rose-100 font-medium">
                Immediate clinical triage · Zero wait time for acute emergencies
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-rose-100 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close emergency modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="bg-rose-50 border border-rose-200/80 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs text-rose-900 space-y-1">
                <p className="font-semibold text-sm text-rose-700">Immediate Life-Threatening Warning</p>
                <p>
                  If you or someone nearby is experiencing chest pain, difficulty breathing, facial droop, sudden loss of consciousness, or profuse bleeding, call immediately or come directly to the emergency ramp.
                </p>
              </div>
            </div>
          </div>

          {/* Direct Dial Hotlines */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              href="tel:911" 
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-rose-600 text-white font-semibold hover:bg-rose-700 transition-colors shadow-sm text-center"
            >
              <Phone className="w-5 h-5 shrink-0" />
              <span>Call 911 / EMS</span>
            </a>
            <a 
              href="tel:1800932273" 
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors shadow-sm text-center"
            >
              <Ambulance className="w-5 h-5 shrink-0 text-rose-400" />
              <span>1-800-WECARE-ER</span>
            </a>
          </div>

          {/* Quick details */}
          <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs text-slate-700">
            <div className="p-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-4 h-4 text-slate-400" />
                Physical Address
              </span>
              <span className="font-medium text-slate-900">742 Healthcare Boulevard, Metro Campus</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <Clock className="w-4 h-4 text-slate-400" />
                Emergency Access
              </span>
              <span className="font-medium text-emerald-700">Open 24 Hours, 365 Days</span>
            </div>
            <div className="p-3.5 flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-500">
                <Ambulance className="w-4 h-4 text-slate-400" />
                Hospital Dispatch Fleet
              </span>
              <span className="font-medium text-slate-900">ACLS-Equipped Intensive Ambulances</span>
            </div>
          </div>

          <p className="text-center text-xs text-slate-500">
            On-duty trauma teams, CT scanner, cardiac catheterization labs, and pediatric intensivists are permanently staffed on site.
          </p>
        </div>

        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 transition-colors"
          >
            Close Emergency Panel
          </button>
        </div>
      </div>
    </div>
  );
};
