import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ArrowRight, 
  ArrowLeft,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Presentation,
  Calculator,
  BarChart3,
  Lock,
  Heart,
  CheckCircle2,
  Menu,
  X,
  Shield,
  Zap,
  Globe2
} from "lucide-react";

interface ElitePageProps {
  lang: 'en' | 'ar';
  darkMode: boolean;
  onBack: () => void;
}

export default function ElitePage({ lang, darkMode, onBack }: ElitePageProps) {
  const isRTL = lang === 'ar';

  useEffect(() => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn("window.scrollTo failed:", e);
    }
  }, []);

  const t = {
    ar: {
      nav: ["الرئيسية", "السيادة العالمية", "المميزات النخبوية", "اتصل بنا"],
      hero: {
        tag: "الاستحقاق العالمي (The Global Manifesto)",
        title: "السيادة الرقمية بلا حدود: هندسة النخبة لقيادة السوق العالمي.",
        desc: "نحن لا نقدم مجرد برمجيات؛ نحن نمنحك المركز العصبي الذي يربط إمبراطوريتك الرقمية. Celia CRM صُمم للقادة الذين لا يعترفون بالحدود الجغرافية، بل يفرضون سيادتهم أينما حلوا، محولين التعقيد إلى سيمفونية من التحكم المطلق."
      },
      stats: {
        title: "في ما يلي الطريقة التي يمكن أن يدعم بها برنامج إدارة علاقات العملاء (CRM) أعمالك",
        items: [
          { val: "26%", label: "تحسّن في معدلات الاحتفاظ بالعملاء" },
          { val: "47%", label: "زيادة في حجم عمليات الشراء عبر تعزيز العلاقات مع العملاء المحتملين" },
          { val: "40%", label: "انخفاض في تكاليف خدمة العملاء" },
          { val: "47%", label: "زيادة في معدلات رضا العملاء" },
          { val: "23%", label: "انخفاض في تكاليف عمليات البيع والتسويق" }
        ]
      },
      interface: {
        title: "واجهة النخبة: حين يتحول العرض إلى تجربة بصرية عابرة للقارات.",
        desc: "تميز عن منافسيك في أي سوق عالمي من خلال 'المجلة التفاعلية 3D'. حوّل خدماتك وقصص نجاحك إلى تجربة غامرة تأسر حواس العميل من اللحظة الأولى، مما يسرع قرارات الشراء ويضع علامتك التجارية في مكانة النخبة التي تستحقها."
      },
      fiscal: {
        title: "الحصن المالي: حوكمة صارمة تضمن سيولة عالمية وأماناً بنكياً.",
        desc: "إدارة الأصول المالية العابرة للحدود تتطلب دقة متناهية. مع نظام الحوكمة المالية الذكي، نضمن لك أتمتة كاملة لدورة الفواتير، ومنع أي تسرب مالي، مع رقابة بنكية (Bank-grade) تمنحك الثقة المطلقة في إدارة سيولتك أينما كنت في العالم."
      },
      neural: {
        title: "البصيرة الاستراتيجية: عينك التي لا تنام على نبض مؤسستك.",
        cards: [
          {
            title: "بصيرة 360 درجة",
            desc: "تمنحك تحليلات لحظية لبيانات مبيعاتك وموظفيكم حول العالم، لتمكنك من اتخاذ قرارات سيادية مبنية على الحقائق."
          },
          {
            title: "مركز معالجة التحديات",
            desc: "نظام استشعار مبكر يكتشف الشكاوى قبل تفاقمها، محولاً كل تحدٍ إلى فرصة لبناء ولاء أعمق مع عملائك العالميين."
          },
          {
            title: "السيادة المعلوماتية",
            desc: "تشفير بمستوى عسكري يضمن بقاء أسرارك التجارية وإرثك المعرفي داخل حصنك المنيع، بعيداً عن أعين المتطفلين."
          },
          {
            title: "إدارة الولاء والارتباط",
            desc: "نظام أتمتة ذكي يعتني بملفات عملائك (VIP) قبل وبعد الخدمة، لضمان استمرارية العلاقة وبناء إمبراطورية من العملاء الأوفياء."
          }
        ]
      },
      executive: {
        text: "نحن في Celia CRM لا نقدم أكواداً برمجية؛ نحن نصيغ تحالفات استراتيجية. مهمتنا هي إعادة تعريف التميز المؤسسي، لنكون الركيزة التقنية التي يستند إليها قادة الأعمال في رحلتهم نحو قمة الهرم العالمي."
      },
      cta: {
        title: "العالم ينتظر قيادتك.. هل أنت مستعد لفرض سيادتك؟",
        btn: "ابدأ رحلة السيادة العالمية الآن",
        sidebarTitle: "الانضمام إلى النخبة المؤسسية",
        sidebarDesc: "بوابتكم للنمو.. بخبرات النخبة. العالم ينتظر قيادتك، ابدأ اليوم بتجهيز بنيتك التحتية لتليق بإمبراطوريتك القادمة."
      }
    },
    en: {
      nav: ["Home", "Global Sovereignty", "Elite Features", "Contact"],
      hero: {
        tag: "The Global Manifesto",
        title: "Digital Sovereignty Without Borders: Elite Engineering for Global Market Leadership.",
        desc: "We don't just provide software; we give you the neural center that connects your digital empire. Celia CRM is designed for leaders who don't recognize geographical boundaries but impose their sovereignty wherever they appear, turning complexity into a symphony of absolute control."
      },
      stats: {
        title: "How CRM Supports Your Growth",
        items: [
          { val: "26%", label: "Improved Client Retention Rates" },
          { val: "47%", label: "Increase in Purchase Volume via Lead Relationship Management" },
          { val: "40%", label: "Reduction in Customer Service Costs" },
          { val: "47%", label: "Increase in Customer Satisfaction Rates" },
          { val: "23%", label: "Decrease in Sales & Marketing Operational Costs" }
        ]
      },
      interface: {
        title: "Elite Interface: When Presentation Becomes a Transcontinental Visual Experience.",
        desc: "Distinguish yourself from competitors in any global market through the 'Interactive 3D Magazine'. Turn your services and success stories into an immersive experience that captivates the client's senses from the first moment, accelerating purchase decisions and placing your brand in the elite status it deserves."
      },
      fiscal: {
        title: "Fiscal Fortress: Rigorous Governance Ensuring Global Liquidity and Bank-Grade Security.",
        desc: "Managing transcontinental financial assets requires ultimate precision. With the smart fiscal governance system, we guarantee complete automation of the invoicing cycle and prevention of any financial leak, with bank-grade oversight that gives you absolute confidence in managing your liquidity anywhere in the world."
      },
      neural: {
        title: "Strategic Insight: Your Ever-Watchful Eye on Your Enterprise Pulse.",
        cards: [
          {
            title: "360° Insight",
            desc: "Provides real-time analytics of your sales and employee data worldwide, enabling you to make fact-based sovereign decisions."
          },
          {
            title: "Crisis Resolution Hub",
            desc: "An early detection system that identifies complaints before they escalate, turning every challenge into an opportunity to build deeper loyalty with your global clients."
          },
          {
            title: "Information Sovereignty",
            desc: "Military-grade encryption ensures that your trade secrets and knowledge legacy remain within your impregnable fortress, away from external tracking tools."
          },
          {
            title: "Loyalty & Bond Management",
            desc: "A smart automation system that cares for your VIP client files before and after service, ensuring relationship continuity and building an empire of loyal clients."
          }
        ]
      },
      executive: {
        text: "At Celia CRM, we don't deliver code; we forge strategic alliances. Our mission is to redefine institutional excellence, to be the technical pillar that business leaders rely on in their journey to the top of the global pyramid."
      },
      cta: {
        title: "The World Awaits Your Leadership.. Are You Ready to Impose Your Sovereignty?",
        btn: "Begin Your Global Sovereignty Journey Now",
        sidebarTitle: "Join the Institutional Elite",
        sidebarDesc: "Your gateway to growth.. powered by elite expertise. The world awaits your leadership, start today by preparing your infrastructure to fit your upcoming empire."
      }
    }
  }[lang];

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-950' : 'bg-white'} text-brand-teal dark:text-white transition-colors duration-500`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Hero Section: The Global Manifesto */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden bg-brand-teal text-white">
        {/* Core Energy Nucleus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold-bright/10 rounded-full blur-[150px] animate-pulse pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/sovereign/1920/1080?blur=5')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-brand-gold-bright/20 text-brand-gold-bright text-[11px] font-black uppercase tracking-[0.4em] mb-12 backdrop-blur-md">
              <Shield size={16} />
              {t.hero.tag}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-12 tracking-tighter leading-tight bg-gradient-to-b from-white via-white to-brand-gold-bright/40 bg-clip-text text-transparent italic">
              {t.hero.title}
            </h1>
            
            <p className="text-lg md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed mb-16 font-light italic">
              {t.hero.desc}
            </p>

            <motion.button
              onClick={onBack}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-6 rounded-full bg-brand-gold-bright text-brand-teal font-black text-sm uppercase tracking-[0.2em] shadow-[0_0_50px_rgba(221,200,143,0.3)]"
            >
              {t.cta.btn}
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section: Growth Support */}
      <section className="py-24 px-6 bg-[#fcfbf9] dark:bg-slate-900 border-b border-brand-teal/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-black mb-20 text-brand-teal dark:text-brand-gold-bright tracking-tight max-w-4xl mx-auto italic">
            {t.stats.title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
            {t.stats.items.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-4"
              >
                <span className="text-4xl md:text-6xl font-black text-brand-teal dark:text-white tracking-tighter">{stat.val}</span>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-brand-teal/40 dark:text-slate-400 leading-relaxed">
                   {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Elite 3D Interface */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 rounded-[3rem] overflow-hidden shadow-2xl relative aspect-video bg-black group"
          >
            <img 
              src="https://picsum.photos/seed/magazine-view/1200/800" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-[10s]"
              alt="Celia CRM Elite Interface - 3D Magazine View for Global Business Control"
            />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-20 h-20 rounded-full bg-brand-gold-bright/90 flex items-center justify-center backdrop-blur-md">
                  <Presentation size={40} className="text-brand-teal" />
               </div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-10">
            <div className="inline-block px-5 py-2 bg-brand-teal text-brand-gold-bright text-[10px] font-black uppercase tracking-widest rounded-full">
               Interface Sovereignty
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              {t.interface.title}
            </h2>
            <p className="text-lg md:text-xl text-brand-teal/60 dark:text-slate-400 font-medium leading-relaxed italic border-l-4 border-brand-gold-bright pl-6">
              {t.interface.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Fiscal Sovereignty */}
      <section className="py-32 px-6 bg-[#fcfbf9] dark:bg-slate-900 border-y border-brand-teal/5 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-20">
          <motion.div 
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex-1 relative"
          >
            <div className="absolute -inset-10 bg-brand-gold-bright/10 rounded-full blur-[80px] animate-pulse" />
            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
               <div className="absolute w-[80%] h-[80%] border border-brand-gold-bright/20 rounded-full animate-[spin_20s_linear_infinite]" />
               <div className="absolute w-[60%] h-[60%] border-2 border-brand-gold-bright/40 border-dashed rounded-full animate-[spin_15s_linear_infinite_reverse]" />
               <div className="w-48 h-48 rounded-[3rem] bg-brand-gold-bright flex items-center justify-center shadow-[0_0_100px_rgba(221,200,143,0.5)] transform rotate-45">
                  <Calculator size={80} className="text-brand-teal transform -rotate-45" />
               </div>
               {/* Floating Data Points */}
               <div className="absolute top-0 right-0 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-brand-gold-bright/20 text-brand-teal dark:text-brand-gold-bright">
                  <span className="text-[10px] font-black block">REVENUE SYNC</span>
                  <span className="font-black text-xl">99.99%</span>
               </div>
               <div className="absolute bottom-10 left-0 p-4 bg-brand-teal rounded-2xl shadow-xl text-brand-gold-bright">
                  <span className="text-[10px] font-black block">BANK-GRADE</span>
                  <span className="font-black text-xl italic">SECURED</span>
               </div>
            </div>
          </motion.div>

          <div className="flex-1 space-y-10">
            <div className="inline-block px-5 py-2 bg-brand-gold-bright text-brand-teal text-[10px] font-black uppercase tracking-widest rounded-full">
               Fiscal Integrity
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tighter">
              {t.fiscal.title}
            </h2>
            <p className="text-lg md:text-xl text-brand-teal/60 dark:text-slate-400 font-medium leading-relaxed">
              {t.fiscal.desc}
            </p>
          </div>
        </div>
      </section>

      {/* Neural Hub & Analytics */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
             <div className="inline-block px-5 py-2 bg-brand-teal text-brand-gold-bright text-[10px] font-black uppercase tracking-widest rounded-full mb-8">
               Intelligence Network
             </div>
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">
               {t.neural.title}
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.neural.cards.map((card, i) => {
              const icons = [BarChart3, ShieldAlert, Lock, Heart];
              const Icon = icons[i];
              return (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[3rem] bg-[#fcfbf9] dark:bg-slate-900 border border-brand-teal/5 flex gap-8 items-start hover:shadow-2xl transition-all group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-teal text-brand-gold-bright flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                    <Icon size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-4">{card.title}</h3>
                    <p className="text-brand-teal/70 dark:text-slate-400 font-medium leading-relaxed italic">{card.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Executive Message */}
      <section className="py-32 px-6 bg-brand-teal text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://iili.io/BsI9TJ4.png')] bg-fixed opacity-5 mix-blend-overlay" />
        <div className="max-w-4xl mx-auto text-center relative z-10 px-6">
          <div className="mb-12 text-brand-gold-bright opacity-40">
             <Globe size={80} className="mx-auto" />
          </div>
          <p className="text-2xl md:text-4xl font-black italic leading-tight tracking-tight text-brand-gold-bright">
            "{t.executive.text}"
          </p>
          <div className="mt-12 h-px w-20 bg-brand-gold-bright mx-auto" />
          <p className="mt-8 text-[11px] font-black uppercase tracking-[0.5em] text-white/50">Celia Executive Board</p>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-32 px-6 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter">
              {t.cta.title}
            </h2>
            <div className="p-10 rounded-[3rem] bg-brand-gold-bright/5 border border-brand-gold-bright/20 border-l-8 border-l-brand-gold-bright">
               <h3 className="text-2xl font-black mb-4 text-brand-teal dark:text-brand-gold-bright">{t.cta.sidebarTitle}</h3>
               <p className="text-lg text-brand-teal/70 dark:text-slate-400 font-medium leading-relaxed italic">
                 {t.cta.sidebarDesc}
               </p>
            </div>
          </div>

          <div className="relative">
            <motion.button 
              onClick={onBack}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full min-h-[400px] rounded-[4rem] bg-brand-gold-bright p-12 flex flex-col items-center justify-center text-center group overflow-hidden shadow-[0_50px_100px_-30px_rgba(221,200,143,0.5)]"
            >
               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
               <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-10 group-hover:scale-125 transition-transform duration-700">
                  <CheckCircle2 size={48} className="text-brand-teal" />
               </div>
               <span className="text-2xl font-black text-brand-teal tracking-tighter mb-8 max-w-sm">
                 {t.cta.btn}
               </span>
               <div className="flex items-center gap-3 text-brand-teal/40 font-black uppercase tracking-[0.3em] text-[10px]">
                  <span>ESTABLISH SOVEREIGNTY</span>
                  <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
               </div>
               
               {/* Legal Note in small text at bottom of button area */}
               <p className="mt-8 text-[9px] text-brand-teal/60 font-black tracking-widest bg-white/10 px-4 py-2 rounded-lg">
                  {isRTL ? "بالنقر على البدء، أنت توافق على سياسة الخصوصية وشروط السيادة الخاصة بنا" : "BY INITIATING, YOU AGREE TO OUR PRIVACY & SOVEREIGNTY TERMS"}
               </p>
            </motion.button>
          </div>
        </div>
      </section>

    </div>
  );
}
