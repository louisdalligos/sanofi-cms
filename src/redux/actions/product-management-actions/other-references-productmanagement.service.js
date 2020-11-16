import axiosInstance from "../../../utils/axiosInstance";

function fetchOtherReferences(id) {
    return axiosInstance({
        method: "GET",
        url: `/products/edit/${id}`
    });
}

function saveOtherReferences(id, payload) {
    return axiosInstance({
        method: "PUT",
        url: `/products/update/${id}`,
        data: payload
    });
}

function saveFilePostOtherReferences(id, payload) {
    return axiosInstance({
        method: "POST",
        url: `/products/update/${id}`,
        data: payload
    });
}

function deleteOtherReferences(id) {
    return axiosInstance({
        method: "DELETE",
        url: `/products/file/delete/${id}`
    });
}

const OtherReferencesProductManagementService = {
    fetchOtherReferences,
    saveOtherReferences,
    deleteOtherReferences,
    saveFilePostOtherReferences
};

export default OtherReferencesProductManagementService;
