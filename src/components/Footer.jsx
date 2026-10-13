import React from 'react';
import { ShieldCheck, Home, Shield, Shuffle, KeyRound, ClipboardCheck, User, GraduationCap } from 'lucide-react';

const LINKS = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'classical', label: 'Classical Ciphers', icon: Shield },
  { id: 'transposition', label: 'Transposition', icon: Shuffle },
  { id: 'rsa', label: 'RSA Cryptography', icon: KeyRound },
  { id: 'quiz', label: 'Quiz', icon: ClipboardCheck },
];

export default function Footer({ onPageChange }) {
  const goTo = (id) => {
    if (onPageChange) onPageChange(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-300 mt-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-16 py-12">
        
        {/* Main Grid Row - បន្ថែម gap ឱ្យកាន់តែទូលាយនិងមានសោភ័ណភាព */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 items-start">

          {/* Brand Section (Width: 4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-xl shadow-md shadow-blue-500/20 text-white shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-base font-black text-white uppercase italic tracking-tight leading-none">
                  Cryptography Lab
                </h2>
                <p className="text-[10px] font-bold text-blue-400 tracking-[0.2em] uppercase mt-1">
                  Advanced Learning System
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An interactive educational platform designed for exploring classical ciphers, transposition techniques, and modern RSA encryption algorithms.
            </p>
          </div>

          {/* Quick Links Section (Width: 3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {LINKS.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => goTo(id)}
                    className="flex items-center gap-2.5 text-xs font-medium text-slate-400 hover:text-white transition-colors py-1 group text-left"
                  >
                    <Icon className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors shrink-0" />
                    <span>{label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Credits Section (Width: 5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              Credits
            </h3>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Submitted To */}
              <div className="flex-1 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-sm flex items-center gap-3.5 hover:border-blue-500 transition-colors">
                <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Submitted To
                  </span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">
                    Mr. LIM Seyha
                  </span>
                </div>
              </div>

              {/* Created By */}
              <div className="flex-1 p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80 shadow-sm flex items-center gap-3.5 hover:border-indigo-500 transition-colors">
                <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
                  <User className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Created By
                  </span>
                  <span className="text-xs font-bold text-white truncate block mt-0.5">
                    Mr. SAM CHANNA
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} Cryptography Lab. For educational purposes.</p>
          <p>Designed for Computer Science Project</p>
        </div>

      </div>
    </footer>
  );
}