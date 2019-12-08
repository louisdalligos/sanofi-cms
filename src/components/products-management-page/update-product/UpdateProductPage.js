import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import UpdateProductFormWrapper from "./UpdateProductForm";

import {
  fetchCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Update product";

// Component
const UpdateProductPage = ({
  match,
  auth,
  postManagement,
  fetchCategories,
  fetchSpecializations,
  notifs,
  ...props
}) => {
  const [data, setData] = useState({
    status: "",
    category_id: "",
    subcategory_id: "",
    other_tags: [],
    specializations: [],
    headline: "",
    short_details: "",
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
    image_gallery: [],
    tag_all: ""
  });

  const getData = data => {
    const str = data.zinc_code.split("|"); // split our zinc code

    const tags = data.other_tags.split(",");
    const allStatus = data.tag_all ? true : false;

    let formatData = {
      id: data.id,
      status: data.status,
      product_name: data.product_name,
      short_description: data.short_description,
      category_id: data.category_id,
      specializations:
        typeof data.specializations === "string"
          ? data.specializations.split(",").map(item => {
              return parseInt(item, 10);
            })
          : data.specializations,
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
      gallery_images: data.product_images,
      tag_all: allStatus
    };

    setData(formatData); // set our formated obj to formik values
  };

  const [specializations, setSpecializations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

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
              <Breadcrumb.Item key="product-create">
                Update Product
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <UpdateProductFormWrapper
          auth={auth}
          categories={categories}
          specializations={specializations}
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
    currentProduct: state.productManagementReducer.currentProduct
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchSpecializations: fetchSpecializations
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateProductPage);
