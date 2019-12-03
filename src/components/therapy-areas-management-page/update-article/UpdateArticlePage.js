import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import UpdateArticleFormWrapper from "./UpdateArticleForm";

const pageTitle = "Update article";

// Component
const UpdateArticlePage = ({ match, auth, postManagement, ...props }) => {
  const [data, setData] = useState({
    status: "",
    category_id: "",
    subcategory_id: "",
    other_tags: "",
    specializations: "",
    headline: "",
    short_details: "",
    //zinc_code: zincCode,
    page_title: "",
    meta_description: "",
    slug: "",
    meta_keywords: "",
    body: "",
    zinc_code1: "",
    zinc_code2: "",
    zinc_code3: "",
    featured: "",
    masthead: "",
    thumbnail: "",
    tag_all: ""
  });

  const getData = data => {
    const str = data.zinc_code.split("|"); // split our zinc code
    const spc = data.specializations.split(",").map(item => {
      return parseInt(item, 10);
    });
    const tags = data.other_tags.split(",");

    let formatData = {
      id: data.id,
      status: data.status,
      headline: data.headline,
      short_details: data.short_details,
      category_id: data.category_id,
      subcategory_id: data.category_id,
      specializations: spc,
      other_tags: tags,
      body: data.body,
      page_title: data.page_title,
      slug: data.slug,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
      zinc_code: data.zinc_code,
      zinc_code1: str[0].trim(),
      zinc_code2: str[1].trim(),
      zinc_code3: str[2].trim(),
      masthead: data.masthead_image,
      featured: data.featured_image,
      thumbnail: data.thumbnail_image
    };

    setData(formatData); // set our formated obj to formik values
  };

  return (
    <Fragment>
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
                Update Article
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <UpdateArticleFormWrapper
          auth={auth}
          history={props.history}
          match={match}
          data={data}
          getData={getData}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    postManagement: state.postManagementReducer,
    notifs: state.notificationReducer,
    currentEvent: state.cmeReducer.currentProduct
  };
};

export default connect(
  mapStateToProps,
  null
)(UpdateArticlePage);
