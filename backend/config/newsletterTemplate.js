export const newsletterWelcomeTemplate = ({ name, email, currentDate, backendUrl }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Varuno Newsletter</title>
</head>
<body style="margin:0; padding:0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background: #f4f4f5;">

  <!-- Main Container -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f4f5; padding: 30px 0;">
    <tr>
      <td align="center">
        
        <!-- Email Card -->
        <table width="500" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background: #18181b; padding: 32px 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 600; color: #ffffff;">
                VARUNO
              </h1>
              <p style="margin: 5px 0 0; font-size: 13px; color: #a1a1aa;">
                Inner Circle Newsletter
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 30px;">
              
              <h2 style="margin: 0 0 12px; font-size: 20px; font-weight: 600; color: #18181b;">
                Welcome${name ? `, ${name}` : ' to Varuno'}!
              </h2>
              
              <p style="margin: 0 0 20px; font-size: 15px; line-height: 1.5; color: #3f3f46;">
                Thanks for subscribing to our newsletter. You'll now receive updates about new drops, exclusive offers, and style inspiration.
              </p>

              <!-- Subscription Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background: #f4f4f5; border-radius: 6px; margin: 24px 0;">
                <tr>
                  <td style="padding: 16px;">
                    <p style="margin: 0 0 6px; font-size: 13px; color: #71717a;">Subscribed with:</p>
                    <p style="margin: 0; font-size: 15px; font-weight: 500; color: #18181b; word-break: break-all;">${email}</p>
                    <p style="margin: 12px 0 0; font-size: 12px; color: #71717a;">on ${currentDate}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://varuno.vercel.app" 
                       style="display: inline-block; background: #18181b; color: #ffffff; text-decoration: none; padding: 12px 32px; border-radius: 6px; font-size: 14px; font-weight: 500;">
                      Visit Varuno
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background: #f4f4f5; padding: 24px 30px; text-align: center; border-top: 1px solid #e4e4e7;">
              <p style="margin: 0 0 8px; font-size: 12px; color: #71717a;">
                © ${new Date().getFullYear()} Varuno. All rights reserved.
              </p>
              <p style="margin: 0; font-size: 12px;">
                <a href="${backendUrl}/api/newsletter/unsubscribe?email=${email}" 
                   style="color: #18181b; text-decoration: underline;">Unsubscribe</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
