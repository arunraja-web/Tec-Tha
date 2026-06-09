import crypto from "crypto";

export const generateOTP = (length = 6) => {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * digits.length)];
  }
  return otp;
};

export const generateSecureOTP = () => {
  const buffer = crypto.randomBytes(3);
  const num = parseInt(buffer.toString("hex"), 16);
  return String(num % 1000000).padStart(6, "0");
};

export const getOTPExpiryTime = () => {
  const minutes = parseInt(process.env.OTP_EXPIRES_MINUTES) || 10;
  return new Date(Date.now() + minutes * 60 * 1000);
};
