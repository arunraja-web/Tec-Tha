import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === "true",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

export const sendOTPEmail = async ({
  to,
  otp,
  type = "verify",
}) => {
  const transporter = createTransporter();

  const isReset = type === "reset";

  const subject = isReset
    ? "Reset Your Password - OTP"
    : "Verify Your Email - OTP";

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
body{
font-family:Arial,sans-serif;
background:#f4f6f9;
padding:30px;
}

.container{
max-width:600px;
margin:auto;
background:#fff;
border-radius:10px;
overflow:hidden;
box-shadow:0 4px 12px rgba(0,0,0,.08);
}

.header{
background:#2563eb;
padding:25px;
text-align:center;
color:#fff;
}

.content{
padding:30px;
}

.otp{
font-size:34px;
font-weight:bold;
letter-spacing:8px;
text-align:center;
padding:20px;
background:#eef4ff;
border-radius:10px;
margin:20px 0;
color:#1e40af;
}

.footer{
padding:20px;
font-size:13px;
color:#666;
text-align:center;
border-top:1px solid #eee;
}
</style>
</head>

<body>

<div class="container">

<div class="header">
<h2>Tec Tha</h2>
</div>

<div class="content">

<p>Hello,</p>

<p>

${
  isReset
    ? "Use the OTP below to reset your password."
    : "Thank you for registering. Please verify your email using the OTP below."
}

</p>

<div class="otp">
${otp}
</div>

<p>
OTP expires in
<strong>${process.env.OTP_EXPIRES_MINUTES || 10} minutes</strong>.
</p>

<p>
Do not share this OTP with anyone.
</p>

</div>

<div class="footer">
© ${new Date().getFullYear()} Tec Tha
</div>

</div>

</body>
</html>
`;

  const mailOptions = {
    from:
      process.env.EMAIL_FROM ||
      `"Tec Tha" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    console.log("========== EMAIL DEBUG ==========");
    console.log("HOST:", process.env.EMAIL_HOST);
    console.log("PORT:", process.env.EMAIL_PORT);
    console.log("SECURE:", process.env.EMAIL_SECURE);
    console.log("USER:", process.env.EMAIL_USER);
    console.log("FROM:", process.env.EMAIL_FROM);
    console.log("TO:", to);

    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email Sent Successfully");
    console.log(info.messageId);

    return info;
  } catch (error) {
    console.error("❌ EMAIL ERROR");
    console.error(error);

    throw error;
  }
};

export const verifyEmailConfig = async () => {
  try {
    const transporter = createTransporter();

    await transporter.verify();

    console.log("✅ SMTP Connection Successful");

    return true;
  } catch (error) {
    console.error("❌ SMTP Connection Failed");
    console.error(error);

    throw error;
  }
};