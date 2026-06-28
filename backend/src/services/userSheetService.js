import path from "path";
import { fileURLToPath } from "url";
import { google } from "googleapis";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../tec-tha-data2-8d75bbc353b0.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const getSheetsClient = async () => {
  const client = await auth.getClient();
  return google.sheets({
    version: "v4",
    auth: client,
  });
};

export const addUserToSheet = async (user) => {
  try {
    const sheets = await getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: "1SGkDK89HFMaE7NKtXWwxwRO1zlggebsXDHPkXOD4ghY",
      range: "Sheet1!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          user.id,
          user.fullName,
          user.username,
          user.email,
          user.userType,
          user.role,
          new Date(user.createdAt).toLocaleString(),
        ]],
      },
    });
  } catch (error) {
    console.error("User Sheet Error:", error);
    if (error?.response?.data) {
      console.error("Google API response:", error.response.data);
    }
  }
};