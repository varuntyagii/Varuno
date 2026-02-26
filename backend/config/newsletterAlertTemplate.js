// config/newsletterAlertTemplate.js
export const newsletterAlertTemplate = ({ name, email, currentDate, backendUrl }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>New Newsletter Subscriber</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 20px;">
  <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #eaeaea;">
    <div style="background: linear-gradient(135deg, #9f1239, #be123c); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
      <h1 style="color: white; margin: 0; font-size: 32px;">VARUNO</h1>
      <p style="color: #fda4af; margin: 5px 0 0;">Inner Circle Alert</p>
    </div>
    
    <div style="padding: 30px;">
      <h2 style="color: #333; margin-bottom: 20px;">New Member Joined! 🎉</h2>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <p style="margin: 0 0 10px;"><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p style="margin: 0 0 10px;"><strong>Email:</strong> ${email}</p>
        <p style="margin: 0;"><strong>Date:</strong> ${currentDate}</p>
      </div>
      
      <p style="color: #666; line-height: 1.6;">
        A new member has joined the Varuno Inner Circle. Welcome them to the community!
      </p>
      
      <a href="${backendUrl}/admin/newsletter" style="display: inline-block; background: #e11d48; color: white; text-decoration: none; padding: 10px 25px; border-radius: 5px; margin-top: 20px;">
        View All Subscribers
      </a>
    </div>
    
    <div style="background: #f5f5f5; padding: 20px; text-align: center; border-top: 1px solid #eaeaea; border-radius: 0 0 10px 10px;">
      <p style="margin: 0; color: #999; font-size: 12px;">
        © ${new Date().getFullYear()} Varuno. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>
`;
