import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "tec-tha-data2-8d75bbc353b0.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});

export const addCareerToGoogleSheet =
  async (application) => {

    try {

      await sheets.spreadsheets.values.append({

        spreadsheetId:
          "1W9QHkjF8nMRMQ71wIcERR__gxbja97sMqio39adS-gA",

        range: "Sheet1!A:N",

        valueInputOption:
          "USER_ENTERED",

        requestBody: {

          values: [[

            application.id,

            application.fullName,

            application.email,

            application.phone,

            application.location,

            application.qualification,

            application.experience,

            application.jobRole,

            application.expectedSalary,

            application.github || "",

            application.linkedin || "",

            application.whyJoin || "",

            `https://tec-tha-xuvu.onrender.com/${application.resumeUrl}`,

            new Date(
              application.createdAt
            ).toLocaleString(),

          ]],

        },

      });

    } catch (error) {

      console.error(
        "Career Google Sheets Error:",
        error
      );

    }

};