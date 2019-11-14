import React, { Fragment, useEffect, useState } from "react";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import CreateProductForm from "./UpdateProductForm";

const pageTitle = "Update product";

// Component
const UpdateProductPage = ({ history, ...props }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    other_tags: [],
    specializations: [],
    headline: "",
    short_details: "",
    zinc_code: "",
    page_title: "",
    meta_description: "",
    page_slug: "",
    meta_keywords: "",
    body: "",
    featured: "",
    masthead: "",
    thumbnail: ""
  });

  useEffect(() => {
    console.log("product page mounted");
  }, []);

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

        <CreateProductForm data={formData} history={history} />
      </div>
    </Fragment>
  );
};
export default UpdateProductPage;
