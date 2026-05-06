import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Play, 
  Pause, 
  MessageCircle, 
  CheckCircle2, 
  Moon, 
  Sun,
  Globe,
  Share2,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { MagazineData, PageData } from "./types";

import LandingPage from "./LandingPage";
const ElitePage = lazy(() => import("./ElitePage"));
const ResourceHub = lazy(() => import("./ResourceHub"));
const PrivacyPage = lazy(() => import("./PrivacyPage"));
const TermsPage = lazy(() => import("./TermsPage"));
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  const [view, setView] = useState<'landing' | 'magazine' | 'elite' | 'hub' | 'privacy' | 'terms'>('landing');
  const [magazine, setMagazine] = useState<MagazineData | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [lang, setLang] = useState<'en' | 'ar'>('en');

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === "/elite") {
        setView('elite');
      } else if (path === "/hub") {
        setView('hub');
      } else if (path === "/privacy") {
        setView('privacy');
      } else if (path === "/terms") {
        setView('terms');
      } else if (path.includes("/view/")) {
        const id = path.split("/").pop() || "luxury-travel-2026";
        handleViewMagazine(id);
      } else {
        setView('landing');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    try {
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn("ClassList modification failed:", e);
    }
  }, [darkMode]);

  useEffect(() => {
    // Check path for magazine, elite, or hub view safely
    try {
      const path = window.location.pathname;
      if (path === "/elite") {
        setView('elite');
        setIsLoading(false);
      } else if (path === "/hub") {
        setView('hub');
        setIsLoading(false);
      } else if (path === "/privacy") {
        setView('privacy');
        setIsLoading(false);
      } else if (path === "/terms") {
        setView('terms');
        setIsLoading(false);
      } else if (path.includes("/view/") || path.split("/").length > 2) {
        const id = path.split("/").pop() || "luxury-travel-2026";
        fetch(`/api/magazine/${id}`)
          .then((res) => res.json())
          .then((data) => {
            setMagazine(data);
            setDirection(data.direction);
            setLang(data.language);
            setView('magazine');
            setTimeout(() => setIsLoading(false), 2000);
          })
          .catch(() => {
              setView('landing');
              setIsLoading(false);
          });
      } else {
        setView('landing');
        setTimeout(() => {
          setIsLoading(false);
          // Handle initial hash if on landing page
          if (window.location.hash) {
            const hashId = window.location.hash.replace('#', '');
            if (hashId) {
              const el = document.getElementById(hashId);
              if (el) {
                const offset = 80;
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = el.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;
                window.scrollTo({ top: offsetPosition, behavior: 'auto' });
              }
            }
          }
        }, 100);
      }
    } catch (e) {
      console.warn("Initial path check failed:", e);
      setView('landing');
      setIsLoading(false);
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const nextPage = () => {
    if (magazine && currentPage < magazine.pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleLangChange = (newLang: 'en' | 'ar') => {
    setLang(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
  };

  const pushState = (state: any, title: string, url: string) => {
    try {
      if (window.location.pathname !== url) {
        window.history.pushState(state, title, url);
      }
    } catch (e) {
      console.warn("History pushState failed (likely insecure operation in this environment):", e);
    }
  };

  const handleViewMagazine = (id: string) => {
    setIsLoading(true);
    fetch(`/api/magazine/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMagazine(data);
        setDirection(data.direction);
        setLang(data.language);
        setView('magazine');
        pushState({}, '', `/view/${id}`);
        setTimeout(() => setIsLoading(false), 1000);
      })
      .catch(() => setIsLoading(false));
  };

  const scrollToTop = () => {
    try {
      window.scrollTo(0, 0);
    } catch (e) {
      console.warn("window.scrollTo failed:", e);
    }
  };

  const handleGoToElite = () => {
    setView('elite');
    pushState({}, '', '/elite');
    scrollToTop();
  };

  const handleGoToHub = () => {
    setView('hub');
    pushState({}, '', '/hub');
    scrollToTop();
  };

  const handleBackToLanding = () => {
    setView('landing');
    pushState({}, '', '/');
    scrollToTop();
  };

  const handleNavigate = (id: string) => {
    if (id === 'privacy') {
      setView('privacy');
      pushState({}, '', '/privacy');
      scrollToTop();
      return;
    }

    if (id === 'terms') {
      setView('terms');
      pushState({}, '', '/terms');
      scrollToTop();
      return;
    }

    if (id === 'home' && view === 'landing') {
      pushState({}, '', '/#home');
      scrollToTop();
      return;
    }

    if (view !== 'landing') {
      setView('landing');
      pushState({}, '', `/#${id}`);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = el.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'auto' });
        } else if (id === 'home') {
          scrollToTop();
        }
      }, 100);
    } else {
      const el = document.getElementById(id);
      pushState({}, '', `/#${id}`);
      if (el) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'auto' });
      } else if (id === 'home') {
        scrollToTop();
      }
    }
  };

  if (isLoading) return <LoadingScreen />;

  const isRTL = direction === 'rtl';

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? "bg-white text-brand-teal" : "bg-white text-brand-teal"}`} dir={direction}>
      {/* Global Header */}
      <Header 
        lang={lang} 
        onLanguageChange={handleLangChange} 
        onNavigate={handleNavigate} 
        onGoToElite={handleGoToElite}
        currentView={view}
      />

      <main className="pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {view === 'landing' && (
              <LandingPage 
                lang={lang} 
                onViewMagazine={handleViewMagazine} 
                onGoToElite={handleGoToElite}
                onGoToHub={handleGoToHub}
                onNavigate={handleNavigate}
                darkMode={darkMode} 
              />
            )}
            <Suspense fallback={<LoadingScreen />}>
              {view === 'elite' && (
                <ElitePage 
                  lang={lang} 
                  darkMode={darkMode} 
                  onBack={handleBackToLanding}
                />
              )}
              {view === 'hub' && (
                <ResourceHub 
                  lang={lang} 
                  onBack={handleBackToLanding}
                  onNavigate={handleNavigate}
                />
              )}
              {view === 'privacy' && (
                <PrivacyPage 
                  lang={lang} 
                  onBack={handleBackToLanding}
                />
              )}
              {view === 'terms' && (
                <TermsPage 
                  lang={lang} 
                  onBack={handleBackToLanding}
                />
              )}
            </Suspense>
            {view === 'magazine' && magazine && (
              <div className="relative">
                {/* Progress Bar for Magazine */}
                <div className="fixed top-0 left-0 right-0 z-[110] h-1 flex">
                  {magazine.pages.map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 h-full transition-all duration-500 ${idx <= currentPage ? "bg-brand-gold-bright" : "bg-stone-200 dark:bg-stone-800"}`}
                    />
                  ))}
                </div>
                
                <div className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4 sm:p-12 overflow-hidden bg-brand-teal text-white">
                  <div className="magazine-container relative w-full max-w-lg aspect-[3/4.2] sm:aspect-[3/3.8] shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                    <AnimatePresence mode="popLayout" custom={currentPage}>
                      <motion.div
                        key={currentPage}
                        custom={currentPage}
                        variants={isRTL ? rtlFlipVariants : ltrFlipVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        <PageContent page={magazine.pages[currentPage]} isRTL={isRTL} isDarkMode={darkMode} />
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation Controls */}
                    <div className="absolute inset-y-0 -left-6 -right-6 flex items-center justify-between pointer-events-none px-4 z-40">
                      <button 
                        onClick={isRTL ? nextPage : prevPage}
                        disabled={isRTL ? currentPage === magazine.pages.length - 1 : currentPage === 0}
                        className={`pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/20 disabled:opacity-0 disabled:scale-90`}
                      >
                        {isRTL ? <ChevronRight /> : <ChevronLeft />}
                      </button>
                      <button 
                        onClick={isRTL ? prevPage : nextPage}
                        disabled={isRTL ? currentPage === 0 : currentPage === magazine.pages.length - 1}
                        className={`pointer-events-auto p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-white/20 disabled:opacity-0 disabled:scale-90`}
                      >
                        {isRTL ? <ChevronLeft /> : <ChevronRight />}
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-medium opacity-50 mb-1">
                      {isRTL ? "صفحة " : "PAGE "} {currentPage + 1} / {magazine.pages.length}
                    </p>
                    <h2 className="font-tajawal text-lg font-light tracking-wide">{magazine.title}</h2>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer 
        lang={lang} 
        onNavigate={handleNavigate} 
        onGoToHub={handleGoToHub} 
        onGoToElite={handleGoToElite} 
      />
    </div>
  );
}

