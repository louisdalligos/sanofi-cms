import React, { Fragment, useEffect, useState } from "react";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import CreateCMEForm from "./CreateCMEForm";

const pageTitle = "Create a new CME";

// Component
const CreateCMEPage = ({ history, ...props }) => {
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
    zinc_code3: "",
    event_type: "",
    event_location: "",
    event_headings: [
      {
        name: "Heading Title 1"
      },
      {
        name: "Heading Title 1"
      }
    ]
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
              <Breadcrumb.Item key="cme">
                <Link to="/cme">CME</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="cme-create">New CME</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <CreateCMEForm data={formData} history={history} />
      </div>
    </Fragment>
  );
};
export default CreateCMEPage;
