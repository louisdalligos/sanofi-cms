import React, { Fragment, useEffect, useState } from "react";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import CreateProductForm from "./CreateProductForm";

const pageTitle = "Create a new product";

// Component
const CreateProductPage = ({ history, ...props }) => {
  const [formData, setFormData] = useState({
    category_id: "",
    other_tags: [],
    specializations: [],
    product_name: "",
    short_description: "",
    zinc_code: "",
    page_title: "",
    meta_description: "",
    slug: "",
    meta_keywords: "",
    body: "",
    image_gallery: [],
    zinc_code1: "",
    zinc_code2: "",
    zinc_code3: ""
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
                New Product
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <CreateProductForm data={formData} history={history} />
      </div>
    </Fragment>
  );
};
export default CreateProductPage;
