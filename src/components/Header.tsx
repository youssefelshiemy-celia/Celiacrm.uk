import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, 
  X, 
  Globe, 
  ChevronDown,
  Shield,
  LayoutGrid,
  Cpu
} from "lucide-react";

interface HeaderProps {
  lang: 'en' | 'ar';
  onLanguageChange: (lang: 'en' | 'ar') => void;
  onNavigate: (id: string) => void;
  onGoToElite: () => void;
  currentView: string;
}

export default function Header({ lang, onLanguageChange, onNavigate, onGoToElite, currentView }: HeaderProps) {
  const isRTL = lang === 'ar';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: isRTL ? "الرئيسية" : "Home" },
    { id: 'vision', label: isRTL ? "رؤيتنا" : "Vision" },
    { id: 'journey', label: isRTL ? "الرحلة الرقمية" : "Digital Journey" },
    { id: 'control-center', label: isRTL ? "مركز التحكم" : "Control Center" },
    { id: 'contact', label: isRTL ? "اتصل بنا" : "Contact Us" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? "bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm py-4" : "bg-transparent py-6"
    }`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="h-10 md:h-12 cursor-pointer group transition-transform hover:scale-105"
        >
          <img src="https://iili.io/BsI9TJ4.png" alt="Celia CRM Logo - Professional Business Management System" className="h-full object-contain" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-[11px] uppercase font-black tracking-[0.2em] text-brand-teal/70 hover:text-brand-gold-bright transition-colors relative group py-2"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-brand-gold-bright transition-all group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-6">
          <button 
            onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-teal/60 hover:text-brand-teal transition-colors"
          >
            <Globe size={14} />
            {lang === 'en' ? 'AR' : 'EN'}
          </button>
          
          <button 
            onClick={() => onNavigate('subscribe')}
            className="px-6 py-3 rounded-full bg-brand-teal text-white font-black text-[10px] uppercase tracking-widest shadow-xl shadow-brand-teal/10 hover:bg-brand-gold-bright hover:text-brand-teal hover:shadow-brand-gold-bright/20 transition-all flex items-center gap-2 group"
          >
            <span className="group-hover:rotate-12 transition-transform">✨</span>
            {isRTL ? "جرب الآن" : "Try Now"}
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-brand-teal"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavigate(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-left py-4 text-xl font-black text-brand-teal border-b border-black/5 flex items-center justify-between group"
                >
                  <span className={isRTL ? 'text-right w-full' : ''}>{item.label}</span>
                  {isRTL ? <ChevronDown className="rotate-90" /> : <ChevronDown className="-rotate-90" />}
                </button>
              ))}
              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={() => {
                    onNavigate('subscribe');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full py-5 rounded-2xl bg-brand-teal text-white font-black uppercase tracking-widest text-center"
                >
                  {isRTL ? "✨ جرب الآن" : "✨ Try Now"}
                </button>
                <button 
                  onClick={() => onLanguageChange(lang === 'en' ? 'ar' : 'en')}
                  className="flex items-center justify-center gap-2 py-4 text-brand-teal/60 font-bold uppercase tracking-widest"
                >
                  <Globe size={16} />
                  {lang === 'en' ? 'Arabic Version' : 'English Version'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
