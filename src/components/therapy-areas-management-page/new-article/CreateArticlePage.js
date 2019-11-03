import React, { Fragment, useEffect, useState } from "react";
import { Button, PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import Navbar from "../../main-navigation/Navbar";
import CreateArticleForm from "./CreateArticleForm";

const pageTitle = "Create a new article";

// Component
const CreateArticlePage = ({ history, ...props }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    subcategory_id: "",
    specializations: null,
    headline: "",
    short_details: "",
    zinc_code: "",
    page_title: "",
    meta_description: "",
    page_slug: "",
    meta_keywords: "",
    body: ""
  });

  useEffect(() => {
    console.log("article page mounted");
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

        <CreateArticleForm data={formData} history={history} />
      </div>
    </Fragment>
  );
};
export default CreateArticlePage;
