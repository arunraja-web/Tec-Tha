import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOTPEmail = async ({ to, otp, type = "verify" }) => {
  const transporter = createTransporter();

  const isReset = type === "reset";
  const subject = isReset ? "Reset Your Password - OTP" : "Verify Your Email - OTP";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>${subject}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: #f0f4f8; }
        .container { max-width: 520px; margin: 40px auto; background: #fff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08); }
        .header { background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); padding: 40px 32px; text-align: center; }
        .logo { width: 56px; height: 56px; background: rgba(255,255,255,0.2); border-radius: 14px; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px; font-size: 28px; }
        .header h1 { color: #fff; font-size: 22px; font-weight: 700; letter-spacing: -0.3px; }
        .header p { color: rgba(255,255,255,0.75); font-size: 14px; margin-top: 6px; }
        .body { padding: 40px 32px; }
        .greeting { font-size: 16px; color: #1e293b; margin-bottom: 16px; }
        .message { font-size: 14px; color: #64748b; line-height: 1.6; margin-bottom: 32px; }
        .otp-box { background: #f8fafc; border: 2px dashed #2563eb; border-radius: 12px; padding: 28px; text-align: center; margin-bottom: 32px; }
        .otp-label { font-size: 12px; font-weight: 600; color: #2563eb; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
        .otp-code { font-size: 42px; font-weight: 800; letter-spacing: 12px; color: #1e3a8a; font-family: 'Courier New', monospace; }
        .expiry { font-size: 13px; color: #94a3b8; margin-top: 10px; }
        .warning { background: #fff7ed; border-left: 4px solid #f97316; border-radius: 6px; padding: 14px 16px; margin-bottom: 28px; }
        .warning p { font-size: 13px; color: #9a3412; line-height: 1.5; }
        .footer { border-top: 1px solid #f1f5f9; padding: 24px 32px; text-align: center; }
        .footer p { font-size: 12px; color: #94a3b8; line-height: 1.6; }
        .company { color: #2563eb; font-weight: 600; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          
          <h1>${isReset ? "Tec Tha" : "Email Verification"}</h1>
          <p></p>
        </div>
        <div class="body">
          <p class="greeting">Hello,</p>
          <p class="message">
      ${isReset
? `We received a request to reset the password for your account. Please use the One-Time Password (OTP) below to continue. This OTP is valid for a limited time and can only be used once.
If you did not request a password reset, you can safely ignore this email. Your account remains secure, and no changes will be made without successful verification.`:`Welcome! Thank you for signing up.
To complete your registration and activate your account, please verify your email address using the One-Time Password (OTP) provided below. This verification helps us protect your account and ensures that only you can access it.
The OTP is valid for a limited time. Once verified, you'll have full access to all the features and services available on our platform.`
}

          </p>
          <div class="otp-box">
            <div class="otp-label">Your One-Time Password</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry">⏱ Expires in ${process.env.OTP_EXPIRES_MINUTES || 10} minutes</div>
          </div>
          <div class="warning">
            <p><strong>⚠️ Security Notice:</strong> Never share this OTP with anyone. Our team will never ask for your OTP. This code is valid for one-time use only.</p>
          </div>
        </div>
        <div class="footer">
          <p>This email was sent by <span class="company">TecTha</span>. If you didn't request this, you can safely ignore this email.</p>
          <p style="margin-top: 8px;">© ${new Date().getFullYear()} TecTha. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

export const verifyEmailConfig = async () => {
  const transporter = createTransporter();
  return await transporter.verify();
};
