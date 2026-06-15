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

export const addToGoogleSheet =
  async (application) => {

    try {

      await sheets.spreadsheets.values.append({

        spreadsheetId:
          "1YoqOicq_gXU_NM07vl133eBFQj-uSnlk3qs6k2Eg6S0",

        range: "Sheet1!A:L",

        valueInputOption:
          "USER_ENTERED",

        requestBody: {

          values: [[

            application.id,

            application.fullName,

            application.email,

            application.phone,

            application.college,

            application.department,

            application.year,

            application.internshipRole,

            application.github || "",

            application.linkedin || "",

            `http://localhost:5000${application.resumeUrl}`,

            new Date(
              application.createdAt
            ).toLocaleString(),

          ]],

        },

      });

    } catch (error) {

      console.error(
        "Google Sheets Error:",
        error
      );

    }

};