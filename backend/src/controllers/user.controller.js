import prisma from "../config/prisma.js";

export const getAllUsers =
  async (req, res) => {

    try {

      const users =
        await prisma.user.findMany({

          orderBy: {
            createdAt: "desc",
          },

        });

      res.json({

        success: true,

        data: users,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch users",

      });

    }

  };