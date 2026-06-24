import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "google-service-account.json",
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
          "15Jp35ApZFAD37HRcgW7mb0cZhkK_W1R_js6yzbjBhes",

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

            `http://localhost:5000/${application.resumeUrl}`,

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