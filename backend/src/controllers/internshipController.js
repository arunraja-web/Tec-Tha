import { PrismaClient } from "@prisma/client";
import {
  sendTelegramNotification,
} from "../utils/telegram.js";
import {
  addToGoogleSheet,
} from "../utils/googleSheets.js";
import {
  sendEmail,
} from "../utils/email.js";

const prisma = new PrismaClient();

export const applyInternship = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      college,
      department,
      year,
      internshipRole,
      skills,
      github,
      linkedin,
    } = req.body;

    const application =
      await prisma.internshipApplication.create({
        data: {
          userId: req.user.id,
          fullName,
          email,
          phone,
          college,
          department,
          year,
          internshipRole,
          skills,
          github,
          linkedin,
          resumeUrl: req.file
            ? `/uploads/resumes/${req.file.filename}`
            : "",
        },
      });

      await sendTelegramNotification(

`📩 New Internship Application

👤 Name: ${fullName}

📧 Email: ${email}

📱 Phone: ${phone}

🎯 Role: ${internshipRole}

🏫 College: ${college}

🕒 Submitted:
${new Date().toLocaleString()}`

);

await addToGoogleSheet(
  application
);

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};

export const getMyApplications =
  async (req, res) => {

    const applications =
      await prisma.internshipApplication.findMany({

        where: {
          userId: req.user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json(applications);

};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;



    const application =
      await prisma.internshipApplication.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          status,
        },
      });
      if (status === "APPROVED") {

  await sendEmail(

    application.email,

    "Tec Tha Internship Application Update",

    `
      <h2>Congratulations! 🎉</h2>

      <p>

      We are delighted to inform you
      that your application for the
      <strong>${application.internshipRole}</strong>
      internship position has been selected.

      </p>

      <p>

      Our team will contact you shortly
      regarding the next steps.

      </p>

      <br>

      <p>

      Regards,<br>
      Tec Tha Team

      </p>
    `

  );

}if (status === "REJECTED") {

  await sendEmail(

    application.email,

    "Tec Tha Internship Application Update",

    `
      <h2>Thank You for Applying</h2>

      <p>

      Thank you for your interest in
      Tec Tha.

      </p>

      <p>

      Although you were not selected
      for this opportunity, we encourage
      you to continue enhancing your skills
      and applying for future openings.

      </p>

      <p>

      We wish you all the very best
      in your career journey.

      </p>

      <br>

      <p>

      Regards,<br>
      Tec Tha Team

      </p>
    `

  );

}

    res.json({
      success: true,
      data: application,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
};

export const getApplications =
  async (req, res) => {

    const applications =
      await prisma.internshipApplication.findMany({

        orderBy: {
          createdAt: "desc",
        },

      });

    res.json(applications);

};
export const deleteApplication = async (req, res) => {
  try {

    await prisma.internshipApplication.delete({

      where: {
        id: Number(req.params.id),
      },

    });

    res.json({
      success: true,
      message: "Application deleted successfully",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete application",
    });

  }
};

export const cancelApplication =
  async (req, res) => {

    try {

      const application =
        await prisma.internshipApplication.findUnique({

          where: {
            id: Number(req.params.id),
          },

        });

      if (!application) {

        return res.status(404).json({

          message:
            "Application not found",

        });

      }

      if (
        application.status !==
        "PENDING"
      ) {

        return res.status(400).json({

          message:
            "Only pending applications can be cancelled",

        });

      }

      await prisma.internshipApplication.delete({

        where: {
          id: Number(req.params.id),
        },

      });

      res.json({

        success: true,

        message:
          "Application cancelled successfully",

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to cancel application",

      });

    }

};

export const getApplicationCounts =
  async (req, res) => {

    try {

      const pending =
        await prisma.internshipApplication.count({

          where: {
            status: "PENDING",
          },

        });

      const selected =
        await prisma.internshipApplication.count({

          where: {
            status: "APPROVED",
          },

        });

      const rejected =
        await prisma.internshipApplication.count({

          where: {
            status: "REJECTED",
          },

        });

      const total =
        await prisma.internshipApplication.count();

      res.json({

        success: true,

        data: {

          pending,

          selected,

          rejected,

          total,

        },

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch counts",

      });

    }

};