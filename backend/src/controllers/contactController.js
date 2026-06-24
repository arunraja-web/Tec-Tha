import prisma from "../config/prisma.js";
import axios from "axios";
import nodemailer from "nodemailer";

export const createConversation = async (req, res) => {
  try {

    const {
      subject,
      message,
    } = req.body;

    const conversation =
      await prisma.contactConversation.create({

        data: {

          userId: req.user.id,

          subject,

          messages: {

            create: {

              senderType: "USER",

              message,

            },

          },

        },

        include: {

          messages: true,

        },

      });

    // Telegram Notification

    try {

      await axios.post(

        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,

        {

          chat_id:
            process.env.TELEGRAM_CHAT_ID,

          text: `📩 New Contact Request

👤 User:
${req.user.fullName}

📌 Subject:
${subject}

💬 Message:
${message}`,

        }

      );

    } catch (telegramError) {

      console.log(
        "Telegram notification failed"
      );

    }

    res.status(201).json({

      success: true,

      data: conversation,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Failed to create conversation",

    });

  }
};  

export const getAllConversations = async (req, res) => {

  try {

    const conversations =
      await prisma.contactConversation.findMany({

        include: {
          user: true,
          messages: true,
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json({
      success: true,
      data: conversations,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch conversations",
    });

  }

};

export const replyToConversation = async (req, res) => {

  try {

    const { id } = req.params;
    const { message } = req.body;

    const reply =
      await prisma.contactMessage.create({

        data: {

          conversationId: Number(id),

          senderType: "ADMIN",

          message,

        },

      });
      const conversation =
  await prisma.contactConversation.findUnique({

    where: {
      id: Number(id),
    },

    include: {
      user: true,
    },

  });
  const transporter =
  nodemailer.createTransport({

    service: "gmail",

    auth: {

      user: process.env.EMAIL_USER,

      pass: process.env.EMAIL_PASS,

    },

  });

await transporter.sendMail({

  from: process.env.EMAIL_USER,

  to: conversation.user.email,

  subject: "Tec Tha Response",

  html: `

    <div style="font-family: Arial; padding:20px;">

      <h2>
        Tec Tha has responded to your message
      </h2>

      <p>
        Hello ${conversation.user.fullName},
      </p>

      <p>
        Our team has responded to your message.
      </p>

      <p>
        Please login to your Tec Tha account
        to view the complete response.
      </p>

      <br/>

      <p>
        Regards,<br/>
        Tec Tha Team
      </p>

    </div>

  `

});
    await prisma.contactConversation.update({

      where: {
        id: Number(id),
      },

      data: {
        status: "ADMIN_REPLIED",
      },

    });

    res.json({
      success: true,
      data: reply,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to send reply",
    });

  }

};

export const deleteMessage = async (
  req,
  res
) => {

  try {

    const { id } = req.params;

    await prisma.contactMessage.update({

      where: {
        id: Number(id),
      },

      data: {

        isDeleted: true,

        deletedAt: new Date(),

        message:
          "This message was deleted by user",

      },

    });

    res.json({

      success: true,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

    });

  }

};

export const getMyConversations = async (
  req,
  res
) => {

  try {

    const conversations =
      await prisma.contactConversation.findMany({

        where: {
          userId: req.user.id,
        },

        include: {
          messages: true,
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json({
      success: true,
      data: conversations,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch messages",
    });

  }

};

