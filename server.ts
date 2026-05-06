import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Professional Debug Mode Check
const IS_DEBUG = process.env.DEBUG === "true";

// Helper to mask sensitive strings for logging
const maskSecret = (val: string | undefined) => {
    if (!val) return "NOT_SET";
    if (val.length < 8) return "********";
    return val.substring(0, 4) + "..." + val.substring(val.length - 4);
};

// Debug Environment Report
if (IS_DEBUG) {
    console.log("\x1b[36m%s\x1b[0m", "--- SYSTEM DEBUG: ENVIRONMENT INJECTION REPORT ---");
    console.table({
        NODE_ENV: process.env.NODE_ENV || "development",
        PORT: process.env.PORT || "3000",
        SMTP_HOST: process.env.SMTP_HOST || "NOT_SET",
        SMTP_USER: process.env.SMTP_USER || "NOT_SET",
        SMTP_PASS: maskSecret(process.env.SMTP_PASS),
        DATABASE_URL: maskSecret(process.env.DATABASE_URL), // Monitoring DB connection strings if present
        VITE_API_URL: process.env.VITE_API_URL || "AUTO",
    });
    console.log("\x1b[36m%s\x1b[0m", "--------------------------------------------------");
}

// Email Transporter (Lazy loaded)
let transporter: any = null;

const getTransporter = () => {
    if (!transporter && process.env.SMTP_HOST) {
        transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_PORT === "465",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return transporter;
};

async function sendEmail(to: string, subject: string, html: string, replyTo?: string) {
    const client = getTransporter();
    if (!client) {
        console.log("-----------------------------------------");
        console.log("SMTP NOT CONFIGURED - SIMULATING SEND");
        console.log(`To: ${to}`);
        console.log(`Reply-To: ${replyTo || 'N/A'}`);
        console.log(`Subject: ${subject}`);
        console.log("-----------------------------------------");
        return { success: true, simulated: true }; 
    }

    try {
        const fromEmail = process.env.SMTP_FROM || process.env.SMTP_USER || "info@celiacrm.uk";
        const uniqueSubject = `${subject} (ID: ${Math.random().toString(36).substring(7).toUpperCase()})`;
        
        console.log(`[SMTP] Delivery Attempt: To=${to}, Subject=${uniqueSubject}`);
        
        // Use BCC to info@celiacrm.uk ONLY for Sales emails as a hidden safety net
        const bcc = to.toLowerCase().includes("sales") ? "info@celiacrm.uk" : undefined;

        const info = await client.sendMail({
            from: `"Celia CRM" <${fromEmail}>`,
            to: to,
            bcc: bcc,
            replyTo: replyTo,
            subject: uniqueSubject,
            html: html,
        });

        console.log(`[SMTP] SUCCESS: MessageId=${info.messageId}`);
        return { success: true, simulated: false };
    } catch (err: any) {
        console.error(`[SMTP] FAILED: ${err.message}`);
        return { success: false, simulated: false };
    }
}

// Rate Limiter for API calls
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per windowMs
	standardHeaders: 'draft-7', 
	legacyHeaders: false,
});

