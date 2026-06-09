import { PrismaClient } from "@prisma/client";

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

export const getApplications = async (req, res) => {
  try {
    const applications =
      await prisma.internshipApplication.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    res.json({
      success: true,
      data: applications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch applications",
    });
  }
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
      message: "Application deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};