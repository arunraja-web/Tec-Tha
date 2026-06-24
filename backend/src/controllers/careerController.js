import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { sendEmail } from "../utils/email.js";
import {
  addCareerToGoogleSheet
} from "../services/careerSheetService.js";

const prisma = new PrismaClient();

export const applyCareer = async (
  req,
  res
) => {

  try {

    const {

      fullName,
      email,
      phone,
      location,
      qualification,
      experience,
      linkedin,
      github,
      jobRole,
      expectedSalary,
      whyJoin,

    } = req.body;

    const application =
      await prisma.careerApplication.create({

        data: {

          userId: req.user.id,

          fullName,
          email,
          phone,

          location,
          qualification,
          experience,

          linkedin,
          github,

          jobRole,
          expectedSalary,
          whyJoin,

          resumeUrl:
            req.file.path,

        },

      });
      await addCareerToGoogleSheet(
  application
);

    // Telegram Notification

    try {

      const telegramMessage = `

🚨 New Career Application

👤 Name: ${fullName}

📧 Email: ${email}

📱 Phone: ${phone}

💼 Role: ${jobRole}

📍 Location: ${location}

🎓 Qualification: ${qualification}

`;

      await axios.post(

        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,

        {

          chat_id:
            process.env.TELEGRAM_CHAT_ID,

          text:
            telegramMessage,

        }

      );

    } catch (err) {

      console.log(
        "Telegram notification failed"
      );

    }

    res.status(201).json({

      success: true,

      message:
        "Application submitted successfully",

      data: application,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Failed to submit application",

    });

  }

};
export const getMyCareerApplications =
async (req, res) => {

  try {

    const applications =
      await prisma.careerApplication.findMany({

        where: {
          userId: req.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json({

      success: true,

      data: applications,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

    });

  }

};

export const getAllCareerApplications =
async (req, res) => {

  try {

    const applications =
      await prisma.careerApplication.findMany({

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json({

      success: true,

      data: applications,

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message: "Failed to fetch applications",

    });

  }

};



export const updateCareerStatus = async (
  req,
  res
) => {

  try {

    const { id } = req.params;
    const { status } = req.body;

    const application =
      await prisma.careerApplication.update({

        where: {
          id: Number(id),
        },

        data: {
          status,
        },

      });

    // Email Notification

    const subject =
      status === "APPROVED"

        ? "Tec Tha - Job Application Approved"

        : "Tec Tha - Job Application Update";

    const html =

      status === "APPROVED"

        ? `
          <h2>Congratulations ${application.fullName}! 🎉</h2>

          <p>Your application for the role of <b>${application.jobRole}</b> has been approved.</p>

          <p>Our team will contact you shortly regarding the next steps.</p>

          <br/>

          <p>Regards,</p>
          <p><b>Tec Tha Team</b></p>
        `

        : `
          <h2>Hello ${application.fullName},</h2>

          <p>Thank you for applying for the role of <b>${application.jobRole}</b>.</p>

          <p>After careful review, we regret to inform you that your application was not selected at this time.</p>

          <p>We encourage you to apply again in the future.</p>

          <br/>

          <p>Regards,</p>
          <p><b>Tec Tha Team</b></p>
        `;

    await sendEmail(

      application.email,

      subject,

      html

    );

    res.json({

      success: true,

      message:
        "Status updated successfully",

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({

      success: false,

      message:
        "Failed to update status",

    });

  }

};