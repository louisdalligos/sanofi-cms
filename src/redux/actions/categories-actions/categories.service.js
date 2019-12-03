import axiosInstance from "../../../utils/axiosInstance";

function getNewCategories() {
    return axiosInstance({
        method: "GET",
        url: `/categories`
    });
}

function saveSortedCategories(payload) {
    return axiosInstance({
        method: "PUT",
        url: `/categories/sort`,
        data: payload
    });
}

function saveNewCategory(payload) {
    return axiosInstance({
        method: "POST",
        url: `/categories/create`,
        data: payload
    });
}

function deleteCategory(id) {
    return axiosInstance({
        method: "DELETE",
        url: `/categories/delete/${id}`
    });
}

function saveEditedCategory({ id, name }) {
    return axiosInstance({
        method: "PUT",
        url: `/categories/update/${id}`,
        data: {
            name
        }
    });
}

const CategoriesServices = {
    getNewCategories,
    saveSortedCategories,
    saveNewCategory,
    deleteCategory,
    saveEditedCategory
};

export default CategoriesServices;
