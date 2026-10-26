import React, { useState } from 'react';
import { Department, Doctor, PageView } from '../types';
import { DEPARTMENTS, DOCTORS } from '../data/hospitalData';
import { 
  Heart, 
  Brain, 
  Bone, 
  Activity, 
  Baby, 
  HeartHandshake, 
  Stethoscope, 
  ShieldAlert, 
  Users, 
  CalendarPlus, 
  Search, 
  ArrowRight,
  Eye,
  Pill,
  Microscope,
  Bed,
  FileText,
  CreditCard,
  Wrench,
  Sparkles,
  Apple,
  Scissors,
  Server,
  ClipboardList,
  Building,
  Scan,
  Syringe,
  Ear,
  Droplets,
  Accessibility
} from 'lucide-react';

interface DepartmentsPageProps {
  onNavigate: (page: PageView) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onSelectDepartment: (dept: Department) => void;
  onBookDepartment: (dept: Department) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({
  onNavigate,
  onSelectDoctor,
  onSelectDepartment,
  onBookDepartment
}) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'medical' | 'surgical' | 'diagnostic_support'>('all');

  // Icon mapping for all 22 departments across Medical, Surgical, and Diagnostic & Support
  const getDepartmentIcon = (deptId: string) => {
    switch (deptId) {
      // Medical Specialist
      case 'cardiology':
        return <Heart className="w-5 h-5 text-blue-600" />;
      case 'neurology':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'gastroenterology':
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
      case 'pulmonology':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'endocrinology':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'dermatology':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      case 'nephrology':
        return <Droplets className="w-5 h-5 text-blue-600" />;
      case 'oncology':
        return <ShieldAlert className="w-5 h-5 text-blue-600" />;
      case 'psychiatry':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'gynecology':
        return <Baby className="w-5 h-5 text-blue-600" />;

      // Surgical Specialist
      case 'general_surgery':
        return <Scissors className="w-5 h-5 text-blue-600" />;
      case 'orthopedics':
        return <Bone className="w-5 h-5 text-blue-600" />;
      case 'neurosurgery':
        return <Brain className="w-5 h-5 text-blue-600" />;
      case 'cardiothoracic_surgery':
        return <Heart className="w-5 h-5 text-blue-600" />;
      case 'ent':
        return <Ear className="w-5 h-5 text-blue-600" />;
      case 'ophthalmology':
        return <Eye className="w-5 h-5 text-blue-600" />;
      case 'urology':
        return <Activity className="w-5 h-5 text-blue-600" />;
      case 'plastic_surgery':
        return <Sparkles className="w-5 h-5 text-blue-600" />;

      // Diagnostic & Support
      case 'radiology':
        return <Scan className="w-5 h-5 text-blue-600" />;
      case 'pathology':
        return <Microscope className="w-5 h-5 text-blue-600" />;
      case 'anesthesiology':
        return <Syringe className="w-5 h-5 text-blue-600" />;
      case 'physiotherapy':
        return <Accessibility className="w-5 h-5 text-blue-600" />;

      default:
        return <Stethoscope className="w-5 h-5 text-blue-600" />;
    }
  };

