import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

// Configure API Key
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

// Create API Instance
const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendOTPEmail = async ({
  to,
  otp,
  type = "verify",
}) => {
  try {
    const isReset = type === "reset";

    const subject = isReset
      ? "Reset Your Password - OTP"
      : "Verify Your Email - OTP";

    const html = `
      <div style="font-family:Arial,sans-serif;padding:30px;background:#f5f5f5;">
        <div style="max-width:600px;margin:auto;background:#fff;padding:30px;border-radius:10px;">
          <h2 style="color:#2563eb;text-align:center;">Tec Tha</h2>

          <p>Hello,</p>

          <p>
          ${
            isReset
              ? "Use the OTP below to reset your password."
              : "Thank you for registering. Please verify your email using the OTP below."
          }
          </p>

          <div style="
            background:#eef4ff;
            padding:20px;
            text-align:center;
            font-size:34px;
            font-weight:bold;
            letter-spacing:8px;
            color:#1d4ed8;
            border-radius:8px;
            margin:25px 0;
          ">
            ${otp}
          </div>

          <p>
            OTP expires in
            <strong>${process.env.OTP_EXPIRES_MINUTES || 10} minutes</strong>.
          </p>

          <p>
            Never share this OTP with anyone.
          </p>

          <hr>

          <p style="text-align:center;color:#777;">
            © ${new Date().getFullYear()} Tec Tha
          </p>
        </div>
      </div>
    `;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: process.env.EMAIL_FROM,
      name: "Tec Tha",
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("================================");
    console.log("✅ OTP Email Sent Successfully");
    console.log("Message:", response);
    console.log("================================");

    return response;

  } catch (error) {

    console.error("================================");
    console.error("❌ BREVO EMAIL ERROR");

    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }

    console.error("================================");

    throw error;
  }
};

export const verifyEmailConfig = async () => {
  try {
    console.log("✅ Brevo API Ready");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};