// export const API = `/api/v1/admin`;

export const appUrl =
  process.env.MIX_APP_URL || "https://sanofi-qa.nuworks.ph:8443";
// const appUrl =
//     process.env.APP_URL && process.env.NODE_ENV === "production"
//         ? process.env.APP_URL
//         : process.env.MIX_APP_URL;

console.log("[api.js]", process.env.MIX_APP_URL, process.env.NODE_ENV);

export const API = `${appUrl}/api/v1/admin`;
