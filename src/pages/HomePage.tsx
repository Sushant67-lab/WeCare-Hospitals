import React from 'react';
import { PageView, Doctor, Department } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { 
  CalendarPlus, 
  ArrowRight, 
  ShieldAlert, 
  UserCheck, 
  Clock, 
  Building2, 
  Activity,
  Heart,
  Brain,
  Bone,
  CheckCircle2,
  Stethoscope,
  Microscope
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectDepartment: (dept: Department) => void;
  onOpenEmergency: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectDoctor,
  onSelectDepartment,
  onOpenEmergency
}) => {
  // Highlight top 6 departments for the home page preview
  const featuredDepts = DEPARTMENTS.slice(0, 6);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      
      {/* Hero Section matching video */}
      <section className="pt-8 sm:pt-14 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Pill badge matching video */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span>Welcome to WeCare Hospitals</span>
              </div>

              {/* Main Headline matching video */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15] break-words">
                Your Health Is Our{' '}
                <span className="text-blue-600">Top Priority</span>
              </h1>

              {/* Subtitle matching video */}
              <p className="text-sm sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                Experience world-class healthcare with our team of expert doctors and state-of-the-art facilities. We are committed to providing compassionate care for you and your family.
              </p>

              {/* Hero CTA buttons */}
              <div className="flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('book')}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all shadow-sm"
                >
                  <CalendarPlus className="w-4 h-4 text-white" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  onClick={() => onNavigate('doctors')}
                  className="flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-colors"
                >
                  <span>Find a Doctor</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>

              {/* Key Trust Signals */}
              <div className="pt-4 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  120+ Specialists
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-500" />
                  24/7 Emergency Care
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  32 Specialized Departments
                </span>
              </div>

            </div>

            {/* Right Hero Image Card with Success Rate badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/80 shadow-lg bg-slate-100 aspect-[4/3] sm:aspect-[5/4] lg:aspect-square">
                <img
                  src="/src/assets/images/wecare_modern_facility_1792924563210.jpg"
                  alt="WeCare Hospitals Clinical Team and Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                
                {/* Floating Success Rate Badge matching video */}
                <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md border border-slate-100 rounded-2xl p-4 shadow-xl flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Activity className="w-6 h-6 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block font-medium">Success Rate</span>
                    <span className="text-xl font-extrabold text-slate-900 tracking-tight">98.6%</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4 Feature Cards */}
      <section className="px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div 
              onClick={() => onNavigate('book')}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <CalendarPlus className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Easy Appointments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Book online instantly with any of our board-certified clinical doctors.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('doctors')}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">Expert Doctors</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Over 120+ fellowship-trained specialists across medical & surgical disciplines.
              </p>
            </div>

            <div 
              onClick={onOpenEmergency}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-rose-400 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">24/7 Emergency</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Round-the-clock rapid response trauma center, ICU, and resuscitation bay.
              </p>
            </div>

            <div 
              onClick={() => onNavigate('departments')}
              className="p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">22 Departments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                From emergency, cardiology and oncology to pharmacy, labs and therapy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Clinical Departments */}
      <section className="px-4 sm:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Specialized Healthcare
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Our Departments
              </h2>
              <p className="text-sm text-slate-500 max-w-xl">
                Comprehensive care delivered with advanced diagnostic and surgical capabilities.
              </p>
            </div>

            <button
              onClick={() => onNavigate('departments')}
              className="flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>View All 22 Departments</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3-Column Department Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredDepts.map((dept) => {
              const cardTitle = dept.displayName || dept.name;
              const cardDesc = dept.cardDesc || dept.shortDesc;

              return (
                <div
                  key={dept.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
                >
                  {/* Top Image */}
                  <div 
                    className="relative h-52 sm:h-56 w-full overflow-hidden cursor-pointer bg-slate-100"
                    onClick={() => onSelectDepartment(dept)}
                  >
                    <img
                      src={dept.image || '/src/assets/images/wecare_hospital_exterior_1792924562478.jpg'}
                      alt={`${cardTitle} Department`}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors" />
                  </div>

                  {/* Bottom Content */}
                  <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div 
                        className="flex items-center gap-3 cursor-pointer"
                        onClick={() => onSelectDepartment(dept)}
                      >
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                          {dept.id === 'cardiology' ? (
                            <Heart className="w-5 h-5 text-blue-600 group-hover:text-white" />
                          ) : dept.id === 'neurology' ? (
                            <Brain className="w-5 h-5 text-blue-600 group-hover:text-white" />
                          ) : dept.id === 'orthopaedics' ? (
                            <Bone className="w-5 h-5 text-blue-600 group-hover:text-white" />
                          ) : (
                            <Stethoscope className="w-5 h-5 text-blue-600 group-hover:text-white" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                          {cardTitle}
                        </h3>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                        {cardDesc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                      <button
                        onClick={() => onSelectDepartment(dept)}
                        className="font-semibold text-slate-600 hover:text-slate-900"
                      >
                        Learn More
                      </button>
                      <button
                        onClick={() => onNavigate('book')}
                        className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <span>Book Slot</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Blue Medical Consultation Callout Banner matching video frame 04 */}
      <section className="px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-600 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            
            <div className="space-y-2 max-w-xl text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Need a Medical Consultation?
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Don't wait. Schedule your appointment today and take the first step towards better health.
              </p>
            </div>

            <div className="shrink-0">
              <button
                onClick={() => onNavigate('book')}
                className="px-8 py-3.5 text-sm font-bold text-blue-600 bg-white hover:bg-blue-50 active:scale-[0.98] rounded-full transition-all shadow-sm"
              >
                Book Appointment Now
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
