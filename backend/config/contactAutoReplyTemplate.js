export const contactAutoReplyTemplate = ({ name, currentDate }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
  </style>
</head>
<body style="margin:0;padding:0;font-family:'Outfit',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f8fafc;">
  <div style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 10px 25px rgba(0,0,0,0.05);border:1px solid #e2e8f0;">
    
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#7c3aed 100%);padding:40px;text-align:center;">
      <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Message Received</h1>
      <p style="margin:8px 0 0;font-size:16px;color:rgba(255,255,255,0.7);">We've got your back, ${name}!</p>
    </div>

    <!-- Content -->
    <div style="padding:40px;text-align:center;">
      <div style="margin-bottom:32px;">
        <h2 style="font-size:22px;color:#0f172a;margin-bottom:16px;">Thanks for reaching out!</h2>
        <p style="font-size:16px;line-height:1.7;color:#475569;margin:0;">
          Your message has successfully landed in our inbox. Our team has been notified and we're currently reviewing your request.
        </p>
      </div>

      <div style="padding:24px;background:#f1f5f9;border-radius:12px;margin-bottom:32px;">
        <p style="font-size:14px;color:#1e3a8a;font-weight:600;margin:0;">
          Expected response time: Within 24-48 business hours.
        </p>
      </div>

      <p style="font-size:14px;color:#64748b;line-height:1.6;margin-bottom:40px;">
        In the meantime, feel free to explore our latest collections or check out our FAQ page.
      </p>

      <a href="https://varuno.qzz.io" style="display:inline-block;padding:14px 32px;background:#1e3a8a;color:#ffffff;text-decoration:none;border-radius:10px;font-size:15px;font-weight:700;box-shadow:0 10px 15px -3px rgba(30,58,138,0.2);">
        Visit Website
      </a>
    </div>

    <!-- Metadata -->
    <div style="padding:24px;background:#f8fafc;border-top:1px solid #e2e8f0;text-align:center;">
       <p style="margin:0;font-size:12px;color:#94a3b8;">Ref ID: ${Date.now().toString().slice(-8)} • Received: ${currentDate}</p>
       <p style="margin:8px 0 0;font-size:12px;color:#64748b;">© ${new Date().getFullYear()} Varuno. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
