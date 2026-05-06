const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers };

    try {
        // استخراج النوع من المسار (لحالات /api/subscription) أو من الجسم
        const pathParts = event.path.split('/');
        const typeFromPath = pathParts[pathParts.length - 1]; 
        
        const data = JSON.parse(event.body);
        const type = data.type || typeFromPath; // التأكد من نوع الفورم
        const { name, email, subject, message } = data;

        if (!email || !name) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
        }

        // إعداد المستلم بناءً على النوع
        const isSubscription = type === 'subscription';
        const recipient = isSubscription ? "Sales@celiacrm.uk" : "info@celiacrm.uk";
        const emailSubject = `Celia CRM ${isSubscription ? 'Subscription' : 'Enquiry'} [${name}]`;

        // تجميع البيانات الإضافية لفورم الاشتراك
        const extraInfo = isSubscription ? `
            <p><strong>WhatsApp:</strong> ${data.whatsapp || 'N/A'}</p>
            <p><strong>Country:</strong> ${data.country || 'N/A'}</p>
            <p><strong>Team Size:</strong> ${data.employees || 'N/A'}</p>
            <p><strong>Sector:</strong> ${data.sector || 'N/A'}</p>
            <p><strong>Plan:</strong> ${data.plan || 'Elite'}</p>
        ` : '';

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // 1. إرسال الإشعار لك (Admin Notification)
        await transporter.sendMail({
            from: `"Celia CRM System" <${process.env.SMTP_USER}>`,
            to: recipient,
            subject: emailSubject,
            html: `
                <div style="font-family: sans-serif; padding: 20px; border: 1px solid #e6c88a;">
                    <h2 style="color: #004854;">New Request Received</h2>
                    <p><strong>From:</strong> ${name} (${email})</p>
                    ${extraInfo}
                    <p><strong>Subject:</strong> ${subject || 'No Subject'}</p>
                    <div style="background: #fcfaf2; padding: 15px; border-left: 4px solid #e6c88a;">
                        <strong>Message:</strong><br/>${message}
                    </div>
                </div>
            `,
            replyTo: email
        });

        // 2. إرسال الرد الآلي للعميل (Auto-Reply)
        const autoReplyHtml = `
            <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #004854; padding: 20px;">
                <div style="text-align: center; margin-bottom: 20px;">
                    <h1 style="color: #004854;">Celia CRM</h1>
                    <p style="color: #9e8a5a; font-weight: bold; text-transform: uppercase;">Institutional Digital Sovereignty</p>
                </div>
                <p>Dear <strong>${name}</strong>,</p>
                <p>Thank you for reaching out to Celia CRM. Your request regarding <strong>"${subject || 'Sovereign Partnership'}"</strong> has been received by our strategic team.</p>
                <p>One of our elite consultants will review your inquiry and contact you via official channels within the next few business hours.</p>
                <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                <p style="font-size: 12px; color: #666; text-align: center;">
                    This is an automated confirmation from the Celia CRM Neural Center.<br/>
                    CeliaCRM.uk - The Strategic Stronghold for Digital Empires.
                </p>
            </div>
        `;

        await transporter.sendMail({
            from: `"Celia CRM Team" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Welcome to the Elite - Celia CRM Confirmation",
            html: autoReplyHtml
        });

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };

    } catch (err) {
        console.error("Mail Error:", err);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: "Failed to process request", message: err.message })
        };
    }
};