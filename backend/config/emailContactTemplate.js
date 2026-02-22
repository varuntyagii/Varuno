export const emailContactTemplate = ({ name, email, subject, message, currentDate }) => `
<div style="
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  max-width: 650px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 24px rgba(0,0,0,0.08);
  border: 1px solid #e0e0e0;
">

  <!-- Header -->
  <div style="
    background: linear-gradient(135deg, #1a73e8 0%, #0d47a1 100%);
    color: #ffffff;
    padding: 32px;
    text-align: center;
  ">
    <h1 style="margin: 0; font-size: 24px; font-weight: 700;">📩 New Contact Form Submission</h1>
    <p style="margin: 6px 0 0; font-size: 14px; opacity: 0.85;">Varuno Website</p>
  </div>

  <!-- Contact Details -->
  <div style="padding: 32px 36px;">
    <table style="width:100%; border-collapse: collapse; font-family: Arial, sans-serif; margin-bottom: 24px;">
      <tr>
        <td style="padding: 8px 0; color: #555; font-weight: 600; width: 140px;">Name:</td>
        <td style="padding: 8px 0; color: #222;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #555; font-weight: 600;">Email:</td>
        <td style="padding: 8px 0; color: #222;">${email}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #555; font-weight: 600;">Subject:</td>
        <td style="padding: 8px 0; color: #222;">${subject}</td>
      </tr>
    </table>

    <!-- Message Box -->
    <div style="
      background: #f1f5ff;
      border-left: 5px solid #1a73e8;
      padding: 24px;
      border-radius: 8px;
      font-size: 15px;
      color: #1f1f1f;
      line-height: 1.6;
      margin-bottom: 32px;
    ">
      ${message.replace(/\n/g, '<br>')}
    </div>

    <!-- Footer Note -->
    <p style="color: #6b7280; font-size: 13px; text-align: center; margin-bottom: 0;">
      Received on <strong>${currentDate}</strong> via Varuno contact form
    </p>
  </div>

  <!-- Bottom Footer -->
  <div style="
    background: #f9fafb;
    padding: 20px 36px;
    text-align: center;
    font-size: 13px;
    color: #6b7280;
    border-top: 1px solid #e0e0e0;
  ">
    <p style="margin: 0;">© ${new Date().getFullYear()} Varuno • All rights reserved</p>
    <p style="margin: 6px 0 0; opacity: 0.8;">This is an automated notification — please do not reply directly to this email.</p>
  </div>

</div>
`;