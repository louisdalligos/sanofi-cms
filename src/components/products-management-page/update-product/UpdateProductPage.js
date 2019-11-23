import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import UpdateProductForm from "./UpdateProductForm";

// redux action
import { fetchCurrentProduct } from "../../../redux/actions/product-management-actions/productManagementActions";

const pageTitle = "Update product";

// Component
const UpdateProductPage = ({
  fetchCurrentProduct,
  currentProduct,
  history,
  match,
  ...props
}) => {
  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <div className="page-breadcrumb">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item key="content">Content</Breadcrumb.Item>
              <Breadcrumb.Item key="products">
                <Link to="/products">Products</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="products-create">
                Update Product
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <UpdateProductForm history={history} match={match} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    currentProduct: state.productManagementReducer.currentProduct
  };
};

export default connect(
  mapStateToProps,
  { fetchCurrentProduct }
)(UpdateProductPage);
