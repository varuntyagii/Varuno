export const verificationEmail = (otp) => {
  const safeOtp = String(otp).replace(/[^0-9]/g, '');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>

  <body style="margin:0;padding:0;font-family:Arial,sans-serif;">
    
    <!-- Preheader -->
    <div style="display:none;max-height:0;overflow:hidden;">
      Your Varuno verification code is ${safeOtp}
    </div>

    <div style="max-width:480px;margin:40px auto;background:#ffffff;border-radius:10px;border:1px solid #e6e8eb;overflow:hidden;">
      
      <div style="background:linear-gradient(90deg,#0f172a,#1e3a8a,#7c3aed);padding:22px;text-align:center;">
        <div style="font-size:18px;font-weight:700;color:#ffffff;">
          Varuno
        </div>
      </div>

      <div style="padding:40px 30px;text-align:center;">
        
        <h2 style="margin-bottom:15px;font-size:20px;color:#111827;">
          Verify Your Email
        </h2>

        <p style="font-size:14px;color:#4b5563;line-height:1.6;">
          Enter the code below to complete your sign in.
        </p>

        <div style="margin:30px 0;">
          <div style="
            display:inline-block;
            padding:18px 28px;
            font-size:28px;
            font-weight:700;
            letter-spacing:8px;
            border-radius:8px;
            background:#f9fafb;
            border:1px solid #d1d5db;
            color:#111827;
          ">
            ${safeOtp}
          </div>
        </div>

        <p style="font-size:13px;color:#6b7280;">
          This code expires in 10 minutes.
        </p>

        <p style="font-size:12px;color:#9ca3af;margin-top:20px;">
          If you did not request this, you can safely ignore this email.
        </p>

        <div style="margin-top:35px;font-size:12px;color:#9ca3af;">
          © ${new Date().getFullYear()} Varuno. All rights reserved.
        </div>

      </div>
    </div>

  </body>
  </html>
  `;
};


export const welcomeEmail = (name) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Varuno</title>
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;border:1px solid #e6e8eb;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 0; border:1px solid #e6e8eb;">
    <tr>
      <td align="center">

        <table width="460" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 8px rgba(0,0,0,0.07);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f172a 0%,#1e3a8a 60%,#7c3aed 100%);padding:36px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.45);">Welcome to</p>
              <h1 style="margin:6px 0 0;font-size:26px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">Varuno</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 20px;font-size:16px;font-weight:600;color:#111827;">Hi ${name},</p>

              <p style="margin:0 0 16px;font-size:14px;line-height:1.75;color:#4b5563;">
                Your Varuno account has been successfully created. You can now access all features and start exploring.
              </p>

              <p style="margin:0 0 32px;font-size:14px;line-height:1.75;color:#4b5563;">
                Click the button below to get started. If you run into any issues, we're always here to help.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="center">
                    <a href="https://varuno.qzz.io/" style="display:inline-block;background:#1e3a8a;color:#ffffff;text-decoration:none;padding:13px 36px;border-radius:8px;font-size:14px;font-weight:600; text-center;">
                      Get Started
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="border-top:1px solid #f0f0f0;padding:22px 40px;text-align:center;">
              <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">
                Questions? <a href="mailto:support@varuno.qzz.io" style="color:#1e3a8a;text-decoration:none;">support@varuno.qzz.io</a>
              </p>
              <p style="margin:0;font-size:11px;color:#d1d5db;">© ${new Date().getFullYear()} Varuno. All rights reserved.</p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
};



