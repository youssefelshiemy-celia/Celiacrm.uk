import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  BarChart3, 
  Wallet, 
  ShieldCheck, 
  ShieldAlert,
  Shield,
  TicketCheck, 
  Gift,
  FileBarChart,
  Lock,
  ArrowRight, 
  ArrowLeft,
  ChevronDown,
  Mail,
  Smartphone,
  CheckCircle2,
  Menu,
  X,
  Globe,
  Database,
  Calculator,
  MessageCircle,
  MessageSquare,
  Phone,
  Briefcase,
  Users,
  ListChecks,
  Presentation,
  Heart,
  PlayCircle,
  Moon,
  Sun,
  Server,
  Cpu,
  LayoutGrid
} from "lucide-react";
import SubscriptionSection from "./components/SubscriptionSection";

interface LandingPageProps {
  lang: 'en' | 'ar';
  onViewMagazine: (id: string) => void;
  onGoToElite: () => void;
  onGoToHub: () => void;
  onNavigate: (id: string) => void;
  darkMode: boolean;
}

interface FAQItemProps {
  item: { q: string; a: string };
  index: number;
  isRTL: boolean;
  key?: React.Key;
}

function FAQItem({ item, index, isRTL }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between p-8 bg-white border border-brand-teal/5 transition-all group-hover:border-brand-gold-bright/30 group-hover:shadow-[0_20px_60px_-15px_rgba(40,78,75,0.1)] ${isOpen ? 'rounded-t-[2.5rem] rounded-bl-[2.5rem] border-brand-teal/10 shadow-lg' : 'rounded-[2.5rem] rounded-bl-none shadow-sm'}`}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <span className={`text-lg md:text-xl font-black italic tracking-tight text-brand-teal flex-1 ${isRTL ? 'text-right' : 'text-left'}`}>
          {item.q}
        </span>
        <div className={`p-2 rounded-full transition-transform duration-500 ${isOpen ? 'rotate-180 bg-brand-teal text-brand-gold-bright' : 'bg-brand-teal/5 text-brand-teal'}`}>
           <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className={`p-10 text-brand-teal/70 text-lg leading-relaxed font-medium italic bg-brand-teal/[0.02] border-x border-b border-brand-teal/5 rounded-br-[2.5rem] -mt-4 pt-14 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="w-12 h-1 bg-brand-gold-bright/30 mb-6 rounded-full" />
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LandingPage({ lang, onViewMagazine, onGoToElite, onGoToHub, onNavigate, darkMode }: LandingPageProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'enquiry' | 'subscription' | null; status: 'idle' | 'loading' | 'success' | 'error'; message?: string }>({ type: null, status: 'idle' });
  
  const isRTL = lang === 'ar';

  const t = {
    ar: {
      nav: ["الرئيسية", "رؤيتنا", "التحول الرقمي", "منظومة التحكم", "تواصل معنا"],
      hero: {
        title: "السيادة الرقمية لعلامتك التجارية تبدأ مع CeliaCRM.uk",
        subtitle: "CeliaCRM.uk هي منصة القيادة الاستراتيجية المتكاملة، تدمج بين الابتكار الفني والذكاء المالي المتقدم، صُممت خصيصاً للقادة الذين يصيغون ملامح المستقبل.",
        cta1: "ابدأ الآن مجاناً",
        cta2: "ابدأ رحلة السيادة العالمية الآن",
        cta3: "فلسفتنا",
        eliteBtn: "السيادة العالمية"
      },
      about: {
        title: "عن Celia CRM: حيث تلتقي الريادة بالخبرة الاستراتيجية",
        philosophyTitle: "بوابتكم للنمو.. بخبرات النخبة",
        philosophyDesc: "في Celia CRM، نؤمن بأن البرمجيات ليست مجرد أسطر برمجية، بل هي 'فن مؤسسي' يجمع بين الذكاء الاستراتيجي ودقة التنفيذ. لقد شيدنا منصتنا لتكون المحرك الاستباقي الذي يتوقع تحديات أعمالك ويذللها قبل ظهورها.",
        humanTech: "التكنولوجيا في خدمة التمكين البشري",
        humanTechDesc: "نتجاوز التعقيد التقني لنركز على الجوهر: النتائج المستدامة. Celia CRM تمنحك 'نظام تشغيل' استراتيجياً يضمن لك التفرد في السوق.",
        values: [
          { label: "C", desc: "Creativity in solutions" },
          { label: "E", desc: "Efficiency in operations" },
          { label: "L", desc: "Leadership in the market" },
          { label: "I", desc: "Insight in every detail" },
          { label: "A", desc: "Advantage in growth" }
        ],
        privacy: {
          title: "التزامنا بالسيادة المعلوماتية والاستقلالية",
          data: "خصوصية البيانات: بياناتك هي أصل من أصولك، نلتزم بحمايتها بعيداً عن أدوات التتبع الخارجية.",
          independence: "استقلالية القرار: نمونا ذاتي ومبني على الإيمان برؤيتنا، مما يجعل العميل هو وجهتنا الأولى والأخيرة.",
          transparency: "شفافية مطلقة: نعتمد نموذج العمل المباشر دون عقود خفية؛ جودة الحلول هي سفيرنا الدائم."
        },
        word: "رسالتنا لمجتمع الأعمال",
        wordDesc: "نحن لا نقدم برمجيات، بل نؤسس لشراكات استراتيجية. هدفنا هو صياغة واقع جديد للتميز المؤسسي، لنكون الذراع التقني الذي يستند إليه قادة الأعمال في رحلتهم نحو القمة."
      },
      stats: {
        item1: { val: "40%+", label: "معدل تعظيم الأرباح السنوي" },
        item2: { val: "99.9%", label: "دقة الحوكمة المالية" },
        item3: { val: "0.5ث", label: "سرعة المعالجة السيادية" }
      },
      neuralCenter: {
        title: "مركز القيادة والسيطرة",
        desc: "منظومة ذكية تمنحك أدوات سيادية للتحكم في أدق مفاصل مؤسستك بمعايير احترافية عالمية.",
          sections: [
          { 
            id: "control",
            title: "منظومة التحكم الشاملة", 
            desc: "المركز العصبي لمؤسستك الذي يربط كافة العمليات في بيئة موحدة. تحكم كامل في الصلاحيات، مراقبة لحظية للأداء، وتكامل سلس يمنحك السيادة المطلقة على كل تفاصيل إمبراطوريتك الرقمية.",
            icon: "Cpu"
          },
          { 
            id: "magazine",
            title: "الواجهة الرقمية المتميزة (3D)", 
            desc: "ابهر عملاءك من النظرة الأولى واسبق منافسيك بخطوة. مع سيليا، ستقدم خدماتك من خلال 'مجلة 3D' تفاعلية واحترافية تدمج الصور والفيديوهات، مما يعكس فخامة علامتك التجارية ويرفع معدلات التحول.",
            icon: "Presentation"
          },
          { 
            id: "tracking",
            title: "إدارة سلاسل المهام", 
            desc: "نظام تتبع استراتيجي يصاحب عميلك من أول استفسار وحتى إتمام الخدمة، من خلال إنشاء 'ملف احترافي' برقم مرجعي يلم بكل تفاصيله. نضمن لك توجيه فريقك بفاعلية، وتحويل كل فرصة متاحة إلى عائد مضمون دون أي مجهود أو وقت مُهدر.",
            icon: "ListChecks"
          },
          { 
            id: "finance",
            title: "الحوكمة المالية الذكية", 
            desc: "خزنتك وحساباتك تحت السيطرة.. وداعاً للتسرب المالي! دورة مالية متكاملة تضع إيراداتك ومستحقات الموردين بين يديك بوضوح تام: متابعة لحظية للدفعات المحصلة والمتبقية على العملاء، إدارة شاملة لحسابات الموردين، وإصدار فواتير احترافية بضغطة زر.",
            icon: "Calculator"
          },
          { 
            id: "care",
            title: "إدارة الولاء والارتباط", 
            desc: "العميل دائماً في بالك بدون مجهود. نظام أتمتة استباقي يعتني بعملائك قبل، خلال، وبعد الخدمة: تنبيهات ذكية، ولاء ممتد عبر إيميلات تهنئة تلقائية وخصومات ورسائل متابعة. اجعل عميلك يشعر أنه الـ VIP الوحيد لديك!",
            icon: "Heart"
          },
          { 
            id: "problems",
            title: "مركز معالجة التحديات", 
            desc: "حوّل كل أزمة إلى فرصة لزيادة ثقة عملائك. نظام استشعار مبكر يكتشف الشكاوى ويتابعها بدقة، يعالج تعثرات الموردين، ويتتبع حالات الاسترجاع والتعويضات قبل أن تؤثر على سير العمل لضمان استمرارية أعمال بلا توقف.",
            icon: "ShieldAlert"
          },
          { 
            id: "dashboard",
            title: "لوحة القيادة الشاملة", 
            desc: "دير شركتك من شاشة واحدة بثقة كاملة. سيليا يضع الشركة كلها أمام عينيك عبر داشبورد ذكية تعرض تقارير تحليلية شاملة للمبيعات والموظفين والموردين، وتمنحك القوة لاتخاذ قرارات استثمارية جريئة مبنية على أرقام دقيقة.",
            icon: "BarChart3"
          },
          { 
            id: "security",
            title: "درع الأمان والتحكم المطلق", 
            desc: "بيانات عملائك وشركتك في أمان تام ومحكم بالمللي. يوفر لك سيليا نظام 'صلاحيات مرن وقوي' يتيح لك تحديد ما يمكن لكل موظف رؤيته أو تعديله بدقة متناهية، مدعوماً بسجل تتبع (Audit Trail) لضمان أقصى درجات الشفافية والرقابة.",
            icon: "Lock"
          },
          { 
            id: "experience",
            title: "تجربة مستخدم استثنائية", 
            desc: "قوة بلا تعقيد.. واجهة سلسة تتحدث لغتك! يأتيك 'سيليا' بواجهة ذكية وبسيطة مصممة خصيصاً لتريح العين وتنجز المهام بضغطة زر. مدعوم بترجمة احترافية وتوافق كامل باللغتين العربية والإنجليزية ليتكيف فوراً مع بيئة عملك.",
            icon: "Globe"
          }
        ]
      },
      transformation: {
        title: "التحول من الفوضى التشغيلية إلى السيادة المؤسسية",
        before: {
          title: "العمليات التقليدية (مخاطر العشوائية)",
          items: [
            "خسارة فادحة للعملاء بسبب غياب التفاعل المؤتمت",
            "اضطرابات في سلاسل الإمداد وتناقضات متكررة في الفواتير",
            "انفصال استراتيجي عن متطلبات العميل وتطلعاته",
            "إرهاق إداري ناتج عن عبء الحسابات اليدوية التقليدية",
            "نزاعات معلقة واستجابات متأخرة تضعف القيمة السوقية للعلامة",
            "قرارات مبنية على الحدس الشخصي بدلاً من الحقائق الرقمية",
            "ثغرات أمنية تهدد الأسرار المهنية والأسهم المعرفية",
            "أصول رقمية مشتتة وتخزين مستندات مجزأ وغير منظم"
          ],
          labels: ["أتمتة العملاء", "الحوكمة المالية", "التواصل والولاء", "الحسابات", "إدارة الأزمات", "تحليل البيانات", "الحماية والأمن", "الأرشيف السحابي"]
        },
        after: {
          title: "حقبة CeliaCRM.uk (عصر السيادة)",
          items: [
            "أتمتة تفاعلية استباقية تقتنص الفرص عالية القيمة",
            "حوكمة مالية صارمة تمنع التسرب وتضمن السيولة المطلقة",
            "ارتباط عميق (مؤسسي وعاطفي) مع كافة أصحاب المصلحة",
            "أتمتة مالية بمعايير بنكية تمنح مرونة مالية مطلقة",
            "قيادة مركزية للأزمات للحل السريع واستعادة ولاء العملاء",
            "تحليلات ذكاء أعمال (BI) لحظية تقود استراتيجيتك العليا",
            "حماية سيبرانية بمستوى عسكري لضمان السيادة المعلوماتية",
            "مستودعات سحابية مشفرة تحفظ الإمبراطورية المعرفية لعلامتك"
          ]
        }
      },
      magazine: {
        title: "المجلة الرقمية: سلاحك الاستراتيجي للتفرد",
        desc: "تجاوز النمط التقليدي للعروض التقديمية وامنح عملاءك تجربة بصرية تفاعلية تبهر العقول وتحسم الصفقات الكبرى."
      },
      forms: {
        enquiry: {
          title: "كيف يمكن لمستشارينا تقديم الدعم؟",
          desc: "خبراؤنا التقنيون والاستراتيجيون على أهبة الاستعداد للإجابة على تطلعاتكم.",
          name: "الاسم الكريم",
          email: "البريد المؤسسي",
          subject: "عنوان الاستفسار",
          message: "تفاصيل الطلب",
          send: "إرسال الاستفسار الاستراتيجي",
          success: "نشكر تواصلكم النخبوِي! سيقوم أحد خبرائنا بالرد خلال ساعات قليلة.",
          error: "عذراً، حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب."
        },
        subscription: {
          title: "الانضمام إلى النخبة المؤسسية",
          desc: "يرجى تزويدنا بالبيانات الأساسية لتهيئة البنية التحتية الخاصة بمؤسستكم على نظام CeliaCRM.uk.",
          name: "الاسم الكامل",
          email: "البريد الإلكتروني الرسمي",
          whatsapp: "رقم التواصل (WhatsApp)",
          country: "مقر النشاط",
          employees: "سعة الفريق التشغيلي",
          sector: "القطاع التجاري",
          subject: "عنوان الطلب",
          message: "ملاحظات إضافية (اختياري)",
          cta: "تقديم طلب الشراكة المؤسسية",
          legalNote: "بالنقر على التقديم، أنت توافق على [سياسة الخصوصية] و [شروط السيادة] الخاصة بنا",
          success: "تم استلام طلبكم بنجاح! سيتواصل معكم فريقنا الاستراتيجي عبر القنوات الرسمية لاستكمال إجراءات التأسيس.",
          error: "فشل إرسال الطلب. يرجى التأكد من اتصالك بالإنترنت والمحاولة مجدداً."
        }
      },
      footer: {
        rights: "كافة الحقوق محفوظة CeliaCRM.uk © 2026",
        motto: "المعقل الحصين لبناء الإمبراطوريات الرقمية."
      },
      comingSoon: "انطلاق قريب جداً",
      faq: {
        title: "الأسئلة الشائعة: قيادة المستقبل الرقمي",
        subtitle: "The Sovereign FAQ",
        items: [
          {
            q: "ما الذي يجعل Celia CRM الخيار الأول لنخبة المؤسسات عالمياً؟",
            a: "بخلاف الأنظمة التقليدية، نحن ندمج بين السيادة المعلوماتية المطلقة وواجهات العرض ثلاثية الأبعاد (3D) التي تعيد تعريف تجربة العميل، مع نظام حوكمة مالي يمنع أي تسرب في أصولك الرقمية."
          },
          {
            q: "ما هي القيمة المضافة التي تقدمها واجهة الـ 3D لعملائي؟",
            a: "الواجهة الـ 3D ليست مجرد عرض بصري، بل هي أداة إقناع استراتيجية تحول خدماتك إلى مجلة تفاعلية غامرة، مما يقلل من مقاومة الشراء لدى العميل ويزيد من معدلات التحول بنسبة تليق بمكانة براند النخبة."
          },
          {
            q: "كيف يدعم النظام اتخاذ القرارات التنفيذية الكبرى؟",
            a: "من خلال لوحة القيادة الذكية بـ 360 درجة، يوفر النظام تحليلات استباقية (Predictive Analytics) تكتشف الفرص والتحديات قبل وقوعها، مما يمنحك بصيرة استراتيجية لاتخاذ قرارات سيادية مبنية على حقائق رقمية دقيقة."
          },
          {
            q: "هل يمكن ربط Celia CRM بالأدوات التي تستخدمها مؤسستي حالياً؟",
            a: "نعم، المنظومة مصممة لتكون المركز العصبي (Neural Hub) لإمبراطوريتك الرقمية؛ حيث توفر تكاملاً فورياً وسلساً مع Google Workspace وكافة الأدوات العالمية عبر أنظمة API متطورة لضمان تناغم العمليات."
          },
          {
            q: "كيف تضمن \"سيليا\" أمان البيانات والخصوصية الاستراتيجية؟",
            a: "نعتمد بروتوكولات تشفير بمستوى عسكري (Military-grade)، ونمنحك استقلالية تامة عن أدوات التتبع الخارجية؛ بياناتك في \"سيليا\" هي حصن منيع يخصك وحدك، ولا تملك أي جهة أخرى الوصول لإرثك المعرفي."
          },
          {
            q: "ما هو أفضل نظام ERP للشركات الصغيرة في عام 2026؟",
            a: "أفضل نظام ERP يجب أن يكون قابلاً للتوسع، وبأسعار معقولة، وسهل الاستخدام. تم تصميم سيليا CRM خصيصاً لمساعدة الشركات الصغيرة والمتوسطة على أتمتة عملياتها دون تعقيدات تقنية."
          },
          {
            q: "كيف يمكن إدارة بيانات العملاء بأمان في نظام CRM؟",
            a: "أمن البيانات هو أولويتنا القصوى. يستخدم سيليا CRM تشفيراً متقدماً وبيئات خوادم آمنة (مثل نشر Dockerized) لضمان بقاء بيانات عملك وعملائك خاصة ومحمية بالكامل."
          },
          {
            q: "لماذا تحتاج الشركات الناشئة لنظام CRM مثل سيليا؟",
            a: "تحتاج الشركات الناشئة لتتبع كل فرصة (Lead) وأتمتة المهام المتكررة للنمو. توفر سيليا الأدوات اللازمة لإدارة أحجام كبيرة من الاستفسارات بأقل قدر من العمل اليدوي."
          },
          {
            q: "هل يمكنني تخصيص نظام CRM ليناسب قطاع عملي المحدد؟",
            a: "نعم، تم بناء سيليا CRM بمرونة فائقة، مما يسمح للشركات في قطاعات مثل السفر والعقارات والخدمات بتخصيص سير العمل وفقاً لاحتياجاتها الفريدة."
          },
          {
            q: "ما هي مدة تفعيل النظام وهل يحتاج لخبرة تقنية معقدة؟",
            a: "تفعيل سيليا يتم خلال دقائق؛ النظام مصمم بواجهة بديهية لا تتطلب خبرة برمجية. كما نوفر دعماً تقنياً مباشراً لضمان انتقال سلس ومثمر لعملياتك."
          }
        ]
      },
      privacyPolicy: {
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
        cta: "أفهم وأوافق على سياسة الخصوصية والسيادة المعلوماتية"
      }
    },
    en: {
      nav: ["Home", "Vision", "Digital Journey", "Control Center", "Contact Us"],
      hero: {
        title: "Establishing Digital Sovereignty for Your Global Brand",
        subtitle: "CeliaCRM.uk is a premium strategic command center, merging artistic innovation with advanced financial intelligence, meticulously engineered for leaders who define the future.",
        cta1: "Get Started for Free",
        cta2: "Begin Your Global Sovereignty Journey Now",
        cta3: "Our Philosophy",
        eliteBtn: "Global Sovereignty"
      },
      about: {
        title: "About Celia CRM: Where Leadership Meets Strategic Expertise",
        philosophyTitle: "Your Gateway to Growth, Powered by Elite Expertise",
        philosophyDesc: "At Celia CRM, we believe software is an extension of institutional art. We've built an autonomous engine that anticipates and neutralizes operational obstacles before they impact your trajectory.",
        humanTech: "Technology Serving Human Empowerment",
        humanTechDesc: "We bypass technical abstraction to focus on sustainable results. Celia CRM provides a strategic operating system that guarantees your market distinction.",
        values: [
          { label: "C", desc: "Creativity in solutions" },
          { label: "E", desc: "Efficiency in operations" },
          { label: "L", desc: "Leadership in the market" },
          { label: "I", desc: "Insight in every detail" },
          { label: "A", desc: "Advantage in growth" }
        ],
        privacy: {
          title: "Commitment to Information Sovereignty",
          data: "Data Ownership: Your information is a core asset; we protect it with absolute exclusion of external tracking.",
          independence: "Strategic Autonomy: Our self-funded growth ensures every decision is aligned with our clients' long-term interests.",
          transparency: "Absolute Transparency: We operate on a direct model with no hidden clauses; our results are our only testament."
        },
        word: "Executive Message to the Community",
        wordDesc: "We don't just deliver code; we forge strategic alliances. Our mission is to redefine institutional excellence, serving as the technical cornerstone for elite business leaders."
      },
      stats: {
        item1: { val: "40%+", label: "Annual Profit Optimization Rate" },
        item2: { val: "99.9%", label: "Fiscal Governance Precision" },
        item3: { val: "0.5s", label: "Sovereign Processing Velocity" }
      },
      neuralCenter: {
        title: "The Sovereignty Neural Center",
        desc: "A unified strategic ecosystem providing sovereign tools to command every critical aspect of your enterprise with global precision.",
          sections: [
          { 
            id: "control",
            title: "Sovereign Control Ecosystem", 
            desc: "The neural hub of your organization connecting all operations in a unified environment. Absolute permission control, real-time performance monitoring, and seamless integration for total digital sovereignty.",
            icon: "Cpu"
          },
          { 
            id: "magazine",
            title: "Elite 3D Interface", 
            desc: "Dazzle your clients at first sight. Showcase services through a professional interactive 3D magazine. An interface that reflects your brand's luxury and accelerates purchasing decisions by turning sales into an enjoyable visual journey.",
            icon: "Presentation"
          },
          { 
            id: "tracking",
            title: "Journey Hub (Task Management)", 
            desc: "Monitor your business pulse moment to moment. A strategic tracking system accompanies your client from initial inquiry to completion via professional reference files, ensuring effective team guidance and revenue optimization.",
            icon: "ListChecks"
          },
          { 
            id: "finance",
            title: "Smart Fiscal Governance", 
            desc: "Your vault and accounts under absolute control. A comprehensive financial cycle putting revenues and supplier dues in your hands: real-time payment tracking, supplier management, and professional invoicing at one click.",
            icon: "Calculator"
          },
          { 
            id: "care",
            title: "Devotion & Bond Management", 
            desc: "Keep clients in focus effortlessly. Proactive automation cares for clients before, during, and after service: smart alerts, automated loyalty greetings, and follow-up messages for feedback. Make every client feel like your only VIP.",
            icon: "Heart"
          },
          { 
            id: "problems",
            title: "Resolution Strategy Hub", 
            desc: "Turn every crisis into an opportunity for trust. An early detection system for complaints and supplier delays. Track returns and compensations before they affect workflow, ensuring business continuity and unwavering satisfaction.",
            icon: "ShieldAlert"
          },
          { 
            id: "dashboard",
            title: "360° Intelligent Dashboard", 
            desc: "Manage your company from one screen with total confidence. Celia puts the entire company before your eyes via smart dashboards displaying comprehensive analytics for sales, employees, and suppliers to drive bold decisions.",
            icon: "BarChart3"
          },
          { 
            id: "security",
            title: "Absolute Control & Security", 
            desc: "Your company and client data in absolute safety. Celia provides a powerful and flexible permissions system defining exactly what each employee can access, supported by an Audit Trail recording every movement for total transparency.",
            icon: "Lock"
          },
          { 
            id: "experience",
            title: "Intuitive Experience & Bilingual Mastery", 
            desc: "Power without complexity. A sleek and clear UI designed to ease the eyes and complete tasks in one click. Professionally translated with full Arabic and English support, adapting instantly to your work environment.",
            icon: "Globe"
          }
        ]
      },
      transformation: {
        title: "From Operational Chaos to Institutional Sovereignty",
        before: {
          title: "Conventional Operations (Chaos Risks)",
          items: [
            "Critical client erosion due to lack of automated engagement",
            "Supply chain friction and recurring invoice discrepancies",
            "Strategic disconnect from client mandates and expectations",
            "Administrative fatigue from manual accounting overhead",
            "Unresolved disputes and delayed responses eroding brand equity",
            "Decisions predicated on internal intuition rather than empirical data",
            "Security vulnerability for proprietary secrets and trade data",
            "Scattered digital assets and fragmented document storage"
          ],
          labels: ["Customer Automation", "Fiscal Governance", "Rapport & Loyalty", "Financial Accounts", "Crisis Management", "BI Analytics", "Information Security", "Cloud Repositories"]
        },
        after: {
          title: "The CeliaCRM.uk Era (Sovereign Era)",
          items: [
            "Proactive engagement automation that captures high-value opportunities",
            "Rigorous fiscal governance that prevents leaks and ensures liquidity",
            "Deep emotional and institutional rapport with all stakeholders",
            "Bank-grade financial automation providing absolute fiscal agility",
            "Centralized crisis command for rapid resolution and loyalty recovery",
            "Real-time BI analytics that drive your high-level strategy",
            "Military-grade cyber protection for information sovereignty",
            "Encrypted cloud repositories for your brand's intellectual empire"
          ]
        }
      },
      magazine: {
        title: "Digital Magazine: Your Strategic Edge",
        desc: "Bypass conventional presentations with a high-fidelity interactive experience that captivates and secures major mandates."
      },
      forms: {
        enquiry: {
          title: "How May Our Consultants Assist?",
          desc: "Our technical and strategic experts are prepared to address your enterprise vision.",
          name: "Full Name",
          email: "Institutional Email",
          subject: "Enquiry Title",
          message: "Request Details",
          send: "Send Strategic Enquiry",
          success: "Thank you for your elite inquiry. A consultant will respond within a few business hours.",
          error: "Apologies, an error occurred. Please try again or contact us via WhatsApp."
        },
        subscription: {
          title: "Enter the Institutional Elite",
          desc: "Please provide foundational data to initialize your brand's infrastructure on CeliaCRM.uk.",
          name: "Full Name",
          email: "Official Email Address",
          whatsapp: "WhatsApp Connectivity",
          country: "Activity Headquarters",
          employees: "Expected Operational Capacity",
          sector: "Trade Sector",
          subject: "Subscription Intent",
          message: "Additional Notes (Optional)",
          cta: "Submit Institutional Partnership Request",
          legalNote: "By clicking submit, you agree to our [Privacy Policy] and [Sovereignty Terms].",
          success: "Your intent has been successfully recorded. Our strategic team will contact you via official channels to finalize setup.",
          error: "Submission failed. Please check your network and try again."
        }
      },
      footer: {
        rights: "All rights reserved CeliaCRM.uk © 2026",
        motto: "The Strategic Stronghold for Digital Empires."
      },
      comingSoon: "Inaugurating Soon",
      faq: {
        title: "Strategic FAQ: Commanding the Digital Future",
        subtitle: "The Sovereign FAQ",
        items: [
          {
            q: "What makes Celia CRM the first choice for elite organizations globally?",
            a: "Unlike traditional systems, we merge absolute information sovereignty with 3D interfaces that redefine client experience, alongside a financial governance system that prevents leaks in your digital assets."
          },
          {
            q: "What is the added value of the 3D interface for my clients?",
            a: "The 3D interface is a strategic persuasion tool that transforms your services into an immersive interactive magazine, reducing purchase resistance and increasing conversion rates."
          },
          {
            q: "How does the system support major executive decision-making?",
            a: "Through the 360-degree smart dashboard, the system provides predictive analytics to discover opportunities and challenges before they occur, giving you strategic insight for sovereign decisions."
          },
          {
            q: "Can Celia CRM be integrated with the tools my organization currently uses?",
            a: "Yes, the system is designed to be the Neural Hub of your digital empire, providing immediate integration with Google Workspace and global tools via advanced APIs."
          },
          {
            q: "How does 'Celia' ensure data security and strategic privacy?",
            a: "We adopt military-grade encryption protocols and grant you complete independence from external tracking. Your data in Celia is an impenetrable fortress belonging solely to you."
          },
          {
            q: "What is the best ERP for small businesses in 2026?",
            a: "The best ERP should be scalable, affordable, and easy to use. Celia CRM is designed specifically to help small to medium businesses automate their operations without technical complexity."
          },
          {
            q: "How to manage client data safely in a CRM?",
            a: "Data security is a priority. Celia CRM uses advanced encryption and secure server environments (like Dockerized deployments) to ensure your business and client data remain private and protected."
          },
          {
            q: "Why do startups need a CRM like Celia?",
            a: "Startups need to track every lead and automate repetitive tasks to grow. Celia provides the tools to manage high volumes of inquiries with minimal manual work."
          },
          {
            q: "Can I customize a CRM to fit my specific business industry?",
            a: "Yes, Celia CRM is built with flexibility in mind, allowing businesses in sectors like Travel, Real Estate, and Services to customize workflows according to their unique needs."
          },
          {
            q: "How long is the setup process and does it require technical expertise?",
            a: "Celia is activated within minutes. The system is designed with an intuitive interface that doesn't require coding expertise. We also provide direct technical support to ensure a smooth transition for your operations."
          }
        ]
      },
      privacyPolicy: {
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
            desc: "We evolve constantly. If we make material updates to this policy for better protection or legal compliance, we will notify you directly via your dashboard."
          }
        ],
        cta: "I understand and agree to the Privacy & Data Sovereignty Policy"
      }
    }
  }[lang];

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        try {
          window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
          });
        } catch (e) {
          console.warn("window.scrollTo failed:", e);
        }
    }
    setIsMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent, type: 'enquiry' | 'subscription') => {
    e.preventDefault();
    console.log(`Submitting ${type} form...`);
    setFormStatus({ type, status: 'loading' });

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    if (type === 'subscription') {
        Object.assign(data, {
            employees: data.employees || "1-10",
        });
    }

    try {
        const response = await fetch(`/api/${type}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            const result = await response.json().catch(() => ({}));
            setFormStatus({ 
                type, 
                status: 'success',
                message: result.simulated ? 'SIMULATED: Email not sent because SMTP is not configured in .env' : undefined
            });
        } else {
            console.warn("Form submission failed on server", type);
            setFormStatus({ type, status: 'error' });
        }
    } catch (err) {
        console.warn("Form submission network error", err);
        setFormStatus({ type, status: 'error' });
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''} min-h-screen transition-colors duration-500`}>
      <div className={`min-h-screen bg-surface-paper dark:bg-slate-900 text-brand-teal dark:text-slate-100 font-outfit ${isRTL ? 'font-alexandria' : ''}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col justify-center pt-28 pb-32 px-6 bg-brand-teal text-white overflow-hidden">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-brand-gold-bright/5 rounded-full blur-[200px]" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-brand-gold-muted/10 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/tech-luxury/1920/1080?blur=10')] bg-cover bg-center mix-blend-overlay opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-brand-gold-bright text-[11px] uppercase tracking-[0.3em] font-bold mb-10 shadow-xl backdrop-blur-md ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
              <span className="w-2 h-2 rounded-full bg-brand-gold-bright animate-ping" />
              {isRTL ? "معيار النخبة العالمي 2026" : "Global Elite Standard 2026"}
            </div>
            
            <h1 className={`text-2xl md:text-5xl lg:text-6xl font-black leading-[1.15] mb-10 max-w-5xl tracking-tighter text-glow-gold ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
              {t.hero.title}
            </h1>
            
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto leading-relaxed mb-14 font-light text-surface-extra-light">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('subscribe')}
                className="w-full sm:w-auto px-12 py-6 rounded-full bg-brand-gold-bright text-brand-teal font-black text-sm uppercase tracking-wider hover:shadow-[0_0_40px_rgba(221,200,143,0.6)] hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                {t.hero.cta1}
                {isRTL ? <ArrowLeft size={20} /> : <ArrowRight size={20} />}
              </button>
              <button 
                onClick={() => onNavigate('subscribe')}
                className="w-full sm:w-auto px-12 py-6 rounded-full border border-white/20 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-md hover:bg-white/10 transition-all active:scale-95"
              >
                {t.hero.cta2}
              </button>
            </div>

            {/* Elite Stats Floating Grid */}
            <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl px-4">
              {[t.stats.item1, t.stats.item2, t.stats.item3].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.2 }}
                  className="p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 transition-opacity">
                     <div className="w-16 h-16 border-2 border-brand-gold-bright rounded-full" />
                  </div>
                  <div className={`text-4xl lg:text-5xl font-black text-brand-gold-bright mb-2 tracking-tighter truncate ${isRTL ? 'font-cairo' : 'font-outfit'}`}>{stat.val}</div>
                  <div className={`text-[12px] uppercase tracking-[0.2em] opacity-40 font-bold ${isRTL ? 'font-cairo' : 'font-outfit'}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transformation Section - Masterpiece Redesign */}
      <section id="journey" className="py-32 md:py-48 px-6 bg-[#fcfbf9] dark:bg-slate-950 relative overflow-hidden transition-colors">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-brand-gold-bright/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="text-center mb-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-brand-teal/10 dark:border-white/10 text-brand-teal/40 dark:text-slate-500 text-[10px] uppercase font-black tracking-[0.4em] mb-10"
            >
              The Strategic Evolution
            </motion.div>
            <h2 className={`text-4xl md:text-6xl lg:text-7xl font-black text-brand-teal dark:text-brand-gold-bright mb-10 tracking-tighter leading-tight ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
              {t.transformation.title}
            </h2>
            <p className="text-lg md:text-xl text-brand-teal/60 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
              {isRTL 
                ? "نقلب موازين اللعبة الإدارية؛ من العشوائية المكلفة إلى المنظومات السيادية التي لا تقهر."
                : "Rewriting the rules of organizational management; from costly entropy to invincible sovereign ecosystems."}
            </p>
          </div>
          
          <div className="relative max-w-6xl mx-auto space-y-8">
            {/* Background Decorative Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-gold-bright/0 via-brand-gold-bright/20 to-brand-gold-bright/0 hidden md:block -translate-x-1/2 z-0" />

            {t.transformation.before.items.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex flex-col md:flex-row items-stretch gap-0 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl group relative z-10 transition-all duration-500 hover:scale-[1.01]`}
              >
                {/* Chaos State (Left in LTR, Right in RTL) */}
                <div className={`flex-1 p-8 md:p-12 bg-white dark:bg-slate-900 border-y ${isRTL ? 'border-r' : 'border-l'} border-brand-teal/5 flex items-center gap-6 relative md:order-1`}>
                  <div className={`absolute top-0 ${isRTL ? 'right-0' : 'left-0'} p-6 opacity-[0.03] ${isRTL ? 'rotate-12' : '-rotate-12'}`}>
                     <ShieldAlert size={100} />
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-red-50 dark:bg-red-950/30 flex items-center justify-center shrink-0 border border-red-100 dark:border-red-900/20">
                     <X size={24} className="text-red-500" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500/40">{t.transformation.before.labels[i]}</span>
                     <p className="text-sm md:text-base font-medium text-brand-teal/60 dark:text-slate-400 line-through decoration-red-500/20 leading-relaxed">{item}</p>
                  </div>
                </div>

                {/* Transition Bridge (Center) */}
                <div className="w-full md:w-24 bg-brand-gold-bright flex items-center justify-center relative z-20 shadow-xl md:order-2">
                   <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5" />
                   <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-125 transition-transform duration-500">
                     <ArrowRight size={24} className={`text-brand-teal ${isRTL ? 'rotate-180' : ''}`} />
                   </div>
                </div>

                {/* Sovereign State (Right in LTR, Left in RTL) */}
                <div className={`flex-1 p-8 md:p-12 bg-brand-teal text-white border-y ${isRTL ? 'border-l' : 'border-r'} border-brand-gold-bright/10 flex items-center gap-6 relative md:order-3`}>
                  <div className={`absolute bottom-0 ${isRTL ? 'left-0' : 'right-0'} p-6 opacity-5 ${isRTL ? '-rotate-12' : 'rotate-12'}`}>
                     <ShieldCheck size={120} />
                  </div>
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-[1.5rem] bg-brand-gold-bright flex items-center justify-center shrink-0 shadow-[0_0_30px_rgba(230,200,138,0.4)] border border-white/20">
                     <CheckCircle2 size={28} className="text-brand-teal" />
                  </div>
                  <div className="flex flex-col gap-2">
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold-bright/60">{isRTL ? "التحول السيادي" : "Sovereign Transformation"}</span>
                     <p className="text-base md:text-xl font-black text-brand-gold-bright tracking-tight leading-tight group-hover:text-white transition-colors">{t.transformation.after.items[i]}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Neural Center - Professional Features Grid */}
      <section id="control-center" className="py-32 md:py-48 px-6 bg-[#fcfbf9] dark:bg-slate-950 overflow-hidden relative transition-all">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold-bright/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-teal/5 rounded-full blur-[120px]" />
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
           <div className="text-center mb-24 md:mb-32">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 text-brand-teal/60 dark:text-brand-gold-bright/60 text-[10px] font-black uppercase tracking-[0.4em] mb-8"
              >
                <div className="flex gap-1">
                  <span className="w-1 h-1 rounded-full bg-brand-gold-bright animate-pulse" />
                  <span className="w-1 h-1 rounded-full bg-brand-gold-bright animate-pulse delay-75" />
                  <span className="w-1 h-1 rounded-full bg-brand-gold-bright animate-pulse delay-150" />
                </div>
                Celia Elite Control System
              </motion.div>
              <h2 className={`text-4xl md:text-6xl font-black text-brand-teal dark:text-white mb-8 tracking-tighter leading-tight ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
                {t.neuralCenter.title}
              </h2>
              <p className="text-lg md:text-xl text-brand-teal/70 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed font-medium transition-colors">
                {t.neuralCenter.desc}
              </p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {t.neuralCenter.sections.map((section, i) => {
                const icons = { Presentation, ListChecks, Calculator, Heart, ShieldAlert, BarChart3, Lock, Globe };
                const Icon = icons[section.icon as keyof typeof icons] || Server;
                
                return (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-brand-teal/5 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.2)] hover:shadow-[0_40px_80px_rgba(221,200,143,0.15)] transition-all flex flex-col h-full relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold-bright/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-gold-bright/10 transition-colors" />
                    
                    <div className="mb-8 relative flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-brand-teal/5 dark:bg-white/5 text-brand-teal dark:text-brand-gold-bright flex items-center justify-center group-hover:bg-brand-gold-bright group-hover:text-brand-teal transition-all duration-500 shadow-sm group-hover:shadow-[0_0_25px_rgba(230,200,138,0.5)]">
                        <Icon size={28} />
                      </div>
                      <span className="text-[10px] font-black text-brand-gold-bright/40 uppercase tracking-widest group-hover:text-brand-gold-bright transition-colors">0{i + 1}</span>
                    </div>

                    <h3 className={`text-xl md:text-2xl font-black text-brand-teal dark:text-white mb-6 leading-tight group-hover:text-brand-gold-bright transition-colors ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
                      {section.title}
                    </h3>
                    
                    <p className={`text-sm leading-relaxed text-brand-teal/80 dark:text-slate-400 font-medium group-hover:text-brand-teal dark:group-hover:text-slate-200 transition-colors ${isRTL ? 'text-right' : 'text-left'}`}>
                      {section.desc}
                    </p>

                    <div 
                      onClick={() => onNavigate('subscribe')}
                      className="mt-8 pt-6 border-t border-brand-teal/5 dark:border-white/5 flex items-center gap-2 text-brand-teal dark:text-brand-gold-bright opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 cursor-pointer"
                    >
                      <span className="text-[10px] font-black uppercase tracking-widest">{isRTL ? "اطلب عرضاً توضيحيا مخصصاً" : "Request a Custom Demo"}</span>
                      <ArrowRight size={14} className={isRTL ? 'rotate-180' : ''} />
                    </div>
                  </motion.div>
                );
              })}
           </div>
        </div>
      </section>

      {/* Subscription Form Section */}
      <SubscriptionSection 
        isRTL={isRTL}
        t={t}
        formStatus={formStatus}
        setFormStatus={setFormStatus}
        handleFormSubmit={handleFormSubmit}
        onNavigate={onNavigate}
      />

      {/* About Celia CRM - Philosophy & Institutional Vision */}
      <section id="vision" className="py-24 md:py-32 px-6 bg-white dark:bg-slate-900 text-brand-teal dark:text-white relative overflow-hidden transition-all">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
           <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-brand-gold-bright rounded-full blur-[150px] -translate-x-1/2" />
        </div>
        
        <div className="max-w-[1440px] mx-auto relative z-10">
          <div className="mb-12 md:mb-16">
            <div className="text-center mb-10 md:mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-brand-teal/5 border border-brand-teal/10 text-brand-teal/60 dark:text-brand-gold-bright text-[10px] uppercase tracking-widest font-bold mb-4">
                  <Briefcase size={14} />
                  {t.about.title}
                </div>
                <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight text-brand-teal dark:text-white ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
                  {t.about.philosophyTitle}
                </h2>
                <p className="text-lg md:text-xl opacity-70 leading-relaxed font-light max-w-3xl mx-auto">
                  {t.about.philosophyDesc}
                </p>
              </motion.div>

              {/* CELIA Horizontal Values Display */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 lg:gap-6 mt-12" dir="ltr">
                 {t.about.values.map((v, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ y: -5, borderColor: 'rgba(230,200,138,0.4)', backgroundColor: 'rgba(230,200,138,0.05)' }}
                      className="p-6 rounded-[2rem] bg-brand-teal/5 dark:bg-white/5 border border-brand-teal/10 dark:border-white/10 flex flex-col items-center justify-center text-center group transition-all h-full"
                    >
                      <span className="text-5xl lg:text-6xl font-black text-brand-teal dark:text-brand-gold-bright mb-3 group-hover:scale-110 transition-transform">{v.label}</span>
                      <p className="text-[10px] lg:text-xs font-black uppercase tracking-[0.2em] opacity-60 leading-tight text-brand-teal dark:text-white">
                        {v.desc}
                      </p>
                    </motion.div>
                 ))}
              </div>
            </div>

            {/* Combined Vision & Sovereignty Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-[2rem] bg-brand-teal text-white relative overflow-hidden group flex flex-col h-full shadow-xl"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Users size={80} />
                </div>
                <h3 className="text-lg font-bold text-brand-gold-bright mb-4 flex items-center gap-3">
                  <Users size={20} />
                  {t.about.humanTech}
                </h3>
                <p className="text-sm opacity-80 leading-relaxed italic font-medium">
                  {t.about.humanTechDesc}
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-brand-teal/10 dark:border-white/10 hover:border-brand-gold-bright/30 transition-all group flex flex-col h-full shadow-lg"
              >
                <ShieldCheck size={24} className="text-brand-gold-bright mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-black text-brand-teal dark:text-white mb-3">{t.about.privacy.title}</h3>
                <p className="opacity-60 text-xs leading-relaxed font-medium">{t.about.privacy.data}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-brand-teal/10 dark:border-white/10 hover:border-brand-gold-bright/30 transition-all group flex flex-col h-full shadow-lg"
              >
                <Database size={24} className="text-brand-gold-bright mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-black text-brand-teal dark:text-white mb-3">{isRTL ? "استقلالية تامة" : "Total Independence"}</h3>
                <p className="opacity-60 text-xs leading-relaxed font-medium">{t.about.privacy.independence}</p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-[2rem] bg-white dark:bg-slate-800 border border-brand-teal/10 dark:border-white/10 hover:border-brand-gold-bright/30 transition-all group flex flex-col h-full shadow-lg"
              >
                <Globe size={24} className="text-brand-gold-bright mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-black text-brand-teal dark:text-white mb-3">{isRTL ? "شفافية مطلقة" : "Absolute Transparency"}</h3>
                <p className="opacity-60 text-xs leading-relaxed font-medium">{t.about.privacy.transparency}</p>
              </motion.div>
            </div>
          </div>
          
          <div className="mt-16 p-10 md:p-14 rounded-[4rem] bg-brand-teal text-white text-center shadow-elite dark:bg-brand-gold-bright dark:text-brand-teal">
             <h3 className={`text-2xl md:text-3xl font-black mb-6 ${isRTL ? 'font-cairo' : 'font-outfit'}`}>{t.about.word}</h3>
             <p className="text-lg md:text-xl max-w-4xl mx-auto font-medium leading-relaxed">
                {t.about.wordDesc}
             </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-48 px-6 bg-surface-paper dark:bg-slate-900 transition-all border-t border-brand-teal/5 relative z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold-bright/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row gap-16 relative z-10">
          <div className="flex-1">
            <h2 className={`text-3xl md:text-4xl font-black text-brand-teal dark:text-white mb-8 tracking-tighter leading-tight ${isRTL ? 'font-cairo' : 'font-outfit'}`}>{t.forms.enquiry.title}</h2>
            <p className="text-xl text-brand-teal/70 dark:text-slate-400 mb-12 font-medium max-w-lg leading-relaxed">{t.forms.enquiry.desc}</p>
            
            <div className="flex flex-col gap-6">
              <motion.a 
                href="mailto:sales@celiacrm.uk"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-brand-teal dark:text-brand-gold-bright group transition-all"
              >
                <Mail size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-black uppercase tracking-[0.2em] text-xs">Email</span>
              </motion.a>

              <motion.a 
                href="https://wa.me/201120920880?text=Hi%20Celia%20Team%2C%20I%20would%20like%20to%20know%20more%20about%20the%20system%20features."
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-brand-teal dark:text-brand-gold-bright group transition-all"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-[#25D366] group-hover:scale-110 transition-transform">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793 0-.852.448-1.271.607-1.444.159-.174.347-.217.463-.217l.333.003c.111.002.259-.041.405.314l.434 1.042c.059.14.092.305.001.483l-.111.222c-.089.177-.184.281-.3.418-.116.136-.245.286-.104.529.141.243.626 1.033 1.343 1.671.925.823 1.706 1.077 1.95 1.199.243.121.385.101.529-.065.144-.165.621-.723.787-.97.166-.247.332-.207.561-.122l1.642.766c.231.106.382.16.44.258s.053.57-.091.975z" />
                </svg>
                <span className="font-black uppercase tracking-[0.2em] text-xs">WhatsApp</span>
              </motion.a>

              <motion.a 
                href="tel:+201120920880"
                whileHover={{ x: 10 }}
                className="flex items-center gap-4 text-brand-teal dark:text-brand-gold-bright group transition-all"
              >
                <Smartphone size={24} className="group-hover:scale-110 transition-transform" />
                <span className="font-black uppercase tracking-[0.2em] text-xs">Call</span>
              </motion.a>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white dark:bg-slate-800 p-8 md:p-14 rounded-[4rem] border border-brand-teal/5 dark:border-white/5 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)]">
               <form name="enquiry-form" data-netlify="true" onSubmit={(e) => handleFormSubmit(e, 'enquiry')} className="space-y-8">
                <input type="hidden" name="form-name" value="enquiry-form" />
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal/40 dark:text-slate-500 font-bold">{t.forms.enquiry.name}</label>
                    <input name="name" required className="w-full px-8 py-5 bg-surface-paper dark:bg-slate-700/30 dark:text-white rounded-2xl border border-transparent focus:border-brand-gold-bright outline-none transition-all" placeholder="Enter Estate Name" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal/40 dark:text-slate-500 font-bold">{t.forms.enquiry.email}</label>
                    <input name="email" required type="email" className="w-full px-8 py-5 bg-surface-paper dark:bg-slate-700/30 dark:text-white rounded-2xl border border-transparent focus:border-brand-gold-bright outline-none transition-all" placeholder="official@estate.com" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal/40 dark:text-slate-500 font-bold">{t.forms.enquiry.subject}</label>
                    <input name="subject" required className="w-full px-8 py-5 bg-surface-paper dark:bg-slate-700/30 dark:text-white rounded-2xl border border-transparent focus:border-brand-gold-bright outline-none transition-all" placeholder={isRTL ? "موضوع الاستفسار" : "Subject of your vision"} />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-teal/40 dark:text-slate-500 font-bold">{t.forms.enquiry.message}</label>
                    <textarea name="message" required rows={4} className="w-full px-8 py-5 bg-surface-paper dark:bg-slate-700/30 dark:text-white rounded-2xl border border-transparent focus:border-brand-gold-bright outline-none resize-none transition-all" placeholder="How may we serve your enterprise?" />
                  </div>
                  <button 
                    disabled={formStatus.status === 'loading'}
                    className="w-full py-6 bg-brand-teal text-brand-gold-bright font-black text-sm rounded-2xl hover:bg-brand-teal-dark active:scale-[0.98] transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] shadow-xl disabled:opacity-50"
                  >
                    {formStatus.status === 'loading' ? <div className="w-5 h-5 border-2 border-brand-gold-bright/20 border-t-brand-gold-bright rounded-full animate-spin" /> : t.forms.enquiry.send}
                  </button>
                  {formStatus.type === 'enquiry' && formStatus.status === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-2">
                        <p className="text-green-600 font-black text-sm">{t.forms.enquiry.success}</p>
                        {formStatus.message && (
                            <p className="text-[10px] text-orange-500 font-bold bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                                {formStatus.message}
                            </p>
                        )}
                    </motion.div>
                  )}
                  {formStatus.type === 'enquiry' && formStatus.status === 'error' && (
                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center text-red-500 font-black text-sm">{t.forms.enquiry.error}</motion.p>
                  )}
               </form>
            </div>
          </div>
        </div>
      </section>

      {/* Sovereign FAQ Section */}
      <section className="py-24 md:py-32 px-6 bg-white relative overflow-hidden transition-all border-t border-brand-teal/5">
        {/* Blended Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-teal/[0.03] via-white to-brand-teal/[0.05]" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold-bright/[0.03] blur-[150px] rounded-full" />
        </div>

        {/* Schema.org FAQ Data */}
        <div className="hidden pointer-events-none" aria-hidden="true">
          {/* No direct script tags in React body for standard components to avoid insecure operation errors */}
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-lg bg-brand-teal/5 border border-brand-teal/10 text-brand-teal text-[10px] uppercase tracking-[0.4em] font-black mb-6 italic"
            >
              {t.faq.subtitle}
            </motion.div>
            <h2 className={`text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tighter leading-tight text-brand-teal italic ${isRTL ? 'font-cairo' : 'font-outfit'}`}>
              {t.faq.title}
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {t.faq.items.slice(0, 5).map((item: any, i: number) => (
                <FAQItem key={i} item={item} index={i} isRTL={isRTL} />
              ))}
            </div>
            <div className="space-y-6">
              {t.faq.items.slice(5).map((item: any, i: number) => (
                <FAQItem key={i + 5} item={item} index={i + 5} isRTL={isRTL} />
              ))}
              
              {/* Strategic CTA Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="p-10 rounded-[2.5rem] bg-brand-teal text-white border border-brand-gold-bright/20 shadow-2xl relative overflow-hidden group"
              >
                 <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-700">
                    <Shield size={120} />
                 </div>
                 <h3 className="text-2xl font-black mb-4 italic tracking-tight relative z-10">
                    {isRTL ? "هل لديك تطلعات أخرى؟" : "Have Further Aspirations?"}
                 </h3>
                 <p className="text-white/60 text-sm font-medium mb-8 leading-relaxed italic relative z-10">
                    {isRTL ? "مستشارونا النخبة جاهزون لصياغة نموذج عملك الخاص." : "Our elite consultants are ready to tailor your specific business model."}
                 </p>
                 <button 
                  onClick={() => onNavigate('subscribe')}
                  className="px-8 py-3 rounded-full bg-brand-gold-bright text-brand-teal font-black text-[10px] uppercase tracking-widest relative z-10 shadow-lg shadow-brand-gold-bright/10"
                 >
                    {isRTL ? "ابدأ الآن مجاناً" : "GET STARTED FOR FREE"}
                 </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  </div>
  );
}
