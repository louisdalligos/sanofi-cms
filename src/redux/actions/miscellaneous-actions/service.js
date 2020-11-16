import axiosInstance from "../../../utils/axiosInstance";

// const appUrl = process.env.APP_URL || "";
// const appUrl =
//     process.env.APP_URL && process.env.NODE_ENV === "production"
//         ? process.env.APP_URL
//         : process.env.MIX_APP_URL;
const appUrl = process.env.MIX_APP_URL || "";

console.log("[api.js]", process.env.MIX_APP_URL, process.env.NODE_ENV);

function fetchAllMiscContent() {
  return axiosInstance({
    baseURL: `${appUrl}/api/v1`,
    method: "GET",
    url: "/misc-contents"
  });
}

function createMiscContent(body) {
  return axiosInstance({
    method: "POST",
    url: "/misc-contents",
    data: body
  });
}

function updateMiscContent(body) {
  // body = Object.assign(body, { _method: "PUT" });
  return axiosInstance({
    // method: "POST",
    method: "PUT",
    url: `/misc-contents/${body.type}`,
    data: body
  });
}

const MiscellaneousServices = {
  createMiscContent,
  updateMiscContent,
  fetchAllMiscContent
};

export default MiscellaneousServices;
