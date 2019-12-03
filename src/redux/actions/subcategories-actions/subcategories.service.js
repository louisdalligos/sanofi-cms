import axiosInstance from "../../../utils/axiosInstance";

function getNewSubCategories() {
    return axiosInstance({
        method: "GET",
        url: `/sub-categories`
    });
}

function saveSortedSubCategories(payload) {
    return axiosInstance({
        method: "PUT",
        url: `/sub-categories/sort`,
        data: payload
    });
}

function saveNewSubCategory(payload) {
    return axiosInstance({
        method: "POST",
        url: `/sub-categories/create`,
        data: payload
    });
}

function deleteSubCategory(id) {
    return axiosInstance({
        method: "DELETE",
        url: `/sub-categories/delete/${id}`
    });
}

function saveEditedSubCategory({ id, name }) {
    return axiosInstance({
        method: "PUT",
        url: `/sub-categories/update/${id}`,
        data: {
            name
        }
    });
}

const SubCategoriesServices = {
    getNewSubCategories,
    saveSortedSubCategories,
    saveNewSubCategory,
    deleteSubCategory,
    saveEditedSubCategory
};

export default SubCategoriesServices;
