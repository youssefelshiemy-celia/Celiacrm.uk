import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, CheckCircle2 } from "lucide-react";

interface SubscriptionSectionProps {
  isRTL: boolean;
  t: any;
  formStatus: { type: 'enquiry' | 'subscription' | null; status: 'idle' | 'loading' | 'success' | 'error'; message?: string };
  setFormStatus: (status: { type: 'enquiry' | 'subscription' | null; status: 'idle' | 'loading' | 'success' | 'error'; message?: string }) => void;
  handleFormSubmit: (e: React.FormEvent, type: 'enquiry' | 'subscription') => void;
  onNavigate: (id: string) => void;
}

const SubscriptionSection: React.FC<SubscriptionSectionProps> = ({ 
  isRTL, 
  t, 
  formStatus, 
  setFormStatus, 
  handleFormSubmit,
  onNavigate
}) => {
  return (
    <section id="subscribe" className="py-24 md:py-48 px-6 bg-surface-paper dark:bg-slate-900 overflow-hidden relative transition-colors shadow-inner">
      <div className="max-w-[1440px] mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center">
        <div>
          <div className="w-20 h-20 rounded-[2rem] bg-brand-gold-bright flex items-center justify-center text-brand-teal mb-10 shadow-2xl rotate-3">
            <Briefcase size={36} />
          </div>
          <h2 className={`text-5xl md:text-6xl font-black text-brand-teal dark:text-brand-gold-bright mb-8 tracking-tighter leading-tight ${isRTL ? 'font-cairo' : ''}`}>
            {t.forms.subscription.title}
          </h2>
          <p className="text-xl text-brand-teal/70 dark:text-slate-300 mb-12 max-w-lg leading-relaxed font-medium">
            {t.forms.subscription.desc}
          </p>
          
          <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-brand-teal/5 dark:border-white/5 shadow-xl group hover:border-brand-gold-bright/30 transition-all">
                  <p className="text-sm font-black mb-2 text-brand-teal dark:text-brand-gold-bright">Elite Support</p>
                  <p className="text-[10px] text-brand-teal/50 dark:text-slate-400 uppercase tracking-widest font-bold leading-relaxed">Dedicated Strategic Tech Team 24/7</p>
              </div>
              <div className="p-8 bg-white dark:bg-slate-800 rounded-[2.5rem] border border-brand-teal/5 dark:border-white/5 shadow-xl group hover:border-brand-gold-bright/30 transition-all">
                  <p className="text-sm font-black mb-2 text-brand-teal dark:text-brand-gold-bright">Performance SLA</p>
                  <p className="text-[10px] text-brand-teal/50 dark:text-slate-400 uppercase tracking-widest font-bold leading-relaxed">Guaranteed Excellence & Scalability</p>
              </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-10 bg-brand-gold-bright/20 rounded-[5rem] blur-[100px] -rotate-6 opacity-30" />
          <div className="relative bg-brand-teal dark:bg-slate-800 p-10 md:p-14 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,54,61,0.4)] border border-brand-gold-bright/30 overflow-hidden group">
            {/* Card Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-bright/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <AnimatePresence mode="wait">
              {formStatus.type === 'subscription' && formStatus.status === 'success' ? (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-20 relative z-10"
                >
                  <div className="w-24 h-24 bg-brand-gold-bright text-brand-teal rounded-full flex items-center justify-center mb-8 shadow-2xl">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-6 tracking-tight">{t.forms.subscription.success}</h3>
                  {formStatus.message && (
                    <div className="mb-8 p-4 bg-brand-gold-bright/10 rounded-2xl border border-brand-gold-bright/30">
                        <p className="text-[10px] text-brand-gold-bright font-black uppercase tracking-widest">{formStatus.message}</p>
                    </div>
                  )}
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setFormStatus({ type: null, status: 'idle' })}
                    className="px-10 py-4 bg-brand-gold-bright text-brand-teal rounded-full text-xs font-black uppercase tracking-[0.2em] shadow-xl"
                  >
                    {isRTL ? "العودة للرئيسية" : "Return to Sovereign"}
                  </motion.button>
                </motion.div>
              ) : (
                <form key="form" name="subscription-form" data-netlify="true" onSubmit={(e) => handleFormSubmit(e, 'subscription')} className="space-y-8 relative z-10">
                  <input type="hidden" name="form-name" value="subscription-form" />
                  <div className="grid sm:grid-cols-3 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.name}</label>
                      <input name="name" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white placeholder:text-white/20" placeholder="Your Full Estate Name" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.email}</label>
                      <input name="email" required type="email" className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white placeholder:text-white/20" placeholder="official@domain.com" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.whatsapp}</label>
                      <input name="whatsapp" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white placeholder:text-white/20" placeholder="+1..." />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.country}</label>
                      <input name="country" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white" />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70 block">{t.forms.subscription.employees}</label>
                      <input name="employees" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white placeholder:text-white/20" placeholder={isRTL ? "عدد الموظفين" : "Team Size"} />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.sector}</label>
                      <input name="sector" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white" placeholder={isRTL ? "القطاع التجاري" : "Real Estate / Travel / etc"} />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.subject}</label>
                      <input name="subject" required className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all text-white" />
                    </div>
                  </div>
                  
                  {/* Hidden metadata for elite plan */}
                  <input type="hidden" name="plan" value="Elite Strategic Partnership" />
                  <input type="hidden" name="price" value="Custom Enterprise" />
                  <input type="hidden" name="frequency" value="Custom" />
                  
                  <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold-bright/70">{t.forms.subscription.message}</label>
                      <textarea name="message" rows={3} className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-gold-bright outline-none transition-all resize-none text-white" />
                  </div>

                  <button 
                    id="subscription-submit-btn"
                    disabled={formStatus.status === 'loading'}
                    className="w-full py-6 bg-brand-gold-bright text-brand-teal font-black text-sm rounded-2xl hover:shadow-[0_0_40px_rgba(230,200,138,0.4)] active:scale-[0.98] transition-all transform flex items-center justify-center gap-4 uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {formStatus.status === 'loading' ? <div className="w-5 h-5 border-2 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin" /> : t.forms.subscription.cta}
                  </button>
                  {formStatus.type === 'subscription' && formStatus.status === 'error' && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 font-bold text-center text-xs">
                        {t.forms.subscription.error}
                    </motion.p>
                  )}
                  <div className="text-[9px] text-white/40 text-center font-bold px-4 leading-tight">
                    {isRTL ? (
                      <>
                        بالنقر على التقديم، أنت توافق على{" "}
                        <button type="button" onClick={() => onNavigate('privacy')} className="text-brand-gold-bright hover:underline cursor-pointer">سياسة الخصوصية</button>
                        {" "}و{" "}
                        <button type="button" onClick={() => onNavigate('terms')} className="text-brand-gold-bright hover:underline cursor-pointer">شروط السيادة</button>
                        {" "}الخاصة بنا
                      </>
                    ) : (
                      <>
                        By clicking submit, you agree to our{" "}
                        <button type="button" onClick={() => onNavigate('privacy')} className="text-brand-gold-bright hover:underline cursor-pointer">Privacy Policy</button>
                        {" "}and{" "}
                        <button type="button" onClick={() => onNavigate('terms')} className="text-brand-gold-bright hover:underline cursor-pointer">Sovereignty Terms</button>.
                      </>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionSection;
