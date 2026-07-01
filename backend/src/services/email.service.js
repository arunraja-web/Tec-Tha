import dotenv from "dotenv";
import Brevo from "@getbrevo/brevo";

dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendOTPEmail = async ({
  to,
  otp,
  type = "verify",
}) => {
  const isReset = type === "reset";

  const subject = isReset
    ? "Reset Your Password - OTP"
    : "Verify Your Email - OTP";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${subject}</title>
<style>
body{
margin:0;
padding:30px;
font-family:Arial,sans-serif;
background:#f4f6f9;
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
font-size:36px;
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
text-align:center;
border-top:1px solid #eee;
color:#666;
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
Please do not share this OTP with anyone.
</p>

</div>

<div class="footer">
© ${new Date().getFullYear()} Tec Tha
</div>

</div>

</body>
</html>
`;

  try {
    console.log("========== BREVO EMAIL ==========");
    console.log("TO:", to);

    const response = await apiInstance.sendTransacEmail({
      sender: {
        name: "Tec Tha",
        email: process.env.EMAIL_FROM,
      },

      to: [
        {
          email: to,
        },
      ],

      subject,

      htmlContent: html,
    });

    console.log("✅ Email Sent Successfully");
    console.log(response);

    return response;
  } catch (error) {
    console.error("❌ BREVO EMAIL ERROR");

    if (error.response?.body) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }

    throw error;
  }
};

export const verifyEmailConfig = async () => {
  try {
    console.log("✅ Brevo API Connected");
    return true;
  } catch (error) {
    console.error("❌ Brevo Connection Failed");
    console.error(error);
    throw error;
  }
};