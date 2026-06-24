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

export const addUserToSheet =
async (user) => {

  try {

    await sheets.spreadsheets.values.append({

      spreadsheetId:
        "1iYx6mTngyFhrq7GHJ3lSUDG0cLdcppjsQWJ3U--z_0U",

      range: "Sheet1!A:G",

      valueInputOption:
        "USER_ENTERED",

      requestBody: {

        values: [[

          user.id,

          user.fullName,

          user.username,

          user.email,

          user.userType,

          user.role,

          new Date(
            user.createdAt
          ).toLocaleString(),

        ]],

      },

    });

  } catch (error) {

    console.log(
      "User Sheet Error:",
      error
    );

  }

};