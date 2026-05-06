import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ArrowLeft, ArrowRight, Lock, Database, Globe } from 'lucide-react';

interface PrivacyPageProps {
  lang: 'en' | 'ar';
  onBack: () => void;
}

const content = {
  ar: {
    title: "سياسة الخصوصية والسيادة المعلوماتية (Privacy & Data Sovereignty)",
    intro: "في Celia CRM، نحن نؤمن إيماناً راسخاً بأن بياناتك هي أثمن أصولك المؤسسية. لذا، قمنا بتصميم \"سياسة السيادة المعلوماتية\" لتتجاوز مفاهيم الخصوصية التقليدية؛ نحن لا نكتفي بحماية بياناتك فحسب، بل نضمن لك سيطرة مطلقة وحصرية عليها.",
    context: "هذه الوثيقة توضح بوضوح وشفافية كيف نتعامل مع بياناتك كدرع تقني يحمي مصالحك:",
    sections: [
      {
        title: "1. ما هي البيانات التي نقوم بمعالجتها؟",
        desc: "نحن نعالج فقط البيانات الضرورية لتشغيل \"مركز القيادة والسيطرة\" الخاص بك بكفاءة، والتي تشمل:",
        bullets: [
          "بيانات التشغيل المؤسسية: تفاصيل حسابات شركتك، بيانات موظفيك، والتدرج الوظيفي.",
          "بيانات عملائك ومورديك: المعلومات الديموغرافية، التفضيلات، سجلات الحجوزات، والملفات المرجعية.",
          "البيانات المالية: سجلات الفواتير، الدفعات، الحوالات، وعمليات الاسترجاع (نحن لا نخزن بيانات البطاقات الائتمانية الحساسة، بل نعتمد على بوابات دفع مشفرة عالمياً).",
          "إدارة المراسلات والاتصالات: نقوم بمعالجة وتأمين الطلبات والاستفسارات الاحترافية التي تستقبلها منصتك عبر عناوين البريد الإلكتروني المخصصة لخدمة عملائك، لضمان تدفق العمل بانسيابية وسرية تامة."
        ]
      },
      {
        title: "2. كيف نستخدم بياناتك؟ (مبدأ الاستقلالية التامة)",
        desc: "بياناتك تُستخدم حصرياً لخدمتك وتطوير أداء منصتك. نحن نلتزم بالآتي:",
        bullets: [
          "تقديم التقارير التحليلية واللوحات الذكية (360° Dashboard) لتسهيل اتخاذ قراراتك.",
          "أتمتة العمليات اليومية (مثل تنبيهات السفر، رسائل أعياد الميلاد، والفواتير).",
          "عهد الشفافية: نحن لا نبيع، لا نؤجر، ولا نشارك بياناتك مطلقاً مع أي أطراف ثالثة أو أدوات تتبع إعلانية. بياناتك ليست سلعة، بل هي أمانة في خوادمنا."
        ]
      },
      {
        title: "3. الدرع الأمني (كيف نحمي مملكتك؟)",
        desc: "بنينا \"سيليا\" ليكون حصناً رقمياً منيعاً:",
        bullets: [
          "تشفير متطور: يتم تشفير كافة البيانات أثناء النقل والتخزين بأحدث بروتوكولات الأمان العالمية.",
          "نظام الصلاحيات الدقيق: أنت من يتحكم \"بالمللي\" في من يرى ماذا داخل مؤسستك.",
          "سجل التتبع (Audit Trail): نظام مراقبة داخلي يسجل أي حركة أو تعديل على المنصة لضمان أقصى درجات المساءلة والرقابة."
        ]
      },
      {
        title: "4. حقوقك السيادية",
        desc: "لأنك المالك الأوحد لمعلوماتك، تمنحك منصتنا حقوقاً غير قابلة للتفاوض:",
        bullets: [
          "حق الوصول والاستخراج (Export): يمكنك استخراج كافة بياناتك وتقاريرك المالية والإدارية في أي وقت وبضغطة زر.",
          "حق التعديل والحذف: لك الصلاحية الكاملة في مسح أي بيانات أو إنهاء التعاقد وإزالة سجلاتك بالكامل من خوادمنا دون أي قيود خفية."
        ]
      },
      {
        title: "5. التحديثات على وثيقة السيادة",
        desc: "نحن نتطور باستمرار، وإذا قمنا بإجراء أي تحديث جوهري على هذه السياسة لدعم المزيد من الحماية أو التوافق القانوني، سنقوم بإشعارك بشكل مباشر وشفاف عبر لوحة التحكم الخاصة بك."
      }
    ],
    backBtn: "العودة للرئيسية"
  },
  en: {
    title: "Privacy & Data Sovereignty Policy",
    intro: "At Celia CRM, we firmly believe that your data is your most valuable institutional asset. Therefore, we have designed our \"Information Sovereignty Policy\" to transcend traditional privacy concepts; we do not just protect your data, we guarantee you absolute and exclusive control over it.",
    context: "This document clearly and transparently explains how we handle your data as a technical shield protecting your interests:",
    sections: [
      {
        title: "1. What data do we process?",
        desc: "We only process data necessary to operate your \"Command and Control Center\" efficiently, which includes:",
        bullets: [
          "Institutional Operational Data: Company account details, employee data, and organizational hierarchy.",
          "Client & Supplier Data: Demographic info, preferences, booking records, and reference files.",
          "Financial Data: Invoicing records, payments, transfers, and refunds (we do not store sensitive credit card data, relying on global encrypted payment gateways).",
          "Correspondence Management: We secure and process professional inquiries received by your platform via dedicated emails to ensure smooth and confidential workflow."
        ]
      },
      {
        title: "2. How do we use your data? (Total Independence Principle)",
        desc: "Your data is used exclusively to serve you and improve your platform's performance. We commit to:",
        bullets: [
          "Providing analytical reports and smart dashboards (360° Dashboard) for decision-making.",
          "Automating daily operations (e.g., travel alerts, birthday messages, invoices).",
          "Transparency Vow: We never sell, rent, or share your data with third parties or ad trackers. Your data is an entrustment, not a commodity."
        ]
      },
      {
        title: "3. Security Shield",
        desc: "We built Celia to be an impregnable digital fortress:",
        bullets: [
          "Advanced Encryption: All data is encrypted during transit and storage using the latest global security protocols.",
          "Granular Permissions: You control exactly who sees what within your organization.",
          "Audit Trail: An internal monitoring system records every movement on the platform for maximum accountability."
        ]
      },
      {
        title: "4. Your Sovereign Rights",
        desc: "As the sole owner of your information, our platform grants you non-negotiable rights:",
        bullets: [
          "Access & Export: Extract all your data and financial reports at any time with one click.",
          "Modification & Deletion: You have full authority to erase any data or terminate the contract and remove records entirely with no hidden restrictions."
        ]
      },
      {
        title: "5. Policy Updates",
        desc: "We evolve constantly. If we make material updates to this policy for better protection or legal compliance, we will notify you directly via your dashboard.",
      }
    ],
    backBtn: "Back to Home"
  }
};

export default function PrivacyPage({ lang, onBack }: PrivacyPageProps) {
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
            <ShieldCheck size={24} />
            <span className="text-[10px] uppercase font-black tracking-[0.3em]">Institutional Standard</span>
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
                <span className="text-brand-gold-bright/30">0{idx + 1}</span>
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

        <div className="mt-32 p-12 rounded-[3.5rem] bg-brand-teal text-white relative overflow-hidden group shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 -rotate-12 group-hover:scale-110 transition-transform duration-700">
              <Lock size={200} />
           </div>
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-8 border border-white/20">
                 <ShieldCheck size={32} className="text-brand-gold-bright" />
              </div>
              <h3 className="text-2xl font-black mb-6 italic">{isRTL ? "سيليا سي آر إم - الدرع التقني لعلامتك التجارية" : "Celia CRM - The Technical Shield for Your Brand"}</h3>
              <p className="opacity-60 text-sm max-w-2xl mx-auto leading-relaxed">
                {isRTL 
                  ? "نحن نلتزم بحماية إرثك الرقمي وضمان سيادتك المعلوماتية في كل خطوة."
                  : "We are committed to protecting your digital legacy and ensuring your information sovereignty at every step."}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
}