function PageContent({ page, isRTL, isDarkMode }: { page: PageData; isRTL: boolean; isDarkMode: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (page.type === 'video' && videoRef.current) {
        videoRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  }, [page.type]);

  const renderContent = () => {
    switch (page.type) {
      case "cover":
        return (
          <div className="relative w-full h-full bg-brand-teal overflow-hidden flex flex-col justify-end p-8 text-white">
            <img 
              src={page.image} 
              alt={page.title} 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-60 transition-transform duration-[10s] hover:scale-110" 
              referrerPolicy="no-referrer"
            />
            <motion.div 
              initial={{ y: 20, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="relative z-10 p-4 border border-brand-gold-muted/30"
            >
              <h1 className="text-4xl sm:text-6xl font-serif italic leading-tight mb-4 text-brand-gold-bright">
                {page.title}
              </h1>
              <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/70">
                {page.subtitle}
              </p>
            </motion.div>
          </div>
        );
      case "welcome":
        return (
          <div className="w-full h-full bg-neutral-light flex flex-col p-10 text-brand-teal">
            <div className="category-label text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-muted mb-6">Introduction</div>
            <div className="flex-1 overflow-hidden shadow-xl mb-10 relative">
                <img 
                  src={page.image} 
                  alt={`${page.title} - Strategic Welcome Interface`} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-teal/40 to-transparent" />
            </div>
            <motion.div
                 initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: 0.4 }}
            >
              <h2 className="text-3xl font-serif italic mb-6 text-brand-teal">{page.title}</h2>
              <p className="text-sm leading-relaxed text-black/60">{page.content}</p>
            </motion.div>
          </div>
        );
      case "content":
        return (
          <div className="w-full h-full bg-neutral-light flex flex-col p-0 text-brand-teal">
             <div className="h-1/2 overflow-hidden relative">
                <img src={page.image} alt={page.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                {page.price && (
                    <div className="absolute bottom-6 left-6 right-6 bg-brand-teal/80 backdrop-blur-md p-4 flex justify-between items-center text-white">
                        <span className="text-[10px] uppercase font-bold tracking-widest">{isRTL ? "الاستثمار" : "INVESTMENT"}</span>
                        <span className="font-serif italic text-lg">{page.price}</span>
                    </div>
                )}
             </div>
             <div className="flex-1 p-10 flex flex-col justify-center">
                <div className="category-label text-[10px] uppercase tracking-[0.2em] font-bold text-brand-gold-muted mb-4 italic">Exclusive Offer</div>
                <h2 className="text-4xl font-serif mb-6 text-brand-teal">
                    {page.title}
                </h2>
                <p className="text-sm leading-relaxed text-black/60 mb-8">{page.content}</p>
                <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-6">
                    <div>
                        <div className="text-[9px] uppercase font-bold text-black/40 mb-1">{isRTL ? "الموقع" : "LOCATION"}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider">Malé Atoll, MV</div>
                    </div>
                    <div>
                        <div className="text-[9px] uppercase font-bold text-black/40 mb-1">{isRTL ? "المدة" : "DURATION"}</div>
                        <div className="text-xs font-semibold uppercase tracking-wider">7 Days / 6 Nights</div>
                    </div>
                </div>
             </div>
          </div>
        );
      case "video":
        return (
          <div className="w-full h-full bg-black flex flex-col items-center justify-center relative overflow-hidden">
            <video 
              ref={videoRef}
              src={page.videoUrl} 
              className="w-full h-full object-cover opacity-80"
              muted
              loop
              playsInline
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-black/30 text-white">
                 <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-16 h-16 rounded-full border border-white/50 flex items-center justify-center mb-6"
                 >
                    <Play fill="white" />
                 </motion.div>
                <h2 className="text-2xl font-bold uppercase tracking-widest mb-4">{page.title}</h2>
                <p className="text-xs opacity-60 max-w-xs">{isRTL ? "استمتع بمشاهدة تجريبية لما ينتظرك" : "A cinematic preview of what awaits you."}</p>
            </div>
          </div>
        );
      case "cta":
        return (
          <div className="w-full h-full bg-neutral-light flex flex-col p-12 items-center justify-center text-center text-brand-teal">
            <h2 className="text-4xl font-serif italic mb-6 leading-tight">{page.title}</h2>
            <p className="text-sm text-black/60 mb-12 max-w-sm leading-relaxed">{page.content}</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                {page.actions?.map((action, i) => (
                    <button 
                      key={i}
                      className={`flex-1 py-4 px-8 font-bold text-[11px] uppercase tracking-[0.1em] transition-all hover:brightness-110 active:scale-95 ${
                        action.type === 'primary' 
                        ? 'bg-brand-teal text-white' 
                        : 'bg-transparent text-brand-teal border border-brand-teal'
                      }`}
                    >
                        {action.label}
                    </button>
                ))}
            </div>
            <p className="mt-12 text-[9px] text-black/30 uppercase tracking-[0.3em] font-bold">Celia / Luxury Portfolio</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`w-full h-full overflow-hidden border border-black/5 shadow-inner relative`}>
      <div className="spine-shadow" />
      {renderContent()}
    </div>
  );
}

function LoadingScreen() {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-neutral-light">
            <div className="w-48 h-12 relative overflow-hidden rounded-full bg-surface-extra-light mb-4">
                <div className="shimmer absolute inset-0" />
            </div>
            <p className="text-[10px] uppercase tracking-[0.4em] text-brand-teal font-bold animate-pulse">CeliaCRM.uk</p>
        </div>
    );
}

// Framer Motion Variants for 3D Flip Effect
const ltrFlipVariants = {
  initial: (page: number) => ({
    rotateY: 90,
    opacity: 0,
    x: 100,
    transformOrigin: "left",
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    x: -100,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};

const rtlFlipVariants = {
  initial: (page: number) => ({
    rotateY: -90,
    opacity: 0,
    x: -100,
    transformOrigin: "right",
  }),
  animate: {
    rotateY: 0,
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.32, 0.72, 0, 1],
    },
  },
  exit: {
    rotateY: 90,
    opacity: 0,
    x: 100,
    transition: {
      duration: 0.6,
      ease: [0.32, 0.72, 0, 1],
    },
  },
};
