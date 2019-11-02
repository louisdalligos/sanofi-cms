import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Button, PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import Navbar from "../../main-navigation/Navbar";

// redux actions
import { createArticle } from "../../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Create a new article";

// Component
const CreateArticleForm = ({
  categoryData,
  subCategoryData,
  createArticle,
  notifs,
  postManagement,
  history,
  ...props
}) => {
  useEffect(() => {
    console.log("component mounted");
  }, []);

  return (
    <Fragment>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <div className="page-breadcrumb">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item key="content">Content</Breadcrumb.Item>
              <Breadcrumb.Item key="therapy-areas">
                <Link to="/therapy-areas">Therapy Areas</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="therapy-ares-create">
                New Article
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button type="primary">
              <Link to="/therapy-areas">Back to articles</Link>
            </Button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    postManagement: state.postManagementReducer,
    categoryData: state.postManagementReducer.categories,
    subCategoryData: state.postManagementReducer.subCategories,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { createArticle }
)(CreateArticleForm);
