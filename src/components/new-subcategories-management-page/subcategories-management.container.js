import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import SubCategoriesManagementComponent from "./subcategories-management.component";
// import {
//     getNewCategories,
//     deleteCategory,
//     saveSortedCategories,
//     saveNewCategory,
//     saveEditedCategory
// } from "../../redux/actions/categories-actions/categories.actions";

import {
    getNewSubCategories,
    deleteSubCategory,
    saveSortedSubCategories,
    saveNewSubCategory,
    saveEditedSubCategory
} from "../../redux/actions/subcategories-actions/subcategories.actions";

const mapDispatchToProps = state => ({
    categories: state.newSubcategoriesReducers.categories,
    loader: state.newSubcategoriesReducers.loader
});

const mapStateToProps = {
    /* function actions */
    getNewCategories: getNewSubCategories,
    saveSortedCategories: saveSortedSubCategories,
    saveNewCategory: saveNewSubCategory,
    deleteCategory: deleteSubCategory,
    saveEditedCategory: saveEditedSubCategory
};

export default connect(
    mapDispatchToProps,
    mapStateToProps
)(SubCategoriesManagementComponent);
