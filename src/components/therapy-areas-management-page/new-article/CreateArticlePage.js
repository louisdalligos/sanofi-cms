import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react";
import { Button, PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import Navbar from "../../main-navigation/Navbar";
import CreateArticleForm from "./CreateArticleForm";

const pageTitle = "Create a new article";

// Component
const CreateArticlePage = ({ ...props }) => {
  const [formData, setFormData] = useState({
    headline: "",
    short_details: "",
    zinc_code: ""
  });
  useEffect(() => {
    console.log("article page mounted");
  }, []);

  const submitForm = (values, action) => {
    console.log(values);
  };

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

        <CreateArticleForm submitForm={submitForm} data={formData} />
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

export default CreateArticlePage;
