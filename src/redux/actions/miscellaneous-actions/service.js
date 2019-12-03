import axiosInstance from "../../../utils/axiosInstance";

const isProd = process.env.NODE_ENV === "development" ? false : true;

function fetchAllMiscContent() {
    return axiosInstance({
        baseURL: isProd
            ? "/api/v1"
            : "https://sanofi-qa.nuworks.ph:8443/api/v1",
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
