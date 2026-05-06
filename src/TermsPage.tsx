import React from 'react';
import { motion } from 'motion/react';
import { Shield, ArrowLeft, ArrowRight, Gavel, Scale, FileText } from 'lucide-react';

interface TermsPageProps {
  lang: 'en' | 'ar';
  onBack: () => void;
}

const content = {
  ar: {
    title: "شروط السيادة والخدمة (Terms of Sovereignty & Service)",
    intro: "مرحباً بكم في CeliaCRM.uk. يشار إليها هنا بـ \"المنصة\". من خلال الوصول إلى خدماتنا أو استخدامها، فإنكم توافقون على الالتزام بشروط السيادة هذه، والتي تم تصميمها لحماية بيئة الأعمال النخبوية وضمان استدامة التميز الرقمي.",
    sections: [
      {
        title: "1. القبول والسيادة",
        desc: "باستخدامك للمنصة، فإنك تقر بأنك تملك السلطة القانونية لتمثيل مؤسستك وبأنك توافق على هذه الشروط. سيادة المنصة تعني حقنا في تحديث الأدوات والواجهات لضمان أفضل أداء عالمي، مع إخطاركم بأي تغييرات جوهرية."
      },
      {
        title: "2. ملكية الأصول والسيادة المعلوماتية",
        desc: "نحن نؤمن بمبدأ الملكية المطلقة للعميل:",
        bullets: [
          "البيانات المدخلة: كافة البيانات والملفات والمعلومات التي تقوم برفعها أو معالجتها عبر المنصة هي ملكية حصرية لك أو لمؤسستك.",
          "الملكية الفكرية للمنصة: تظل البنية التحتية البرمجية، الأكواد، التصاميم (خاصة تقنيات الـ 3D)، والهوية البصرية لـ Celia CRM ملكية فكرية محمية لنا.",
          "تراخيص الاستخدام: يُمنح المشترك ترخيصاً غير حصري وقابل للإلغاء لاستخدام أدوات المنصة طوال فترة الاشتراك النشط."
        ]
      },
      {
        title: "3. الاستخدام المقبول والنزاهة",
        desc: "تلتزم المؤسسة باستخدام المنصة في أغراض مشروعة ووفقاً للأعراف التجارية النخبوية. يُمنع منعاً باتاً:",
        bullets: [
          "محاولة هندسة عكسية للأكواد أو سرقة تقنيات العرض ثلاثي الأبعاد الخاصة بنا.",
          "استخدام المنصة في أنشطة غير قانونية أو تضر بالصالح العام.",
          "مشاركة حسابات الوصول مع أطراف غير مصرح لها خارج نطاق المؤسسة المشتركة."
        ]
      },
      {
        title: "4. الضمانات وحدود المسؤولية",
        desc: "نحن نسعى للكمال التشغيلي (Sovereign Availability):",
        bullets: [
          "نلتزم بتوفير المنصة بنسبة تشغيل عالية (SLA)، مع إجراء الصيانة الدورية في أوقات لا تؤثر على سير العمل.",
          "لا تتحمل المنصة مسؤولية أي خسائر ناتجة عن سوء استخدام الأدوات أو القرارات التجارية المبنية على البيانات التحليلية."
        ]
      },
      {
        title: "5. إنهاء السيادة (Termination)",
        desc: "يمكن لأي من الطرفين إنهاء العلاقة التعاقدية وفقاً للإجراءات المحددة في باقة الاشتراك. عند الإلغاء، نلتزم بمنحكم مهلة كافية لاستخراج كافة بياناتكم قبل إزالتها نهائياً من خوادمنا."
      }
    ],
    backBtn: "العودة للرئيسية"
  },
  en: {
    title: "Terms of Sovereignty & Service",
    intro: "Welcome to CeliaCRM.uk. By accessing or using our services, you agree to be bound by these Terms of Sovereignty, designed to protect an elite business environment and ensure the sustainability of digital excellence.",
    sections: [
      {
        title: "1. Acceptance & Sovereignty",
        desc: "By using the platform, you verify that you have the legal authority to represent your institution and that you agree to these terms. Platform sovereignty refers to our right to update tools and interfaces to ensure global performance standards, with notice provided for material changes."
      },
      {
        title: "2. Asset Ownership & Information Sovereignty",
        desc: "We operate on the principle of absolute client ownership:",
        bullets: [
          "Data Input: All data, files, and information uploaded or processed via the platform remains your or your institution's exclusive property.",
          "Platform IP: Software infrastructure, code, designs (especially 3D technology), and the visual identity of Celia CRM remain our protected intellectual property.",
          "Usage License: Subscribers are granted a non-exclusive, revocable license to use platform tools during an active subscription."
        ]
      },
      {
        title: "3. Acceptable Use & Integrity",
        desc: "Institutions commit to using the platform for lawful purposes in accordance with elite commercial ethics. The following is strictly prohibited:",
        bullets: [
          "Reverse engineering the source code or duplicating our 3D interface technology.",
          "Using the platform for illegal activities or actions that harm the public interest.",
          "Sharing access credentials with unauthorized third parties outside the registered institution."
        ]
      },
      {
        title: "4. Guarantees & Liability",
        desc: "We strive for operational perfection (Sovereign Availability):",
        bullets: [
          "We commit to a high uptime Service Level Agreement (SLA), with maintenance scheduled during off-peak hours.",
          "The platform is not liable for losses resulting from misuse of tools or business decisions based on analytical data."
        ]
      },
      {
        title: "5. Termination",
        desc: "Either party may terminate the contractual relationship according to the procedures specified in the subscription package. Upon cancellation, we commit to granting enough time for data extraction before records are removed from our servers."
      }
    ],
    backBtn: "Back to Home"
  }
};

