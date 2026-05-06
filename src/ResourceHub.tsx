import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, 
  ChevronRight, 
  Globe2, 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Zap, 
  Shield, 
  Target, 
  Cpu, 
  Gem,
  LayoutGrid
} from "lucide-react";

interface ResourceHubProps {
  lang: 'en' | 'ar';
  onBack: () => void;
  onNavigate: (id: string) => void;
}

interface HubItem {
  key: string;
  labelAr: string;
  labelEn: string;
  popupTitleAr: string;
  popupTitleEn: string;
  popupDescAr: string;
  popupDescEn: string;
}

export default function ResourceHub({ lang, onBack, onNavigate }: ResourceHubProps) {
  const isRTL = lang === 'ar';
  const [activeItem, setActiveItem] = useState<HubItem | null>(null);

  const hubData = {
    col1: {
      titleAr: "استكشف منظومة القيادة",
      titleEn: "Explore the Hub",
      items: [
        {
          key: "free-crm",
          labelAr: "إدارة العلاقات مجاناً",
          labelEn: "CRM for Free",
          popupTitleAr: "بوابة الدخول",
          popupTitleEn: "The Entry Gate",
          popupDescAr: "ابدأ رحلتك في عالم السيادة الرقمية بنسخة تجريبية تمنحك نظرة ثاقبة على أدواتنا الأساسية. استكشف كيف يمكن لـ Celia CRM أن يعيد تعريف نظام عملك دون التزامات مسبقة.",
          popupDescEn: "Begin your journey in the world of digital sovereignty with a trial version that gives you deep insight into our core tools. Explore how Celia CRM can redefine your operating system without prior commitments."
        },
        {
          key: "sme",
          labelAr: "للشركات الصغيرة والمتوسطة",
          labelEn: "For SMEs",
          popupTitleAr: "هندسة النمو",
          popupTitleEn: "Growth Engineering",
          popupDescAr: "حلول مفصلة للشركات الطموحة التي تسعى للتحول إلى كيانات مؤسسية كبرى. نوفر لك الأدوات اللازمة للسيطرة على قطاعك السوقي منذ اليوم الأول.",
          popupDescEn: "Tailored solutions for ambitious companies seeking to transform into major institutional entities. We provide the tools necessary to dominate your market sector from day one."
        },
        {
          key: "google",
          labelAr: "Google Workspace CRM",
          labelEn: "Google Workspace CRM",
          popupTitleAr: "الربط العصبي",
          popupTitleEn: "The Neural Link",
          popupDescAr: "تكامل مطلق مع أدواتك الحالية. اجعل من بيئة Google Workspace جزءاً من حصنك المنيع في سيليا، حيث تتدفق البيانات بسلاسة بين بريدك، تقويمك، ومنظومة التحكم الخاصة بك.",
          popupDescEn: "Absolute integration with your existing tools. Make your Google Workspace environment part of your impregnable fortress in Celia, where data flows seamlessly between your mail, calendar, and control system."
        }
      ]
    },
    col2: {
      titleAr: "الموارد الاستراتيجية",
      titleEn: "Strategic Resources",
      items: [
        {
          key: "what-is-crm",
          labelAr: "ما المقصود بـ CRM؟",
          labelEn: "What is CRM?",
          popupTitleAr: "دستور السيادة",
          popupTitleEn: "The Sovereignty Constitution",
          popupDescAr: "نحن لا نعرف الـ CRM كمجرد أداة لحفظ البيانات، بل كمركز قيادة وسيطرة (Neural Center) يربط أطراف مؤسستك بعقل مدبر واحد يضمن لك التفوق الاستراتيجي.",
          popupDescEn: "We don't define CRM merely as a tool for data storage, but as a Neural Center that connects the facets of your organization to a single mastermind ensuring strategic superiority."
        },
        {
          key: "help-center",
          labelAr: "مركز المساعدة",
          labelEn: "Help Center",
          popupTitleAr: "فريق الدعم النخبوي",
          popupTitleEn: "Elite Support Team",
          popupDescAr: "مستشارونا التقنيون في خدمتك على مدار الساعة. ليس مجرد دعم فني، بل توجيه استراتيجي لضمان استمرارية سيادتك الرقمية وحل التحديات قبل وقوعها.",
          popupDescEn: "Our technical consultants are at your service 24/7. Not just technical support, but strategic guidance to ensure your digital sovereignty's continuity and resolve challenges before they occur."
        },
        {
          key: "training",
          labelAr: "التدريب",
          labelEn: "Training",
          popupTitleAr: "أكاديمية القيادة",
          popupTitleEn: "The Leadership Academy",
          popupDescAr: "برامج تدريبية مكثفة لفريقك لضمان إتقان استخدام أدوات 'سيليا'. نحن نؤمن بأن القوة التكنولوجية تكتمل بالمهارة البشرية الاحترافية.",
          popupDescEn: "Intensive training programs for your team to ensure mastery of 'Celia' tools. We believe that technological power is completed by professional human skill."
        }
      ]
    },
    col3: {
      titleAr: "مسار التنفيذ",
      titleEn: "The Implementation Path",
      items: [
        {
          key: "why-celia",
          labelAr: "لمَ يجب استخدام Celia CRM؟",
          labelEn: "Why use Celia CRM?",
          popupTitleAr: "الفارق السيادي",
          popupTitleEn: "The Sovereignty Difference",
          popupDescAr: "لأنك لا تبحث عن برنامج، بل تبحث عن سيادة. سيليا تمنحك الواجهة الـ 3D الفريدة، الحوكمة المالية الصارمة، والأمان العسكري الذي تفتقده الأنظمة التقليدية الجافة.",
          popupDescEn: "Because you aren't looking for software, but for sovereignty. Celia gives you a unique 3D interface, rigorous fiscal governance, and military-grade security that traditional, dry systems lack."
        },
        {
          key: "plans",
          labelAr: "مقارنة الخطط",
          labelEn: "Compare Plans",
          popupTitleAr: "مستويات الاستحقاق",
          popupTitleEn: "Merit Levels",
          popupDescAr: "اختر مستوى التحكم الذي يليق بحجم إمبراطوريتك. من باقات النمو السريع إلى باقات السيادة الكاملة للمؤسسات الكبرى، كل خيار مصمم ليمنحك أقصى قيمة استراتيجية.",
          popupDescEn: "Choose the level of control that fits your empire's size. From rapid growth packages to complete sovereignty for large institutions, every option is designed to grant you maximum strategic value."
        },
        {
          key: "sales",
          labelAr: "تواصل مع فريق المبيعات",
          labelEn: "Contact Sales",
          popupTitleAr: "جلسة التخطيط الاستراتيجي",
          popupTitleEn: "Strategic Planning Session",
          popupDescAr: "احجز موعداً مع أحد خبراء النخبة لدينا لمناقشة كيفية تهيئة Celia CRM ليتناسب مع رؤيتك الفريدة. نحن هنا لنصيغ معك مستقبلك الرقمي.",
          popupDescEn: "Book an appointment with one of our elite experts to discuss how to tailor Celia CRM to fit your unique vision. We are here to shape your digital future with you."
        }
      ]
    },
    industries: {
      titleAr: "حلول الصناعة السيادية",
      titleEn: "Sovereign Industry Solutions",
      items: [
        {
          key: "travel",
          labelAr: "سيليا لوكالات السفر",
          labelEn: "Celia for Travel Agencies",
          popupTitleAr: "أتمتة الحجوزات",
          popupTitleEn: "Automated Bookings",
          popupDescAr: "توسع في وكالة السفر الخاصة بك مع أتمتة سيليا الذكية. لوحة حجز موحدة، إنشاء قسائم آلية، وتتبع دقيق لمدفوعات الموردين.",
          popupDescEn: "Scale Your Travel Agency with Celia's Smart Automation. Unified booking dashboard, automated voucher generation, and supplier payment tracking."
        },
        {
          key: "real-estate",
          labelAr: "سيليا للعقارات",
          labelEn: "Celia for Real Estate",
          popupTitleAr: "إدارة العقارات والعملاء",
          popupTitleEn: "Lead & Property Tracking",
          popupDescAr: "أغلق المزيد من الصفقات مع سيليا للمحترفين العقاريين. تتبع مصادر العملاء (FB, Google)، متابعات آلية، وإدارة مخزون العقارات باحترافية.",
          popupDescEn: "Close More Deals with Celia CRM for Real Estate Professionals. Lead source tracking (FB, Google, Portals), automated follow-ups, and property inventory management."
        },
        {
          key: "services",
          labelAr: "سيليا لمقدمي الخدمات",
          labelEn: "Celia for Service Providers",
          popupTitleAr: "إدارة المهام والفوترة",
          popupTitleEn: "Task Management & Billing",
          popupDescAr: "مركز العمليات الشامل للشركات القائمة على الخدمات. تتبع المشاريع، فواتير آلية، وبوابة عملاء متكاملة لطلبات الدعم.",
          popupDescEn: "Celia: The All-in-One Operations Hub for Service-Based Businesses. Project tracking, automated invoicing, and client portal for support requests."
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-white text-brand-teal selection:bg-brand-gold-bright selection:text-brand-teal font-montserrat overflow-hidden transition-colors" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Dynamic Blended Background */}
      <div className="fixed inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-brand-teal/10 to-transparent" />
         <div className="absolute bottom-0 right-0 w-full h-[500px] bg-gradient-to-t from-brand-teal/[0.03] to-transparent" />
         <div className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-brand-gold-bright/[0.03] blur-[150px] rounded-full" />
      </div>

      {/* Content Hub Header */}
      <section className="relative z-10 pt-20 pb-20 px-6 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 text-brand-teal text-[10px] font-black uppercase tracking-[0.4em] mb-6 backdrop-blur-md italic">
            <LayoutGrid size={14} />
            {isRTL ? "قائمة التحكم والموارد" : "COMMAND & RESOURCE HUB"}
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter italic lg:text-7xl max-w-4xl mx-auto text-brand-teal">
             {isRTL ? "منظومة الموارد الاستراتيجية" : "Strategic Resource Ecosystem"}
          </h1>
          <p className="text-brand-teal/50 text-sm max-w-2xl mx-auto font-medium tracking-wide italic leading-relaxed">
             {isRTL ? "بوابة النخبة للوصول إلى أدوات السيطرة والنمو المتكاملة، حيث تتحول الرؤى إلى واقع ملموس." : "The elite portal to access integrated control and growth tools, where visions transform into tangible reality."}
          </p>
        </motion.div>
      </section>

      {/* Columns Grid with Inline Content */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-20">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
          {[hubData.col1, hubData.col2, hubData.col3].map((col, colIdx) => (
            <div key={colIdx} className="space-y-12">
              <div className="flex items-center gap-4 border-b border-brand-teal/5 pb-6">
                <div className="p-3 bg-brand-teal rounded-xl shadow-lg shadow-brand-teal/20">
                  {colIdx === 0 ? <Cpu size={24} className="text-brand-gold-bright" /> : colIdx === 1 ? <BookOpen size={24} className="text-brand-gold-bright" /> : <Target size={24} className="text-brand-gold-bright" />}
                </div>
                <h3 className="text-brand-teal text-xl font-black italic tracking-tight">
                  {isRTL ? col.titleAr : col.titleEn}
                </h3>
              </div>
              
              <div className="space-y-10">
                {col.items.map((item, itemIdx) => (
                  <motion.div 
                    key={itemIdx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: itemIdx * 0.1 }}
                    className="group"
                  >
                    <div className="mb-4 flex items-center gap-3">
                       <span className="text-[10px] font-black text-brand-gold-bright uppercase tracking-widest px-3 py-1 bg-brand-gold-bright/5 rounded-full border border-brand-gold-bright/10">
                          {isRTL ? item.popupTitleAr : item.popupTitleEn}
                       </span>
                    </div>
                    <h4 className="text-lg font-black text-brand-teal mb-3 group-hover:text-brand-gold-bright transition-colors italic">
                       {isRTL ? item.labelAr : item.labelEn}
                    </h4>
                    <p className="text-sm text-brand-teal/60 font-medium leading-relaxed italic border-l-2 border-brand-gold-bright/10 pl-4 group-hover:border-brand-gold-bright/40 transition-all">
                       {isRTL ? item.popupDescAr : item.popupDescEn}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Verticals Section - Premium Highlight */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-32">
        <div className="p-8 md:p-16 rounded-[3rem] bg-brand-teal text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-gold-bright/[0.07] to-transparent" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-gold-bright/5 rounded-full blur-[80px]" />
          
          <div className="relative z-10 mb-16 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-brand-gold-bright text-[10px] font-black uppercase tracking-[0.3em] mb-4">
                <Gem size={14} />
                {isRTL ? "التخصص السيادي" : "SOVEREIGN SPECIALIZATION"}
              </div>
              <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter">
                {isRTL ? hubData.industries.titleAr : hubData.industries.titleEn}
              </h2>
            </div>
            <p className="text-white/60 text-sm max-w-md italic font-medium leading-relaxed">
              {isRTL ? "حلول مصممة هندسياً لتمكين القيادة في قطاعات حيوية محددة." : "Engineered solutions designed to empower leadership in specific vital sectors."}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {hubData.industries.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[2rem] bg-white/5 border border-white/10 hover:bg-white/[0.08] transition-all group backdrop-blur-sm"
              >
                <div className="text-brand-gold-bright text-[10px] font-black uppercase tracking-widest mb-6 block">
                  {isRTL ? item.popupTitleAr : item.popupTitleEn}
                </div>
                <h4 className="text-xl font-black mb-4 group-hover:text-brand-gold-bright transition-colors uppercase italic tracking-tight">
                  {isRTL ? item.labelAr : item.labelEn}
                </h4>
                <p className="text-sm text-white/60 font-medium leading-relaxed italic">
                  {isRTL ? item.popupDescAr : item.popupDescEn}
                </p>
                <div 
                  onClick={() => onNavigate('subscribe')}
                  className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between cursor-pointer group/btn"
                >
                   <span className="text-[9px] font-bold text-brand-gold-bright uppercase tracking-widest italic">{isRTL ? "ابدأ مجاناً الآن" : "Get Started for Free"}</span>
                   <div className="w-8 h-8 rounded-full bg-brand-gold-bright/20 flex items-center justify-center text-brand-gold-bright group-hover/btn:bg-brand-gold-bright group-hover/btn:text-brand-teal transition-all">
                      {isRTL ? <ArrowLeft size={14} /> : <ChevronRight size={14} />}
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
