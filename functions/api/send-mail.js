/**
 * Cloudflare Pages Function for sending emails
 * This replaces the local Express backend for mail sending.
 * 
 * Deployment Instructions:
 * 1. Create a folder named 'functions' at the root of your project.
 * 2. Place this file inside it: functions/api/send-mail.js
 * 3. Add your secrets (SMTP_HOST, SMTP_USER, etc.) in the Cloudflare Pages Dashboard under Settings > Environment Variables.
 */

// GET handler for health checks
export async function onRequestGet() {
    return new Response(JSON.stringify({ 
        status: "alive", 
        message: "Celia CRM Mail Function is active. Use POST to send emails." 
    }), {
        headers: { "Content-Type": "application/json" }
    });
}

export async function onRequestPost(context) {
    const { request, env } = context;

    const headers = { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    const jsonResponse = (data, status = 200) => new Response(JSON.stringify(data), { status, headers });

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers });

    try {
        const bodyText = await request.text();
        if (!bodyText) return jsonResponse({ error: "Empty request body" }, 400);

        let data;
        try {
            data = JSON.parse(bodyText);
        } catch (e) {
            return jsonResponse({ error: "Malformed JSON" }, 400);
        }

        const { type, name, email, subject, message } = data;
        if (!email || !name || !message) {
            return jsonResponse({ error: "Missing required fields: name, email, and message are mandatory" }, 400);
        }

        const recipient = type === 'subscription' ? "Sales@celiacrm.uk" : "info@celiacrm.uk";
        const emailSubject = `Celia CRM ${type === 'subscription' ? 'Subscription' : 'Enquiry'} [${name}]`;
        
        // Clean extra data for display
        const extraEntries = Object.entries(data)
            .filter(([k]) => !['type', 'name', 'email', 'subject', 'message'].includes(k))
            .map(([k, v]) => `<p><strong>${k.toUpperCase()}:</strong> ${v}</p>`)
            .join('');

        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; color: #002b33; border: 1px solid #e6c88a; padding: 20px;">
                <h2 style="color: #004854; border-bottom: 2px solid #e6c88a; padding-bottom: 10px;">Celia CRM Notification</h2>
                <div style="margin: 20px 0;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    ${extraEntries}
                    <p><strong>Subject:</strong> ${subject || 'New Request'}</p>
                </div>
                <div style="background: #fcfaf2; padding: 15px; border-left: 5px solid #9e8a5a;">
                    <strong>Message:</strong><br/>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <p style="font-size: 10px; color: #999; margin-top: 30px; text-align: center;">Celia CRM Institutional Relay</p>
            </div>
        `;

        // 1. Try Resend
        if (env.RESEND_API_KEY) {
            try {
                const resendRes = await fetch("https://api.resend.com/emails", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${env.RESEND_API_KEY}`
                    },
                    body: JSON.stringify({
                        from: env.SMTP_FROM || "Celia CRM <onboarding@resend.dev>",
                        to: [recipient],
                        subject: emailSubject,
                        html,
                        reply_to: email
                    })
                });

                if (resendRes.ok) return jsonResponse({ success: true, provider: "resend" });
            } catch (e) { console.error("Resend skip:", e.message); }
        }

        // 2. Try MailChannels
        try {
            const mcRes = await fetch("https://api.mailchannels.net/tx/v1/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    personalizations: [{ to: [{ email: recipient }] }],
                    from: { email: env.SMTP_FROM || "info@celiacrm.uk", name: "Celia CRM Notify" },
                    subject: emailSubject,
                    content: [{ type: "text/html", value: html }]
                })
            });

            if (mcRes.ok) return jsonResponse({ success: true, provider: "mailchannels" });
            
            const mcErr = await mcRes.text();
            return jsonResponse({ error: "Providers failed", details: mcErr }, 502);
            
        } catch (e) {
            return jsonResponse({ error: "Final relay error", message: e.message }, 500);
        }

    } catch (err) {
        return jsonResponse({ error: "Critical Error", message: err.message }, 500);
    }
}