async function startServer() {
  const app = express();
  
  // Trust proxy for express-rate-limit (Cloud Run/Nginx)
  app.set('trust proxy', 1);
  
  // Security Headers
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "https://picsum.photos", "https://images.unsplash.com", "https://*.googleusercontent.com", "https://iili.io", "https://*.iili.io"],
        "media-src": ["'self'", "https://assets.mixkit.co", "https://mixkit.co", "https://*.google.com"],
        "script-src": ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        "connect-src": ["'self'", "https://*.run.app", "https://*.google-analytics.com"],
        "frame-ancestors": ["'self'", "https://*.google.com", "https://*.run.app", "https://*.aistudio.google.com"], // Allow preview in Google Cloud & AI Studio environment
      },
    },
    frameguard: false, // Disables X-Frame-Options: SAMEORIGIN
    crossOriginEmbedderPolicy: false,
    referrerPolicy: { policy: "no-referrer-when-downgrade" },
  }));

  // HTTPS Redirect (Cloud Run standard) - Disabled for localhost to prevent issues
  app.use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && 
        req.headers["x-forwarded-proto"] !== "https" && 
        !req.headers.host?.includes("localhost")) {
      return res.redirect(301, `https://${req.headers.host}${req.url}`);
    }
    next();
  });

  app.use(express.json());
  
  // CORS for local development if needed (though we use proxy)
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") return res.sendStatus(200);
    next();
  });
  
  // Professional Request Debugger
  if (IS_DEBUG) {
    app.use((req, res, next) => {
      const start = Date.now();
      res.on('finish', () => {
        const duration = Date.now() - start;
        const color = res.statusCode >= 400 ? "\x1b[31m" : "\x1b[32m";
        const isSensitive = req.path.includes('api') || req.path.includes('admin') || req.path.includes('upload');
        console.log(
          `${color}%s\x1b[0m %s %s - %sms %s`,
          res.statusCode,
          req.method,
          req.path,
          duration,
          isSensitive ? "\x1b[35m[SENSITIVE_PATH]\x1b[0m" : ""
        );
      });
      next();
    });
  }

  app.use("/api/", apiLimiter);
  
  // Health check for platform
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  const PORT = Number(process.env.PORT) || 3000;

  // Mock data for the magazine
  const MAGAZINES = {
    "luxury-travel-2026": {
      id: "luxury-travel-2026",
      clientName: "John Doe",
      title: "Royal Maldivian Escape",
      welcomePhoto: "https://picsum.photos/seed/maldives/1200/800",
      description: "A bespoke itinerary for your upcoming voyage to the azure waters of the Maldives.",
      language: "en",
      direction: "ltr",
      pages: [
        {
          id: 1,
          type: "cover",
          title: "The Ultimate Escape",
          subtitle: "Brought to you by Celia CRM",
          image: "https://picsum.photos/seed/cover/1200/1800",
        },
        {
          id: 2,
          type: "welcome",
          title: "Welcome aboard, John",
          content: "We've curated every detail to ensure your journey is as seamless as it is breathtaking.",
          image: "https://picsum.photos/seed/welcome/800/1200",
        },
        {
          id: 3,
          type: "content",
          title: "Oceanfront Villa",
          content: "Experience tranquility in our signature overwater bungalows with private infinity pools.",
          image: "https://picsum.photos/seed/villa/800/1200",
          price: "$2,400 / night",
        },
        {
          id: 4,
          type: "video",
          title: "Virtual Tour",
          videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-azure-water-of-the-ocean-11754-large.mp4",
        },
        {
          id: 5,
          type: "cta",
          title: "Ready to confirm?",
          content: "Your dream holiday is just one click away. Approve your itinerary or chat with us.",
          actions: [
            { label: "Approve Itinerary", type: "primary" },
            { label: "WhatsApp Specialist", type: "secondary" },
          ],
        },
      ],
    },
    "luxury-offer-ar": {
      id: "luxury-offer-ar",
      clientName: "أحمد محمد",
      title: "عرض الفخامة المطلقة",
      welcomePhoto: "https://picsum.photos/seed/dubai/1200/800",
      description: "عرض حصري مقدم لك من سيليا للعقارات الفاخرة.",
      language: "ar",
      direction: "rtl",
      pages: [
        {
          id: 1,
          type: "cover",
          title: "عالم من الفخامة",
          subtitle: "مقدم لك من سيليا لإدارة العلاقات",
          image: "https://picsum.photos/seed/luxury-ar/1200/1800",
        },
        {
          id: 2,
          type: "content",
          title: "فيلا النخلة",
          content: "استمتع بأفضل إطلالة في دبي مع فيلا مصممة خصيصاً لذوقك الرفيع.",
          image: "https://picsum.photos/seed/palm/800/1200",
          price: "15,000,000 درهم",
        },
        {
          id: 3,
          type: "cta",
          title: "هل أنت مستعد؟",
          content: "مستشارنا العقاري بانتظار تواصلك لمناقشة التفاصيل.",
          actions: [
            { label: "الموافقة على العرض", type: "primary" },
            { label: "تواصل عبر واتساب", type: "secondary" },
          ],
        },
      ],
    },
    "celia-features": {
      id: "celia-features",
      clientName: "Elite Partner",
      title: "Celia CRM 2026 Capabilities",
      welcomePhoto: "https://picsum.photos/seed/tech/1200/800",
      description: "A deep dive into the intelligent management features of Celia CRM.",
      language: "ar",
      direction: "rtl",
      pages: [
        {
          id: 1,
          type: "cover",
          title: "سيليا الذكية",
          subtitle: "الإدارة المتكاملة لمستقبل أعمالك",
          image: "https://picsum.photos/seed/crm/1200/1800",
        },
        {
          id: 2,
          type: "content",
          title: "إدارة الشكاوى الاحترافية",
          content: "قسم متابعة محترف للشكاوى والمشاكل (عملاء وموردين).. مربوط بذكاء مع الحسابات والفواتير لضمان الحلول السريعة.",
          image: "https://picsum.photos/seed/complaint/800/1200",
        },
        {
          id: 3,
          type: "content",
          title: "العناية الفائقة بالعميل",
          content: "نظام تذكير بأعياد ميلاد العملاء لتهنئتهم وتوفير عروض حصرية لهم.. لأننا نهتم بأدق التفاصيل.",
          image: "https://picsum.photos/seed/gift2/800/1200",
        },
        {
          id: 4,
          type: "content",
          title: "تقارير وصلاحيات",
          content: "تقارير مبيعات وحسابات مفصلة مع تحكم كامل في صلاحيات المستخدمين لضمان أمن وسلاسة العمل.",
          image: "https://picsum.photos/seed/reports/800/1200",
        },
        {
          id: 5,
          type: "cta",
          title: "ابدأ رحلة النجاح",
          content: "انضم الآن إلى قائمة عملائنا المميزين واستمتع بكل هذه الميزات.",
          actions: [
            { label: "اشترك الآن", type: "primary" },
            { label: "تحدث مع خبير", type: "secondary" },
          ],
        },
      ],
    },
  };

  // API Routes
  app.get("/api/magazine/:id", (req, res) => {
    const id = req.params.id;
    const magazine = MAGAZINES[id as keyof typeof MAGAZINES];
    if (magazine) {
      res.json(magazine);
    } else {
      res.json(MAGAZINES["luxury-travel-2026"]);
    }
  });

  // Asset for elite auto-responder
  const getAutoResponderHtml = (name: string) => `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #002b33; color: #ffffff; padding: 60px 20px; text-align: center;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #002b33; border: 1px solid #ddc88f;">
            <div style="padding: 40px;">
                <h1 style="color: #ddc88f; font-size: 24px; letter-spacing: 4px; text-transform: uppercase; margin-bottom: 10px; font-weight: 300;">Request Confirmed</h1>
                <div style="height: 1px; background: linear-gradient(to right, transparent, #ddc88f, transparent); width: 60%; margin: 15px auto 30px auto;"></div>
                
                <p style="font-size: 16px; line-height: 1.8; color: #ffffff; margin-bottom: 20px; text-align: left;">
                    Dear ${name},
                </p>
                
                <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 25px; text-align: left;">
                    Thank you for your interest in <strong>CeliaCRM.uk</strong>.
                </p>
                
                <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 25px; text-align: left;">
                    This email is to confirm that we have successfully received your integration request. Our team is currently reviewing your details to ensure we provide the best setup tailored to your business needs.
                </p>
                
                <p style="font-size: 16px; line-height: 1.8; color: rgba(255,255,255,0.8); margin-bottom: 30px; text-align: left;">
                    You can expect to hear back from one of our specialists via your preferred channel very soon.
                </p>
                
                <div style="background: rgba(221, 200, 143, 0.1); padding: 25px; border-radius: 4px; border: 1px solid rgba(221, 200, 143, 0.2); margin-bottom: 30px;">
                    <p style="font-size: 12px; text-transform: uppercase; color: #ddc88f; margin: 0; letter-spacing: 2px;">ESTIMATED RESPONSE WINDOW</p>
                    <p style="font-size: 20px; margin: 10px 0 0 0; color: #ffffff; font-weight: bold;">&lt; 24 Hours</p>
                </div>
                
                <p style="font-size: 15px; line-height: 1.6; color: rgba(255,255,255,0.6); font-style: italic; margin-top: 40px;">
                    "Empowering your business with smart solutions."
                </p>
            </div>
            
            <div style="background-color: #001f24; padding: 20px; font-size: 12px; color: #ddc88f; border-top: 1px solid rgba(221, 200, 143, 0.2); letter-spacing: 2px; text-transform: uppercase;">
                CELIACRM.UK TEAM
            </div>
        </div>
    </div>
  `;

  // Form Submissions
  app.post("/api/enquiry", async (req, res) => {
      try {
          console.log("New Enquiry received:", req.body);
          const { name, email, subject, message } = req.body;
          const html = `
            <div style="font-family: 'Georgia', serif; padding: 40px; background-color: #f5f2ed; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #e5e0d8;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #004854;">Celia CRM</h1>
                    <div style="height: 1px; background: #004854; width: 50px; margin: 10px auto;"></div>
                    <p style="font-style: italic; font-size: 14px; color: #666;">General Enquiry Received</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <h2 style="font-size: 18px; margin-top: 0; color: #004854; border-bottom: 1px solid #f0efeb; padding-bottom: 10px;">Contact Details</h2>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>
                </div>

                <div style="margin-top: 30px; font-style: italic; color: #444; border-left: 3px solid #004854; padding-left: 20px;">
                    <p style="font-weight: bold; font-style: normal; font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 5px;">Inquiry Message</p>
                    "${message}"
                </div>

                <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #999; letter-spacing: 1px; text-transform: uppercase; border-top: 1px solid #e5e0d8; padding-top: 20px;">
                    Celia CRM • Bespoke Response System
                </div>
            </div>
          `;
          
          // Send to Admin
          const result = await sendEmail("info@celiacrm.uk", `Celia CRM Enquiry [${name}]`, html, email);
          
          // Send Auto-Responder to Client
          if (email) {
              await sendEmail(email, "Request Confirmed | CeliaCRM.uk", getAutoResponderHtml(name));
          }

          if (result.success) {
            res.json({ success: true, simulated: result.simulated });
          } else {
            res.status(500).json({ error: "Failed to send enquiry email" });
          }
      } catch (error: any) {
          console.error("Enquiry API Error:", error);
          res.status(500).json({ error: error.message || "Internal Server Error" });
      }
  });

  app.post("/api/subscription", async (req, res) => {
      try {
          console.log("New Subscription received:", req.body);
          const { name, whatsapp, email, country, plan, sector, price, frequency, employees, subject, message } = req.body;
          
          const html = `
            <div style="font-family: 'Georgia', serif; padding: 40px; background-color: #f5f2ed; color: #1a1a1a; max-width: 600px; margin: auto; border: 1px solid #e5e0d8;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="font-size: 24px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 5px; color: #004854;">Celia CRM</h1>
                    <div style="height: 1px; background: #004854; width: 50px; margin: 10px auto;"></div>
                    <p style="font-style: italic; font-size: 14px; color: #666;">New Luxury Subscription Request</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 4px; box-shadow: 0 4px 15px rgba(0,0,0,0.05);">
                    <h2 style="font-size: 18px; margin-top: 0; color: #004854; border-bottom: 1px solid #f0efeb; padding-bottom: 10px;">Client Profile</h2>
                    <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0;"><strong>WhatsApp:</strong> <a href="https://wa.me/${(whatsapp || '').toString().replace(/\D/g,'')}" style="color: #004854; text-decoration: none;">${whatsapp || 'N/A'}</a></p>
                    <p style="margin: 10px 0;"><strong>Email:</strong> ${email || 'Direct Inquiry'}</p>
                    <p style="margin: 10px 0;"><strong>Region:</strong> ${country || 'N/A'}</p>
                    <p style="margin: 10px 0;"><strong>Sector:</strong> ${sector}</p>
                </div>

                <div style="margin-top: 30px; padding: 25px; background: #004854; color: white; border-radius: 4px;">
                    <h3 style="margin-top: 0; border-bottom: 1px solid rgba(255,255,255,0.2); padding-bottom: 10px; font-weight: normal;">Selected Plan</h3>
                    <p style="font-size: 20px; margin: 15px 0;"><strong>${plan}</strong></p>
                    <p style="margin: 5px 0; opacity: 0.8;">Capacity: ${employees} Employees</p>
                    <p style="margin: 5px 0; opacity: 0.8;">Billing: ${frequency === 'yearly' ? 'Annual (Tier 1)' : 'Monthly'}</p>
                    <p style="font-size: 22px; margin-top: 20px; color: #ddc88f;">Investment: ${price}</p>
                </div>

                ${message ? `
                <div style="margin-top: 30px; font-style: italic; color: #444; border-left: 3px solid #ddc88f; padding-left: 20px;">
                    <p style="font-weight: bold; font-style: normal; font-size: 12px; text-transform: uppercase; color: #999; margin-bottom: 5px;">Client Message</p>
                    "${message}"
                </div>
                ` : ''}

                <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #999; letter-spacing: 1px; text-transform: uppercase; border-top: 1px solid #e5e0d8; padding-top: 20px;">
                    Confidential & Proprietary • Celia CRM Luxury Management
                </div>
            </div>
          `;
          
          const emailSubject = `Celia CRM Subscription [${name}]`;
          
          // Final routing: Subscriptions go ONLY to Sales@celiacrm.uk
          const result = await sendEmail("Sales@celiacrm.uk", emailSubject, html, email);
          
          // Send Auto-Responder to Client
          if (email) {
              await sendEmail(email, "Request Confirmed | CeliaCRM.uk", getAutoResponderHtml(name));
          }
          
          if (result.success) {
            console.log(`[SUBSCRIPTION] Success for ${name} To: Sales@celiacrm.uk`);
            res.json({ success: true, simulated: result.simulated });
          } else {
            console.error(`[SUBSCRIPTION] Failed for ${name}`);
            res.status(500).json({ error: "Failed to send email" });
          }
      } catch (error: any) {
          console.error("Subscription API Error Details:", error);
          res.status(500).json({ error: error.message || "Internal Server Error" });
      }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const hmrPort = 24678 + (PORT - 3000);
    const vite = await createViteServer({
      server: { 
        middlewareMode: true,
        hmr: {
          port: hmrPort
        }
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server strictly running on port ${PORT}`);
  });
}

startServer();
