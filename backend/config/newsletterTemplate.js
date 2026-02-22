export const newsletterWelcomeTemplate = ({ name, email, currentDate, backendUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Varuno</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
  </style>
</head>
<body style="margin:0; padding:0; background:#0f0f0f; font-family:'Inter', system-ui, sans-serif; color:#e5e5e5;">
  <div style="
    max-width: 540px;
    margin: 30px auto;
    border-radius: 16px;
    overflow: hidden;
    border: 1px solid #222;
    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  ">

    <!-- Header -->
    <div style="
      background: linear-gradient(135deg, #9f1239, #be123c);
      padding: 40px 30px;
      text-align: center;
    ">
      <h1 style="
        margin: 0;
        font-size: 42px;
        font-weight: 700;
        letter-spacing: -1px;
        color: white;
      ">
        V<span style="color: #fda4af;">A</span>RUNO
      </h1>
      <p style="
        margin: 8px 0 0;
        font-size: 16px;
        color: #fda4af;
        font-weight: 500;
      ">
        Inner Circle
      </p>
    </div>

    <!-- Content -->
    <div style="padding: 32px 28px; text-align: center;">
      <h2 style="
        font-size: 24px;
        font-weight: 600;
        color: white;
        margin: 0 0 16px;
      ">
        Welcome${name ? `, ${name}` : ''}!
      </h2>

      <p style="
        font-size: 15px;
        line-height: 1.6;
        color: #d1d5db;
        margin: 0 0 28px;
      ">
        You’re now part of Varuno’s Inner Circle.<br/>
        Get first access to drops, curated styles & exclusive offers.
      </p>

      <!-- Email Box -->
      <div style="
        background: rgba(159,18,57,0.1);
        border: 1px solid rgba(159,18,57,0.25);
        border-radius: 10px;
        padding: 18px;
        margin-bottom: 28px;
      ">
        <p style="margin: 0 0 6px; color: #fda4af; font-size: 13px;">
          Subscribed with
        </p>
        <p style="
          margin: 0;
          font-size: 17px;
          font-weight: 600;
          color: white;
          word-break: break-all;
        ">
          ${email}
        </p>
      </div>

      <!-- CTA -->
      <a href="https://varuno.qzz.io" target="_blank" style="
        display: inline-block;
        padding: 12px 32px;
        background: #e11d48;
        color: white;
        font-size: 15px;
        font-weight: 600;
        text-decoration: none;
        border-radius: 10px;
        box-shadow: 0 6px 20px rgba(225,29,72,0.25);
      ">
        Explore Now
      </a>
    </div>

    <!-- Footer -->
    <div style="
      background: #0a0a0a;
      padding: 24px 28px;
      text-align: center;
      font-size: 12px;
      color: #9ca3af;
      border-top: 1px solid #222;
    ">
      <p style="margin: 0;">
        © ${new Date().getFullYear()} Varuno
      </p>
      <p style="margin: 6px 0 0;">
        Received on ${currentDate} • 
        <a href="${backendUrl}/api/newsletter/unsubscribe?email=${email}" style="color: #fda4af; text-decoration: none;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
`;