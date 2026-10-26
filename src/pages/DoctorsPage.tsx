import React, { useState } from 'react';
import { Doctor, PageView } from '../types';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';
import { Search, Star, Calendar, Clock, MapPin, Filter, ArrowRight, UserCheck, Stethoscope } from 'lucide-react';

interface DoctorsPageProps {
  onNavigate: (page: PageView) => void;
  onSelectDoctor: (doctor: Doctor) => void;
  onBookWithDoctor: (doctor: Doctor) => void;
  preselectedDepartmentId?: string;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onNavigate,
  onSelectDoctor,
  onBookWithDoctor,
  preselectedDepartmentId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState<string>(preselectedDepartmentId || 'all');
  const [selectedDay, setSelectedDay] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'experience' | 'fee'>('rating');

  // Days list
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Filtering
  const filteredDoctors = DOCTORS.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.departmentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesDept = selectedDept === 'all' || doc.departmentId === selectedDept;
    const matchesDay = selectedDay === 'all' || doc.availableDays.includes(selectedDay);

    return matchesSearch && matchesDept && matchesDay;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
    if (sortBy === 'fee') return a.consultationFee - b.consultationFee;
    return 0;
  });

  return (
    <div className="space-y-12 pb-16">
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-800 bg-sky-50 border border-sky-100 px-3 py-1 rounded-lg">
            <span>Faculty Directory</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Medical Faculty & Clinical Specialists
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Our medical staff comprises board-certified clinicians, department chairs, and surgical fellows dedicated to precision diagnostics, compassionate care, and evidence-based healing.
          </p>

          {/* Filtering & Search Bar */}
          <div className="pt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              
              {/* Search text */}
              <div className="md:col-span-5 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctor name, specialty, or language..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:bg-white transition-all"
                />
              </div>

              {/* Department Selector */}
              <div className="md:col-span-3">
                <select
                  value={selectedDept}
                  onChange={(e) => setSelectedDept(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  <option value="all">All Departments ({DEPARTMENTS.length})</option>
                  {DEPARTMENTS.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              {/* Day filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  <option value="all">Any Day</option>
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>

              {/* Sort selector */}
              <div className="md:col-span-2">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                >
                  <option value="rating">Top Rated</option>
                  <option value="experience">Most Experienced</option>
                  <option value="fee">Lowest Fee</option>
                </select>
              </div>
            </div>

            {/* Quick Active Filter Pill bar (interactive buttons) */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-medium">Quick Department:</span>
              <button
                onClick={() => setSelectedDept('all')}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  selectedDept === 'all' 
                    ? 'bg-slate-900 text-white font-semibold' 
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                All
              </button>
              {DEPARTMENTS.filter(d => d.doctorIds.length > 0).slice(0, 10).map(d => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDept(d.id)}
                  className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap ${
                    selectedDept === d.id 
                      ? 'bg-blue-600 text-white font-semibold' 
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {d.displayName || d.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctor Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Showing <strong className="text-slate-900">{filteredDoctors.length}</strong> medical specialists</span>
            {(selectedDept !== 'all' || selectedDay !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedDept('all');
                  setSelectedDay('all');
                  setSearchQuery('');
                }}
                className="text-sky-700 hover:text-sky-900 font-medium"
              >
                Reset all filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-sky-300 hover:shadow-md transition-all flex flex-col justify-between group"
              >
                {/* Doctor Header */}
                <div className="p-6 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${doc.avatarColor} text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs`}>
                        {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <span className="text-[11px] font-semibold text-sky-700 uppercase tracking-wider block">
                          {doc.departmentName}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors">
                          {doc.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-1">
                          {doc.title}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-sm font-bold text-slate-900 block tabular-nums">
                        ${doc.consultationFee}
                      </span>
                      <span className="text-[10px] text-slate-400">Fee</span>
                    </div>
                  </div>

                  {/* Qualifications */}
                  <div className="text-xs text-slate-600 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                    <span className="font-semibold text-slate-700 block text-[11px] uppercase tracking-wider mb-0.5">
                      Qualifications
                    </span>
                    <p className="line-clamp-1 text-slate-600 font-medium">
                      {doc.qualifications}
                    </p>
                  </div>

                  {/* Bio brief */}
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {doc.bio}
                  </p>

                  {/* Doctor stats strip */}
                  <div className="pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Experience</span>
                      <span className="font-bold text-slate-800">{doc.experienceYears}+ Yrs</span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Rating</span>
                      <span className="font-bold text-slate-800 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {doc.rating}
                      </span>
                    </div>
                    <div className="p-1.5 bg-slate-50 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Reviews</span>
                      <span className="font-bold text-slate-800 tabular-nums">{doc.reviewCount}</span>
                    </div>
                  </div>

                  {/* Available schedule preview */}
                  <div className="space-y-1 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="font-medium text-slate-700">Days:</span>
                      <span className="truncate">{doc.availableDays.join(', ')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                      <span className="font-medium text-slate-700">Hours:</span>
                      <span className="truncate">{doc.timeSlots[0]} – {doc.timeSlots[doc.timeSlots.length - 1]}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{doc.opdRoom}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => onSelectDoctor(doc)}
                    className="flex-1 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 rounded-xl transition-colors text-center"
                  >
                    Full Credentials
                  </button>
                  <button
                    onClick={() => onBookWithDoctor(doc)}
                    className="flex-1 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-800 rounded-xl transition-colors text-center flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
              <UserCheck className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">No doctors match your criteria</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try selecting "All Departments" or "Any Day", or search by another doctor name or language.
              </p>
              <button
                onClick={() => {
                  setSelectedDept('all');
                  setSelectedDay('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 text-xs font-semibold text-sky-700 hover:bg-sky-50 rounded-xl transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

    </div>
  );
};