  const filteredDepts = DEPARTMENTS.filter(dept => {
    const title = dept.displayName || dept.name;
    const desc = dept.cardDesc || dept.shortDesc;
    const matchesSearch = 
      title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      desc.toLowerCase().includes(searchFilter.toLowerCase()) ||
      dept.keyProcedures.some(p => p.toLowerCase().includes(searchFilter.toLowerCase()));

    const matchesCategory = activeCategory === 'all' || dept.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const categoryCounts = {
    all: DEPARTMENTS.length,
    medical: DEPARTMENTS.filter(d => d.category === 'medical').length,
    surgical: DEPARTMENTS.filter(d => d.category === 'surgical').length,
    diagnostic_support: DEPARTMENTS.filter(d => d.category === 'diagnostic_support').length
  };

  return (
    <div className="space-y-12 pb-20 pt-6">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900">
          Our Departments
        </h1>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Comprehensive medical specialties designed to provide you with the best possible care.
        </p>

        {/* Quick Search & Category Bar */}
        <div className="pt-4 max-w-2xl mx-auto space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search across all 22 hospital departments..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all shadow-xs"
            />
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Clean Segmented Category Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-slate-100 rounded-2xl w-fit mx-auto text-xs">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                activeCategory === 'all'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Departments ({categoryCounts.all})
            </button>
            <button
              onClick={() => setActiveCategory('medical')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                activeCategory === 'medical'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Medical Specialist ({categoryCounts.medical})
            </button>
            <button
              onClick={() => setActiveCategory('surgical')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                activeCategory === 'surgical'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Surgical Specialist ({categoryCounts.surgical})
            </button>
            <button
              onClick={() => setActiveCategory('diagnostic_support')}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                activeCategory === 'diagnostic_support'
                  ? 'bg-white text-slate-900 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Diagnostic & Support ({categoryCounts.diagnostic_support})
            </button>
          </div>
        </div>
      </section>

      {/* 3-Column Department Cards Grid matching User Reference Image */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
          <span>
            Showing <strong className="text-slate-900">{filteredDepts.length}</strong> of 22 hospital departments
          </span>
          {(activeCategory !== 'all' || searchFilter) && (
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchFilter('');
              }}
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Reset all filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredDepts.map((dept) => {
            const departmentDoctors = DOCTORS.filter(doc => dept.doctorIds.includes(doc.id));
            const cardTitle = dept.displayName || dept.name;
            const cardDescription = dept.cardDesc || dept.shortDesc;

            return (
              <div
                key={dept.id}
                className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Image Container */}
                <div 
                  className="relative h-56 sm:h-60 w-full overflow-hidden cursor-pointer bg-slate-100"
                  onClick={() => onSelectDepartment(dept)}
                >
                  <img
                    src={dept.image || './images/wecare_hospital_exterior_1792924562478.jpg'}
                    alt={`${cardTitle} at WeCare Hospitals`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors" />

                  {/* Doctor count indicator */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>{departmentDoctors.length} Specialists</span>
                  </div>
                </div>

                {/* Bottom Content Area */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    {/* Icon + Title Header */}
                    <div 
                      className="flex items-center gap-3 cursor-pointer"
                      onClick={() => onSelectDepartment(dept)}
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                        {getDepartmentIcon(dept.id)}
                      </div>
                      <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {cardTitle}
                      </h2>
                    </div>

                    {/* Concise Department Description */}
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-2">
                      {cardDescription}
                    </p>
                  </div>

                  {/* Actions & Doctors quick bar */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    {/* Location & Specialists metadata */}
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span className="truncate max-w-[170px] text-slate-500">{dept.floor}</span>
                      <div className="flex items-center gap-1 truncate max-w-[130px]">
                        {departmentDoctors.map((doc, idx) => (
                          <span
                            key={doc.id}
                            onClick={() => onSelectDoctor(doc)}
                            className="text-xs text-slate-600 hover:text-blue-600 hover:underline cursor-pointer truncate"
                            title={`${doc.name} (${doc.title})`}
                          >
                            {doc.name.replace('Dr. ', '')}{idx < departmentDoctors.length - 1 ? ' ·' : ''}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Button Strip */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectDepartment(dept)}
                        className="py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors text-center"
                      >
                        Department Specs
                      </button>

                      {dept.isBookable !== false ? (
                        <button
                          onClick={() => onBookDepartment(dept)}
                          className="py-2.5 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <CalendarPlus className="w-3.5 h-3.5 text-white" />
                          <span>Book Visit</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => onSelectDepartment(dept)}
                          className="py-2.5 px-3 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-xl transition-all text-center flex items-center justify-center gap-1 shadow-xs"
                        >
                          <span>Contact Desk</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {filteredDepts.length === 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3 mt-8">
            <h3 className="text-base font-bold text-slate-900">No departments match "{searchFilter}"</h3>
            <p className="text-xs text-slate-500">
              Try searching with another specialty or category.
            </p>
            <button
              onClick={() => {
                setSearchFilter('');
                setActiveCategory('all');
              }}
              className="px-4 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
            >
              Reset Search
            </button>
          </div>
        )}
      </section>

      {/* Hospital Care Promise Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h3 className="text-xl font-bold tracking-tight text-white">
              Need Help Navigating Our 32 Departments?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Our clinical triage desk assists with department routing, medical records, and specialist consultations across all divisions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('doctors')}
              className="px-5 py-2.5 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors shadow-xs"
            >
              Browse All Specialists
            </button>
            <button
              onClick={() => onNavigate('book')}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors shadow-xs flex items-center gap-1.5"
            >
              <span>Book Appointment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
