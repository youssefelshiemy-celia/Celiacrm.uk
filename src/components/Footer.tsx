import React from "react";
import { motion } from "motion/react";
import { 
  MessageCircle, 
  MessageSquare,
  Mail, 
  Phone,
  LayoutGrid,
  Cpu,
  Shield,
  Smartphone
} from "lucide-react";

interface FooterProps {
  lang: 'en' | 'ar';
  onNavigate: (id: string) => void;
  onGoToHub: () => void;
  onGoToElite: () => void;
}

export default function Footer({ lang, onNavigate, onGoToHub, onGoToElite }: FooterProps) {
  const isRTL = lang === 'ar';

  const t = {
    motto: isRTL 
      ? "الحصن الاستراتيجي للإمبراطوريات الرقمية."
      : "The Strategic Stronghold for Digital Empires.",
    platform: isRTL ? "المنصة" : "Platform",
    core: isRTL ? "منظومة سيليا" : "CELIA CORE",
    contact: isRTL ? "اتصل بنا" : "Direct Contact",
    nav: [
      { id: 'home', label: isRTL ? "الرئيسية" : "Home" },
      { id: 'vision', label: isRTL ? "رؤيتنا" : "Vision" },
      { id: 'journey', label: isRTL ? "الرحلة الرقمية" : "Digital Journey" }
    ],
    rights: isRTL 
      ? "جميع الحقوق محفوظة © 2026 CeliaCRM.uk"
      : "All rights reserved CeliaCRM.uk © 2026",
    privacy: isRTL ? "سياسة الخصوصية" : "Privacy Policy",
    terms: isRTL ? "شروط السيادة" : "Terms of Sovereignty"
  };

  return (
    <footer className="bg-brand-teal text-white pt-32 pb-16 px-6 relative overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-5">
         <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-gold-bright rounded-full blur-[200px] translate-x-1/4 -translate-y-1/4" />
      </div>
      
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 lg:gap-24 mb-20">
          <div className="max-w-md">
            <div onClick={() => onNavigate('home')} className="h-16 mb-8 flex items-center cursor-pointer group transition-transform hover:scale-105 origin-left">
                <img src="https://iili.io/BsI9TJ4.png" alt="Celia CRM Logo - Professional Business Management System" className="h-full object-contain brightness-0 invert" />
            </div>
            <p className="text-xl font-medium opacity-80 leading-relaxed mb-6">
              {t.motto}
            </p>
            <motion.div 
               whileHover={{ x: 5 }}
               onClick={() => onNavigate('contact')}
               className="flex items-center gap-3 text-brand-gold-bright cursor-pointer mb-10 group"
            >
               <div className="w-10 h-10 rounded-full border border-brand-gold-bright/30 bg-white/5 flex items-center justify-center group-hover:bg-brand-gold-bright group-hover:text-brand-teal transition-all">
                  <MessageSquare size={16} />
               </div>
               <span className="text-[10px] uppercase font-black tracking-[0.3em]">{isRTL ? "اتصل بنا" : "Contact Us"}</span>
            </motion.div>
            <div className="flex items-center gap-3">
              <motion.a 
                href="https://wa.me/201120920880?text=Hi%20Celia%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20the%20system%20features."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer transition-colors"
                title="WhatsApp"
              >
                <MessageCircle size={18} />
              </motion.a>
              
              <motion.a 
                href="mailto:sales@celiacrm.uk"
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer transition-colors"
                title="Email"
              >
                <Mail size={18} />
              </motion.a>

              <motion.a 
                href="tel:+201120920880"
                whileHover={{ y: -5, backgroundColor: 'rgba(255,255,255,0.15)' }}
                className="w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center cursor-pointer transition-colors"
                title="Call"
              >
                <Phone size={18} />
              </motion.a>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12 lg:gap-20">
             <div className="space-y-6">
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40">{t.platform}</p>
                <ul className="space-y-4 text-sm font-bold opacity-80">
                   {t.nav.map(item => (
                     <li key={item.id} onClick={() => onNavigate(item.id)} className="hover:text-brand-gold-bright transition-colors cursor-pointer">{item.label}</li>
                   ))}
                </ul>
             </div>
             <div className="space-y-8">
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40">{t.core}</p>
                <div className="space-y-5">
                   <div 
                      onClick={onGoToHub} 
                      className="group flex items-center gap-3 cursor-pointer text-brand-gold-bright/70 hover:text-brand-gold-bright transition-all"
                   >
                      <LayoutGrid size={18} className="group-hover:rotate-90 transition-transform" />
                      <span className="text-sm font-black uppercase tracking-widest italic">{isRTL ? "قائمة التحكم" : "Command Hub"}</span>
                   </div>
                   
                   <div 
                      onClick={() => onNavigate('control-center')}
                      className="group flex items-center gap-3 cursor-pointer text-white/70 hover:text-white transition-all"
                   >
                      <Cpu size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-black uppercase tracking-widest italic">{isRTL ? "منظومة التحكم" : "Control Ecosystem"}</span>
                   </div>

                   <div 
                      onClick={onGoToElite} 
                      className="group flex items-center gap-3 cursor-pointer text-white/70 hover:text-white transition-all"
                   >
                      <Shield size={18} className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-black uppercase tracking-widest italic">{isRTL ? "السيادة العالمية" : "Global Sovereignty"}</span>
                   </div>
                </div>
             </div>
             <div className="space-y-6 col-span-2">
                <p className="text-[10px] uppercase font-black tracking-widest opacity-40">{t.contact}</p>
                <ul className="space-y-4 text-sm font-bold">
                   <li className="flex items-center gap-3">
                      <button onClick={() => onNavigate('contact')} className="flex items-center gap-4 text-brand-gold-bright hover:scale-105 transition-transform cursor-pointer">
                        <MessageSquare size={18} />
                        <span>{isRTL ? "اتصل بنا" : "Contact Us"}</span>
                      </button>
                   </li>
                   <li className="flex items-center gap-3">
                      <a href="https://wa.me/201120920880" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-brand-gold-bright hover:scale-105 transition-transform">
                        <MessageCircle size={18} />
                        <span>WhatsApp</span>
                      </a>
                   </li>
                   <li className="flex items-center gap-3">
                      <a href="mailto:sales@celiacrm.uk" className="flex items-center gap-4 text-brand-gold-bright hover:scale-105 transition-transform">
                        <Mail size={18} />
                        <span>Email</span>
                      </a>
                   </li>
                   <li className="flex items-center gap-3">
                      <a href="tel:+201120920880" className="flex items-center gap-4 text-brand-gold-bright hover:scale-105 transition-transform">
                        <Smartphone size={18} />
                        <span>Call</span>
                      </a>
                   </li>
                </ul>
             </div>
          </div>
        </div>

        <div className="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-xs opacity-40 font-medium">
              {t.rights}
           </p>
           <div className="flex items-center gap-8 text-[10px] uppercase font-black tracking-widest opacity-40">
              <button 
                onClick={() => onNavigate('privacy')}
                className="hover:text-brand-gold-bright transition-colors"
              >
                {t.privacy}
              </button>
              <button 
                onClick={() => onNavigate('terms')}
                className="hover:text-brand-gold-bright transition-colors"
              >
                {t.terms}
              </button>
           </div>
        </div>
      </div>
    </footer>
  );
}
