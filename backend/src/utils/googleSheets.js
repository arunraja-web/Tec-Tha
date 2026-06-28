import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  keyFile: "auth-system/backend/tec-tha-data2-8d75bbc353b0.json",
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
          "1WplFWBe8MKotwcHUCw3z0Cvu9PLbdxtpCOZTT-CZVZA",

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