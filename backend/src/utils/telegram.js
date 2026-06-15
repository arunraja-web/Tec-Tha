import axios from "axios";

export const sendTelegramNotification =
  async (message) => {

    try {

      await axios.post(

        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,

        {
          chat_id:
            process.env.TELEGRAM_CHAT_ID,

          text: message,
        }

      );

    } catch (error) {

      console.error(
        "Telegram Error:",
        error.response?.data ||
        error.message
      );

    }

};