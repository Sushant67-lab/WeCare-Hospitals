import React from 'react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { Phone, MapPin, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEmergency }) => {
  const { isAdmin } = useAuth();
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                <svg className="w-4 h-4 text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                WeCare <span className="text-blue-400">Hospitals</span>
              </span>
            </div>
            
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              WeCare Hospitals is a premier multi-specialty healthcare institution dedicated to providing world-class clinical care, compassionate service, and state-of-the-art medical technology.
            </p>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>123 Health Avenue, Medical District, NY 10001</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>contact@wecarehospitals.com</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hospital
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Departments (22)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('doctors')} className="hover:text-white transition-colors">
                  Doctors & Specialists
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('appointments')} className="hover:text-white transition-colors">
                  My Appointments
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('book')} className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
                  Book an Appointment
                </button>
              </li>
            </ul>
          </div>

          {/* Specialized Centers - Hidden on mobile view */}
          <div className="hidden sm:block space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Top Departments
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Cardiology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Neurology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Orthopedics
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  General Surgery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Gastroenterology
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('departments')} className="hover:text-white transition-colors">
                  Oncology
                </button>
              </li>
            </ul>
          </div>

          {/* Emergency & Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Emergency
            </h4>
            
            <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-1.5">
              <span className="text-[11px] font-semibold text-rose-400 block">Emergency & Trauma 24/7</span>
              <p className="text-[11px] text-slate-400 leading-normal">
                Dedicated rapid response for cardiac, neuro, and trauma emergencies.
              </p>
              <button
                onClick={onOpenEmergency}
                className="text-xs font-semibold text-rose-300 hover:text-white underline pt-1 block"
              >
                Emergency Protocol →
              </button>
            </div>

            <div className="pt-1 text-[11px] text-slate-400 space-y-1">
              <p className="text-slate-300 font-medium">Working Hours:</p>
              <p>OPD: Mon - Sat (8:00 AM - 8:00 PM)</p>
              <p>Emergency & Pharmacy: 24/7 Open</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} WeCare Hospitals. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Service</span>
            <span aria-hidden="true">·</span>
            <span>Emergency: 1-800-WECARE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
