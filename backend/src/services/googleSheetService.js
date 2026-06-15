const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "./config/google-service-account.json",
  scopes: [
    "https://www.googleapis.com/auth/spreadsheets",
  ],
});

async function addToSheet(data) {
  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Sheet1!A:K",
    valueInputOption: "USER_ENTERED",

    requestBody: {
      values: [[
        new Date().toLocaleString(),
        data.fullName,
        data.email,
        data.phone,
        data.collegeName,
        data.department,
        data.currentYear,
        data.github,
        data.linkedin,
        data.role,
        data.resume,
      ]],
    },
  });
}

module.exports = addToSheet;