import React from 'react';
import { PageView } from '../types';
import { ACCREDITATIONS, HOSPITAL_STATS } from '../data/hospitalData';
import { ShieldCheck, Heart, Award, CheckCircle, Users, ArrowRight, Building, Microscope, Activity } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageView) => void;
  onOpenEmergency: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenEmergency }) => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Banner */}
      <section className="bg-slate-900 text-white pt-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-400 bg-sky-950/80 border border-sky-800/80 px-3 py-1.5 rounded-lg">
            <span>Established 2008 · Metro Healthcare District</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white max-w-3xl leading-[1.15]" style={{ textWrap: 'balance' }}>
            Built on Medical Excellence, Guided by Uncompromising Compassion
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
            WeCare Hospitals was founded on the conviction that patients deserve access to world-tier medical expertise, sub-millimeter surgical robotics, and transparent clinical ethics under one roof.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={() => onNavigate('doctors')}
              className="px-6 py-3 text-xs font-semibold text-slate-900 bg-white hover:bg-slate-100 rounded-xl transition-colors shadow-sm"
            >
              Meet Our Medical Faculty
            </button>
            <button
              onClick={() => onNavigate('departments')}
              className="px-6 py-3 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors"
            >
              Explore Clinical Departments
            </button>
          </div>
        </div>
      </section>

      {/* Hospital Campus & Story Split */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-14">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            <div className="lg:col-span-6 relative min-h-[380px] sm:min-h-[460px] h-full">
              <img
                src="/src/assets/images/wecare_medical_team_1792924563947.jpg"
                alt="WeCare Hospital Medical Leaders and Clinical Specialists"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white text-xs">
                <span className="font-semibold block text-sky-300">Multidisciplinary Medical Council</span>
                <p className="text-slate-200 text-[11px] mt-0.5">
                  Over 120 board-certified physicians, surgeon-scientists, and critical care intensivists.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
                  Our Founding Vision
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                  Setting New Benchmarks in Patient Safety and Clinical Outcomes
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  From a 120-bed regional medical facility opened in 2008, WeCare Hospitals has grown into an international destination for tertiary care spanning over 450 licensed beds and 8 centers of clinical excellence.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Patient-Centric Ethics & Transparent Pricing</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Zero hidden surcharges, full informed consent, and open multidisciplinary tumor boards.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Microscope className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Continuous Technological Evolution</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Pioneered robotic knee arthroplasty, 3T silent MRI imaging, and 48-minute door-to-balloon acute coronary response.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Heart className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Compassionate Bedside Nursing</h4>
                    <p className="text-xs text-slate-500 leading-normal">
                      Strict 1:1 patient-to-nurse ratio in intensive care units and 24/7 dedicated patient advocacy coordinators.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Milestones & Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
            Our Journey
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Chronology of Clinical Breakthroughs
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Every decade of our institution has been marked by expansion, specialization, and investment in patient life safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <span className="text-2xl font-bold text-sky-700 block tabular-nums">2008</span>
            <h3 className="text-sm font-bold text-slate-900">Inception & Outpatient Wings</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Founded as a high-acuity surgical center with 120 beds, 4 operating suites, and comprehensive diagnostic laboratory.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <span className="text-2xl font-bold text-sky-700 block tabular-nums">2014</span>
            <h3 className="text-sm font-bold text-slate-900">Level-1 Trauma & Twin Cath Labs</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Commissioned rooftop air-ambulance helipad, dedicated biplane cardiac catheterization labs, and 24-bed acute resuscitation unit.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <span className="text-2xl font-bold text-sky-700 block tabular-nums">2019</span>
            <h3 className="text-sm font-bold text-slate-900">Comprehensive Cancer & NICU Wing</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Added Building B housing the Level-III Neonatal Intensive Care Unit and Varian TrueBeam linear accelerator radiation oncology suites.
            </p>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-3 shadow-xs">
            <span className="text-2xl font-bold text-sky-700 block tabular-nums">2026</span>
            <h3 className="text-sm font-bold text-slate-900">Robotic Surgery & Genomic Center</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Achieved 450+ beds, Da Vinci Xi robotic surgery center, AI-assisted neuro-navigation, and digital patient portal integration.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Chief Medical Officers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 space-y-8">
        <div className="space-y-1">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
            Clinical Governance
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Executive Medical Leadership
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
            Our hospital operations are steered directly by practicing clinicians committed to evidence-based healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 text-white flex items-center justify-center font-bold text-lg">
              MV
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Dr. Marcus Vance, MD, FACC</h3>
              <p className="text-xs font-semibold text-sky-700">Chief Medical Director & Chair of Cardiology</p>
              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                Oversees clinical policies, patient safety governance, and interventional cardiology research protocols.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-950 text-white flex items-center justify-center font-bold text-lg">
              SJ
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Dr. Sarah Jenkins, MD, FAAN</h3>
              <p className="text-xs font-semibold text-sky-700">Chief of Neurological Sciences & Academic Dean</p>
              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                Directs multi-center acute stroke registries, residency training, and neuro-critical care quality metrics.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-slate-200 space-y-4 shadow-xs">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-700 to-stone-900 text-white flex items-center justify-center font-bold text-lg">
              RS
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">Dr. Robert Sterling, MD, FAAOS</h3>
              <p className="text-xs font-semibold text-sky-700">Chief of Surgery & Robotic Arthroplasty</p>
              <p className="text-xs text-slate-500 pt-2 leading-relaxed">
                Leads modular operation theatre standardization, sterile containment integrity, and surgical faculty recruitment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Accreditations & Standards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="p-8 bg-sky-50/60 rounded-3xl border border-sky-100 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">
              Quality Certifications
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Internationally Audited Medical Standards
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ACCREDITATIONS.map((acc, idx) => (
              <div key={idx} className="p-4 bg-white rounded-xl border border-slate-200/80 shadow-xs space-y-1">
                <CheckCircle className="w-5 h-5 text-emerald-600 mb-2" />
                <h4 className="text-xs font-bold text-slate-900">{acc.name}</h4>
                <p className="text-[11px] text-slate-500">{acc.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