export default function TermsPage({ lang, onBack }: TermsPageProps) {
  const isRTL = lang === 'ar';
  const t = content[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 pt-32 pb-48 px-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto">
        <motion.button
          initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={onBack}
          className="flex items-center gap-2 text-brand-teal/60 dark:text-brand-gold-bright hover:text-brand-teal dark:hover:text-white transition-colors mb-12 font-bold uppercase tracking-widest text-[10px]"
        >
          {isRTL ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          {t.backBtn}
        </motion.button>

        <div className="relative mb-20">
          <div className="inline-flex items-center gap-4 px-6 py-2 rounded-2xl bg-brand-gold-bright/10 text-brand-gold-bright border border-brand-gold-bright/20 mb-8">
            <Scale size={24} />
            <span className="text-[10px] uppercase font-black tracking-[0.3em]">Legal Framework</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-brand-teal dark:text-white mb-10 tracking-tighter leading-tight">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl font-bold text-brand-teal dark:text-brand-gold-bright mb-6 leading-relaxed">
            {t.intro}
          </p>
          <div className="w-24 h-1 bg-brand-gold-bright rounded-full" />
        </div>

        <div className="space-y-20">
          {t.sections.map((section: any, idx: number) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-black text-brand-teal dark:text-white flex items-center gap-4">
                <span className="text-brand-gold-bright/30">SC-0{idx + 1}</span>
                {section.title}
              </h2>
              <p className="text-lg text-brand-teal/70 dark:text-slate-300 leading-relaxed font-medium">
                {section.desc}
              </p>
              {section.bullets && (
                <ul className="space-y-4 pl-4 md:pl-8 border-l border-brand-teal/5 dark:border-white/5">
                  {section.bullets.map((bullet: string, bidx: number) => (
                    <li key={bidx} className="flex gap-4 group">
                      <div className="mt-2 w-2 h-2 rounded-full bg-brand-gold-bright shrink-0 group-hover:scale-125 transition-transform" />
                      <span className="text-base text-brand-teal/60 dark:text-slate-400 font-medium">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 rounded-[3.5rem] mt-24 bg-surface-paper dark:bg-slate-800 border border-brand-teal/5 dark:border-white/5 relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 group-hover:scale-110 transition-transform duration-700">
              <Gavel size={200} />
           </div>
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-brand-teal text-brand-gold-bright flex items-center justify-center mb-8 border border-white/20">
                 <FileText size={32} />
              </div>
              <h3 className="text-2xl font-black mb-6 italic text-brand-teal dark:text-white">{isRTL ? "وثيقة السيادة القانونية 2026" : "Legal Sovereignty Document 2026"}</h3>
              <p className="text-brand-teal/50 dark:text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
                {isRTL 
                  ? "تخضع هذه الشروط لقوانين التجارة العالمية والأعراف التقنية النخبوية المعمول بها."
                  : "These terms are governed by international trade laws and establish technical elite standards."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
