import {
    FETCH_MONTHLY_USERS_COUNT_REQUEST,
    FETCH_MONTHLY_USERS_COUNT_SUCCESS,
    FETCH_MONTHLY_USERS_COUNT_FAILED,
    FETCH_TOTAL_ACTIVE_DOCTORS_REQUEST,
    FETCH_TOTAL_ACTIVE_DOCTORS_SUCCESS,
    FETCH_TOTAL_ACTIVE_DOCTORS_FAILED,
    FETCH_TOTAL_BLOCKED_DOCTORS_REQUEST,
    FETCH_TOTAL_BLOCKED_DOCTORS_SUCCESS,
    FETCH_TOTAL_BLOCKED_DOCTORS_FAILED,
    FETCH_TOTAL_ACTIVE_ADMINS_REQUEST,
    FETCH_TOTAL_ACTIVE_ADMINS_SUCCESS,
    FETCH_TOTAL_ACTIVE_ADMINS_FAILED,
    FETCH_TOTAL_BLOCKED_ADMINS_REQUEST,
    FETCH_TOTAL_BLOCKED_ADMINS_SUCCESS,
    FETCH_TOTAL_BLOCKED_ADMINS_FAILED,
    FETCH_TOTAL_CATEGORIES_REQUEST,
    FETCH_TOTAL_CATEGORIES_SUCCESS,
    FETCH_TOTAL_CATEGORIES_FAILED,
    FETCH_TOTAL_SUBCATEGORIES_REQUEST,
    FETCH_TOTAL_SUBCATEGORIES_SUCCESS,
    FETCH_TOTAL_SUBCATEGORIES_FAILED,
    FETCH_TOTAL_ARTICLES_REQUEST,
    FETCH_TOTAL_ARTICLES_SUCCESS,
    FETCH_TOTAL_ARTICLES_FAILED,
    FETCH_TOTAL_PRODUCTS_REQUEST,
    FETCH_TOTAL_PRODUCTS_SUCCESS,
    FETCH_TOTAL_PRODUCTS_FAILED,
    FETCH_TOTAL_EVENTS_REQUEST,
    FETCH_TOTAL_EVENTS_SUCCESS,
    FETCH_TOTAL_EVENTS_FAILED
} from "../actions/dashboard-actions/types";

const initialState = {
    requestInProgress: null,
    totalNewDoctorsMonthly: null,
    totalActiveDoctors: null,
    totalBlockedDoctors: null,
    totalActiveAdmins: null,
    totalBlockedAdmins: null,
    totalCategories: null,
    totalSubcategories: null,
    totalTherapyArticles: null,
    totalProducts: null,
    totalEvents: null
};

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MONTHLY_USERS_COUNT_REQUEST:
        case FETCH_TOTAL_ACTIVE_DOCTORS_REQUEST:
        case FETCH_TOTAL_BLOCKED_DOCTORS_REQUEST:
        case FETCH_TOTAL_ACTIVE_ADMINS_REQUEST:
        case FETCH_TOTAL_BLOCKED_ADMINS_REQUEST:
        case FETCH_TOTAL_CATEGORIES_REQUEST:
        case FETCH_TOTAL_SUBCATEGORIES_REQUEST:
        case FETCH_TOTAL_ARTICLES_REQUEST:
        case FETCH_TOTAL_PRODUCTS_REQUEST:
        case FETCH_TOTAL_EVENTS_REQUEST:
            return {
                ...state,
                requestInProgress: true
            };
        case FETCH_MONTHLY_USERS_COUNT_FAILED:
        case FETCH_TOTAL_ACTIVE_DOCTORS_FAILED:
        case FETCH_TOTAL_BLOCKED_DOCTORS_FAILED:
        case FETCH_TOTAL_ACTIVE_ADMINS_FAILED:
        case FETCH_TOTAL_BLOCKED_ADMINS_FAILED:
        case FETCH_TOTAL_CATEGORIES_FAILED:
        case FETCH_TOTAL_SUBCATEGORIES_FAILED:
        case FETCH_TOTAL_ARTICLES_FAILED:
        case FETCH_TOTAL_PRODUCTS_FAILED:
        case FETCH_TOTAL_EVENTS_FAILED:
            return {
                ...state,
                requestInProgress: false
            };
        case FETCH_MONTHLY_USERS_COUNT_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalNewDoctorsMonthly: action.payload.new_registrants
            };
        case FETCH_TOTAL_ACTIVE_DOCTORS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalActiveDoctors: action.payload.active
            };
        case FETCH_TOTAL_BLOCKED_DOCTORS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalBlockedDoctors: action.payload.blocked
            };
        case FETCH_TOTAL_ACTIVE_ADMINS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalActiveAdmins: action.payload.active
            };
        case FETCH_TOTAL_BLOCKED_ADMINS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalBlockedAdmins: action.payload.blocked
            };
        case FETCH_TOTAL_CATEGORIES_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalCategories: action.payload.total_count
            };
        case FETCH_TOTAL_SUBCATEGORIES_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalSubcategories: action.payload.total_count
            };
        case FETCH_TOTAL_ARTICLES_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalTherapyArticles: action.payload.total_count
            };
        case FETCH_TOTAL_PRODUCTS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalProducts: action.payload.total_count
            };
        case FETCH_TOTAL_EVENTS_SUCCESS:
            return {
                ...state,
                requestInProgress: false,
                totalEvents: action.payload.total_count
            };
        default:
            return state;
    }
};

export default dashboardReducer;
