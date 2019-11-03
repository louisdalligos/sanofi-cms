import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Formik, Field, Form } from "formik";
import { Button, Row, Col, message } from "antd";
import ReactQuill from "react-quill";
import * as Yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

import {
  createArticle,
  fetchCategories,
  fetchSubCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  specializations: Yup.array().required("This field is required"),
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
    .required("This field is required"),
  body: Yup.string().required("This field is required")
});

const CreateArticleForm = ({
  notifs,
  postManagement,
  fetchCategories,
  fetchSubCategories,
  fetchSpecializations,
  createArticle,
  history,
  data,
  ...props
}) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchSpecializations();
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        break;
      case "FETCH_SUBCATEGORIES_SUCCESS":
        setSubCategories(postManagement.subCategories.results);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
        break;
      case "CREATE_ARTICLE_SUCCESS":
        clearNotifications();
        message.success(notifs.notifications.success);
        break;
      case "CREATE_ARTICLE_FAILED":
        clearNotifications();
        message.error(notifs.notifications);
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id]);

  const submitForm = (values, action) => {
    console.log(values);
    createArticle(values);
    action.setSubmitting(false);
    //action.resetForm(); // rest form action
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={data}
        onSubmit={submitForm}
        validationSchema={schema}
      >
        {props => (
          <Form className="create-article-form">
            <Row gutter={16} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
              <Col span={8}>
                <SelectFormField
                  options={categories}
                  label="Category"
                  name="category_id"
                  onChange={props.setFieldValue}
                  isRequired={true}
                />
                <SelectFormField
                  options={subCategories}
                  label="Sub Category"
                  name="subcategory_id"
                  onChange={props.setFieldValue}
                  isRequired={true}
                />
              </Col>
              <Col span={8}>
                <SelectTagsFormField
                  options={specializations}
                  label="Specializations"
                  name="specializations"
                  onChange={props.setFieldValue}
                  isRequired={true}
                  placeholder="Please select a specialization"
                />
              </Col>
              <Col span={8}>
                <TextFormField
                  name="short_details"
                  type="text"
                  label="Short Details"
                  isRequired={true}
                  placeholder="Enter a short detail"
                />
                <TextFormField
                  name="headline"
                  type="text"
                  label="Headline"
                  isRequired={true}
                  placeholder="Enter a headline"
                />
                <TextFormField
                  name="zinc_code"
                  type="text"
                  label="Zinc Code"
                  isRequired={true}
                  placeholder="Enter a zinc code"
                />
              </Col>
            </Row>

            <Row gutter={16} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Optimization</h3>
              <Col span={12}>
                <TextFormField
                  name="page_title"
                  type="text"
                  label="Page Title"
                  isRequired={true}
                  placeholder="Enter a page title"
                />
                <TextFormField
                  name="meta_description"
                  type="text"
                  label="Meta Description"
                  isRequired={true}
                  placeholder="Enter a meta description"
                />
              </Col>

              <Col span={12}>
                <TextFormField
                  name="page_slug"
                  type="text"
                  label="Page Slug(Optional - system will generate if empty"
                  placeholder="Enter a page slug"
                />
                <TextFormField
                  name="meta_keywords"
                  type="text"
                  label="Meta Keywords(Optional)"
                  placeholder="Enter meta keywords"
                />
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
                      modules={CreateArticleForm.modules}
                      formats={CreateArticleForm.formats}
                      value={field.value}
                      onChange={field.onChange(field.name)}
                    />
                  )}
                </Field>
              </Col>
            </Row>

            <Row>
              <DisplayFormikState {...props} />
            </Row>

            <div className="form-actions">
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </div>

            <RouteLeavingGuard
              when={props.dirty}
              navigate={path => history.push(path)}
              shouldBlockNavigation={location => (props.dirty ? true : false)}
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

CreateArticleForm.modules = {
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

CreateArticleForm.formats = [
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
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { createArticle, fetchSpecializations, fetchCategories, fetchSubCategories }
)(CreateArticleForm);
