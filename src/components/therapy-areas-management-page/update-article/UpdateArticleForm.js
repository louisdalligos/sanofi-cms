import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { message } from "antd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
//import Thumb from "./Thumb";
//import RichTextEditor from "./RichTextEditor";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
//import ImageUploader from "./ImageUploader";

import { Row, Col, Button, PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../../main-navigation/Navbar";
import CategorySelect from "./CategorySelect";
import SpecializationSelect from "./SpecializationSelect";

import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  updateArticle,
  fetchCurrentArticle
} from "../../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Update article";

const ArticleSchema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  short_details: Yup.string()
    .min(2, "Description is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  headline: Yup.string()
    .min(2, "Title is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  zinc_code: Yup.number()
    .positive("Positive numbers only")
    .required("This field is required"),
  page_title: Yup.string()
    .min(2, "Title is too short")
    .max(60, "Page title is too long")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Meta description is too long")
    .required("This field is required")
  //text_editor: Yup.string().required("This field is required")
});

// Component
const UpdateArticleForm = ({
  categoryData,
  subCategoryData,
  updateArticle,
  fetchCurrentArticle,
  currentArticle,
  notifs,
  postManagement,
  history,
  match,
  ...props
}) => {
  const [currentArticleId, setCurrentArticleId] = useState(match.params.id);
  const [articleTitle, setArticleTitle] = useState(null);
  const [isDirty, setIsDirty] = useState(true);

  useEffect(() => {
    console.log("component mounted");
    console.log(currentArticleId);
    fetchCurrentArticle(currentArticleId);
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_CURRENT_ARTICLE_SUCCESS":
        setArticleTitle(currentArticle.page_title);
        break;
      case "CREATE_ARTICLE_SUCCESS":
        message.success(notifs.notifications.success);
        break;
      case "CREATE_ARTICLE_FAILED":
        message.error(notifs.notifications.error);
        break;
      default:
        return;
    }
    // eslint-disable-next-line
  }, [notifs.div]);

  const normFile = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleCancel = () => {
    console.log("cancel action");
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
                Update Article
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <Button type="primary">
              <Link to="/therapy-areas">Back to articles</Link>
            </Button>
          </div>
        </div>

        <Formik
          initialValues={{
            page_title: `${articleTitle}`,
            short_details: "",
            headline: "",
            zinc_code: "",
            page_slug: "",
            meta_description: "",
            thumbnail_image: {},
            masthead_image: {},
            featured_image: {},
            specializations: "",
            category_id: "",
            subcategory_id: "",
            body: ""
          }}
          validationSchema={ArticleSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            updateArticle(values);
          }}
        >
          {({ errors, touched, setFieldValue, setFieldTouched }) => (
            <Form className="create-article-form">
              <Row gutter={16} className="form-section">
                <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
                <Col span={8}>
                  <CategorySelect
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.category_id}
                    touched={touched.category_id}
                    data={categoryData.results}
                    label="Category"
                    name="category_id"
                  />

                  <CategorySelect
                    onChange={setFieldValue}
                    onBlur={setFieldTouched}
                    error={errors.subcategory_id}
                    touched={touched.subcategory_id}
                    data={subCategoryData.results}
                    label="Subcategory"
                    name="subcategory_id"
                  />
                </Col>
                <Col span={8}>
                  <Field name="specializations" className="ant-input" />
                  {/* <SpecializationSelect
                                        name="specializations"
                                        onChange={setFieldValue}
                                        onBlur={setFieldTouched}
                                        error={errors.specializations}
                                        touched={touched.specializations}
                                        data={categoryData.results}
                                    /> */}
                </Col>
                <Col span={8}>
                  <div
                    className={
                      errors.short_details && touched.short_details
                        ? "has-feedback has-error ant-form-item-control"
                        : "ant-form-item-control"
                    }
                  >
                    <label>Short Description</label>
                    <Field name="short_details" className="ant-input" />
                    {errors.short_details && touched.short_details ? (
                      <div className="ant-form-explain">
                        {errors.short_details}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={
                      errors.headline && touched.headline
                        ? "has-feedback has-error ant-form-item-control"
                        : "ant-form-item-control"
                    }
                  >
                    <label>Headline</label>
                    <Field name="headline" className="ant-input" />
                    {errors.headline && touched.headline ? (
                      <div className="ant-form-explain">{errors.headline}</div>
                    ) : null}
                  </div>

                  <div
                    className={
                      errors.zinc_code && touched.zinc_code
                        ? "has-feedback has-error ant-form-item-control"
                        : "ant-form-item-control"
                    }
                  >
                    <label>Zinc Code</label>
                    <Field name="zinc_code" className="ant-input" />
                    {errors.zinc_code && touched.zinc_code ? (
                      <div className="ant-form-explain">{errors.zinc_code}</div>
                    ) : null}
                  </div>
                </Col>
              </Row>

              {/* 2nd row */}
              <Row gutter={16} className="form-section">
                <h3 style={{ marginLeft: 10 }}>Page Optimization</h3>
                <Col span={12}>
                  <div
                    className={
                      errors.page_title && touched.page_title
                        ? "has-feedback has-error ant-form-item-control"
                        : "ant-form-item-control"
                    }
                  >
                    <label>Page Title</label>
                    <Field name="page_title" className="ant-input" />
                    {errors.page_title && touched.page_title ? (
                      <div className="ant-form-explain">
                        {errors.page_title}
                      </div>
                    ) : null}
                  </div>

                  <div
                    className={
                      errors.meta_description && touched.meta_description
                        ? "has-feedback has-error ant-form-item-control"
                        : "ant-form-item-control"
                    }
                  >
                    <label>Meta Description</label>
                    <Field
                      name="meta_description"
                      className="ant-input"
                      component="textarea"
                      rows="2"
                    />
                    {errors.meta_description && touched.meta_description ? (
                      <div className="ant-form-explain">
                        {errors.meta_description}
                      </div>
                    ) : null}
                  </div>
                </Col>

                <Col span={12}>
                  <div className="ant-form-item-control">
                    <label>
                      Page Slug(Optional - system will generate if empty
                    </label>
                    <Field name="page_slug" className="ant-input" />
                  </div>

                  <div className="ant-form-item-control">
                    <label>Meta Keywords(Optional)</label>
                    <Field
                      name="meta_keywords"
                      className="ant-input"
                      component="textarea"
                      rows="2"
                    />
                  </div>
                </Col>
              </Row>

              {/* 3nd row */}
              <Row gutter={16} className="form-section last">
                <Col span={8}>
                  <h3>Feature Image</h3>

                  {/* <ImageUploader /> */}
                </Col>
                <Col span={16}>
                  <h3>Article Body</h3>

                  <Field name="body">
                    {({ field }) => (
                      <ReactQuill
                        theme="snow"
                        placeholder="Write something..."
                        modules={UpdateArticleForm.modules}
                        formats={UpdateArticleForm.formats}
                        value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                    )}
                  </Field>
                </Col>
              </Row>

              <div className="form-actions">
                <Button
                  type="secondary"
                  style={{ marginRight: 10 }}
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  htmlType="submit"
                  type="primary"
                  loading={postManagement.requestInProgress}
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <RouteLeavingGuard
        when={isDirty}
        navigate={path => history.push(path)}
        shouldBlockNavigation={location => {
          if (isDirty) {
            if (location.pathname === "signup") {
              return false;
            }
          }
          return true;
        }}
      />
    </Fragment>
  );
};

UpdateArticleForm.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image", "video"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};

UpdateArticleForm.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video"
];

const mapStateToProps = state => {
  return {
    postManagement: state.postManagementReducer,
    categoryData: state.postManagementReducer.categories,
    subCategoryData: state.postManagementReducer.subCategories,
    currentArticle: state.postManagementReducer.currentArticle,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { updateArticle, fetchCurrentArticle }
)(UpdateArticleForm);
