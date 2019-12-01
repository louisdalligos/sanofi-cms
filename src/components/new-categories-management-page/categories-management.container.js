import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import CategoriesManagementComponent from "./categories-management.component";

const mapDispatchToProps = state => ({
  /* states */
});

const mapStateToProps = {
  /* function actions */
};

export default connect(
  mapDispatchToProps,
  mapStateToProps
)(CategoriesManagementComponent);
