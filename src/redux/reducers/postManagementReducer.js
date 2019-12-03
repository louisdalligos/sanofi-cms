import {
    FETCH_SPECIALIZATIONS_REQUEST,
    FETCH_SPECIALIZATIONS_SUCCESS,
    FETCH_SPECIALIZATIONS_FAILED,
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILED,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILED,
    FETCH_SUBCATEGORIES_REQUEST,
    FETCH_SUBCATEGORIES_SUCCESS,
    FETCH_SUBCATEGORIES_FAILED,
    ADD_SUBCATEGORY_REQUEST,
    ADD_SUBCATEGORY_SUCCESS,
    ADD_SUBCATEGORY_FAILED,
    CREATE_ARTICLE_REQUEST,
    CREATE_ARTICLE_SUCCESS,
    CREATE_ARTICLE_FAILED,
    ARCHIVE_ARTICLE_REQUEST,
    ARCHIVE_ARTICLE_SUCCESS,
    ARCHIVE_ARTICLE_FAILED,
    FETCH_CURRENT_ARTICLE_REQUEST,
    FETCH_CURRENT_ARTICLE_SUCCESS,
    FETCH_CURRENT_ARTICLE_FAILED,
    CHANGE_ARTICLE_STATUS_REQUEST,
    CHANGE_ARTICLE_STATUS_SUCCESS,
    CHANGE_ARTICLE_STATUS_FAILED
} from "../actions/post-management-actions/types";

const initialState = {
    categories: null,
    subCategories: null,
    requestInProgress: null,
    loading: false,
    modal: false,
    currentArticle: null,
    specializations: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORIES_REQUEST:
        case FETCH_SUBCATEGORIES_REQUEST:
        case CREATE_ARTICLE_REQUEST:
        case ARCHIVE_ARTICLE_REQUEST:
        case FETCH_CURRENT_ARTICLE_REQUEST:
        case FETCH_SPECIALIZATIONS_REQUEST:
        case CHANGE_ARTICLE_STATUS_REQUEST:
            return {
                ...state,
                requestInProgress: true
            };
        case FETCH_SPECIALIZATIONS_SUCCESS:
            return {
                ...state,
                specializations: action.payload,
                requestInProgress: false
            };
        case FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                categories: action.payload,
                requestInProgress: false
            };
        case FETCH_SPECIALIZATIONS_FAILED:
        case FETCH_CATEGORIES_FAILED:
        case FETCH_SUBCATEGORIES_FAILED:
        case CREATE_ARTICLE_SUCCESS:
        case CREATE_ARTICLE_FAILED:
        case ARCHIVE_ARTICLE_SUCCESS:
        case ARCHIVE_ARTICLE_FAILED:
        case FETCH_CURRENT_ARTICLE_FAILED:
        case CHANGE_ARTICLE_STATUS_SUCCESS:
        case CHANGE_ARTICLE_STATUS_FAILED:
            return {
                ...state,
                requestInProgress: false
            };
        case ADD_CATEGORY_REQUEST:
        case ADD_SUBCATEGORY_REQUEST:
            return {
                ...state,
                loading: true
            };
        case ADD_CATEGORY_SUCCESS:
        case ADD_CATEGORY_FAILED:
        case ADD_SUBCATEGORY_SUCCESS:
        case ADD_SUBCATEGORY_FAILED:
            return {
                ...state,
                loading: false,
                modal: false
            };
        case FETCH_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                subCategories: action.payload,
                requestInProgress: false
            };
        case FETCH_CURRENT_ARTICLE_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                currentArticle: action.payload
            };
        default:
            return state;
    }
};
