import SibApiV3Sdk from "sib-api-v3-sdk";
import dotenv from "dotenv";

dotenv.config();

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendEmail = async (to, subject, html) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Tec Tha",
      email: process.env.EMAIL_FROM,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email Sent Successfully");
    console.log(response);

    return response;
  } catch (error) {
    console.error("❌ Email Sending Failed");

    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }

    throw error;
  }
};

export const sendCustomEmail = async ({
  to,
  subject,
  html,
}) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      name: "Tec Tha",
      email: process.env.EMAIL_FROM,
    };

    sendSmtpEmail.to = [
      {
        email: to,
      },
    ];

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = html;

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Custom Email Sent Successfully");
    console.log(response);

    return response;
  } catch (error) {
    console.error("❌ Custom Email Failed");

    if (error.response) {
      console.error(error.response.body);
    } else {
      console.error(error);
    }

    throw error;
  }
};