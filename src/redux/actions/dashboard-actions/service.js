import axiosInstance from "../../../utils/axiosInstance";

function fetchTotalMonthlyNewDoctorsRequest() {
    return axiosInstance({
        method: "get",
        url: "/users/total-new-registrant"
    });
}

function fetchTotalActiveDoctorsRequest() {
    return axiosInstance({
        method: "get",
        url: "/users/total-active"
    });
}

function fetchTotalBlockedDoctorsRequest() {
    return axiosInstance({
        method: "get",
        url: "/users/total-blocked"
    });
}

function fetchTotalActiveAdminsRequest() {
    return axiosInstance({
        method: "get",
        url: "/cms/total-active"
    });
}

function fetchTotalBlockedAdminsRequest() {
    return axiosInstance({
        method: "get",
        url: "/cms/total-blocked"
    });
}

function fetchTotalCategoriesRequest() {
    return axiosInstance({
        method: "get",
        url: "/categories/total-count"
    });
}

function fetchTotalSubCategoriesRequest() {
    return axiosInstance({
        method: "get",
        url: "/sub-categories/total-count"
    });
}

function fetchTotalTherapyArticlesRequest() {
    return axiosInstance({
        method: "get",
        url: "/therapy-areas/total-count"
    });
}

function fetchTotalProductsRequest() {
    return axiosInstance({
        method: "get",
        url: "/products/total-count"
    });
}

function fetchTotalEventsRequest() {
    return axiosInstance({
        method: "get",
        url: "/cme/total-count"
    });
}

const DashboardServices = {
    fetchTotalMonthlyNewDoctorsRequest,
    fetchTotalActiveDoctorsRequest,
    fetchTotalBlockedDoctorsRequest,
    fetchTotalActiveAdminsRequest,
    fetchTotalBlockedAdminsRequest,
    fetchTotalCategoriesRequest,
    fetchTotalSubCategoriesRequest,
    fetchTotalTherapyArticlesRequest,
    fetchTotalProductsRequest,
    fetchTotalEventsRequest
};

export default DashboardServices;
