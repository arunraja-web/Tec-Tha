import prisma from "../config/prisma.js";
import { sendEmail } from "../utils/email.js";

export const sendCustomEmail = async (req, res) => {

  try {

    const {
      recipient,
      subject,
      message,
      sendToAll,
    } = req.body;

    // Validation

    if (!subject || !message) {

      return res.status(400).json({

        success: false,
        message: "Subject and message are required",

      });

    }

    // Send to all users

    if (sendToAll) {

      const users = await prisma.user.findMany({

        select: {
          email: true,
        },

      });

      for (const user of users) {

        await sendEmail(

          user.email,
          subject,

          `
            <div style="font-family: Arial, sans-serif;">
              <h2>Tec Tha Notification</h2>

              <p>${message}</p>

              <br>

              <p>Regards,</p>

              <p><strong>Tec Tha Team</strong></p>
            </div>
          `

        );

      }

      return res.json({

        success: true,
        message: "Email sent to all users successfully",

      });

    }

    // Send to single user

    if (!recipient) {

      return res.status(400).json({

        success: false,
        message: "Recipient email is required",

      });

    }

    await sendEmail(

      recipient,

      subject,

      `
        <div style="font-family: Arial, sans-serif;">

          <h2>Tec Tha Notification</h2>

          <p>${message}</p>

          <br>

          <p>Regards,</p>

          <p><strong>Tec Tha Team</strong></p>

        </div>
      `

    );

    return res.json({

      success: true,
      message: "Email sent successfully",

    });

  } catch (error) {

    console.log("EMAIL ERROR:", error);

    return res.status(500).json({

      success: false,
      message: "Failed to send email",

    });

  }

};