import dotenv from "dotenv";
import Brevo from "@getbrevo/brevo";

dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export const sendEmail = async (
  to,
  subject,
  html
) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "Tec Tha",
      email: process.env.EMAIL_FROM,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};

export const sendCustomEmail = async ({
  to,
  subject,
  html,
}) => {
  await apiInstance.sendTransacEmail({
    sender: {
      name: "Tec Tha",
      email: process.env.EMAIL_FROM,
    },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  });
};