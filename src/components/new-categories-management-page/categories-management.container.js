import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CategoriesManagementComponent from "./categories-management.component";
import {
    getNewCategories,
    deleteCategory,
    saveSortedCategories,
    saveNewCategory,
    saveEditedCategory
} from "../../redux/actions/categories-actions/categories.actions";

const mapDispatchToProps = state => ({
    categories: state.newCategoriesReducers.categories,
    loader: state.newCategoriesReducers.loader
});

const mapStateToProps = {
    /* function actions */
    getNewCategories,
    saveSortedCategories,
    saveNewCategory,
    deleteCategory,
    saveEditedCategory
};

export default connect(
    mapDispatchToProps,
    mapStateToProps
)(CategoriesManagementComponent);
