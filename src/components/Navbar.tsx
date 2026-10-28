import React, { useState } from 'react';
import { PageView } from '../types';
import { useAuth } from '../context/AuthContext';
import { Menu, X, PhoneCall, CalendarPlus, Mail, MapPin, LogIn, LogOut, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenEmergency: () => void;
  appointmentsCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEmergency,
  appointmentsCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, userProfile, isAdmin, openAuthModal, signOutUser } = useAuth();

  const navLinks: { label: string; page: PageView; count?: number }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Departments', page: 'departments' },
    { label: 'Doctors', page: 'doctors' },
    { 
      label: 'My Appointments', 
      page: 'appointments', 
      count: user && appointmentsCount > 0 ? appointmentsCount : undefined 
    },
    ...(isAdmin ? [{ label: 'Admin Portal', page: 'admin' as PageView }] : [])
  ];

  const handleNavClick = (page: PageView) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  const displayName = userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Patient';

  return (
    <>
      {/* Top Utility Bar matching video */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-3 sm:px-8 border-b border-slate-800 w-full overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4 text-slate-300">
            <a href="tel:+15551234567" className="flex items-center gap-1.5 hover:text-white transition-colors whitespace-nowrap">
              <PhoneCall className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>+1 (555) 123-4567</span>
            </a>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <a href="mailto:contact@wecarehospitals.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors truncate">
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">contact@wecarehospitals.com</span>
            </a>
          </div>
          
          <div className="hidden md:flex items-center gap-3 text-slate-400">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">123 Health Avenue, Medical District, NY 10001</span>
            </div>
            {isAdmin && (
              <>
                <span className="text-slate-700">|</span>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="px-2.5 py-0.5 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 hover:text-white font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Admin Portal</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs w-full overflow-hidden">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-2 sm:gap-4 md:gap-6">
          
          {/* Brand wordmark with blue heart emblem */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left focus:outline-none shrink-0 group"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs shrink-0">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl font-bold tracking-tight whitespace-nowrap">
              <span className="text-slate-900">WeCare</span>{' '}
              <span className="text-blue-600">Hospitals</span>
            </span>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-medium text-slate-600">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors ${
                    isActive 
                      ? 'text-blue-600 font-semibold' 
                      : 'hover:text-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {link.label === 'About' ? 'About Us' : link.label}
                    {user && link.count !== undefined && link.count > 0 && (
                      <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-1.5 py-0.2 rounded-full tabular-nums">
                        {link.count}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Primary Action Buttons & Auth */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            
            {/* User Auth indicator */}
            {user ? (
              <div className="hidden sm:flex items-center gap-2 bg-slate-50 border border-slate-200/90 py-1.5 px-3 rounded-full text-xs">
                <div className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-[11px]">
                  {displayName[0].toUpperCase()}
                </div>
                <span className="font-semibold text-slate-800 max-w-[100px] truncate">
                  {displayName}
                </span>
                {isAdmin && (
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200">
                    Admin
                  </span>
                )}
                <button
                  onClick={signOutUser}
                  title="Sign Out"
                  className="text-slate-400 hover:text-rose-600 transition-colors ml-1 p-0.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('signin')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full transition-all"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>
            )}

            {/* Book Appointment CTA: full text on sm+, compact 'Book' on mobile */}
            <button
              onClick={() => handleNavClick('book')}
              className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all shadow-xs whitespace-nowrap shrink-0"
            >
              <CalendarPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
              <span className="hidden sm:inline">Book Appointment</span>
              <span className="sm:hidden">Book</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
            {/* User status in mobile */}
            {user ? (
              <div className="p-3 bg-blue-50/80 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    {displayName[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{displayName}</p>
                    <p className="text-slate-500 text-[10px] truncate max-w-[180px]">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    signOutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-1 text-[11px] font-semibold text-rose-600 bg-white border border-rose-200 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="p-2 border-b border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => {
                    openAuthModal('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-slate-700 bg-slate-50 rounded-xl text-center border border-slate-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    openAuthModal('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 text-xs font-semibold text-white bg-blue-600 rounded-xl text-center"
                >
                  Register
                </button>
              </div>
            )}

            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-700 font-semibold' 
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {user && link.count !== undefined && link.count > 0 && (
                    <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-full">
                      {link.count}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-slate-100">
              <button
                onClick={() => handleNavClick('book')}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full"
              >
                <CalendarPlus className="w-4 h-4" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
