import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Button, Row, Col, message, Icon, Tooltip } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  createArticle,
  fetchCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import ZincCodeFormField from "../../smart-form/ZincCodeFormField";

// Other components
import ImageUploader from "./ImageUploader";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  //specializations: Yup.string().required("This field is required"),
  short_details: Yup.string()
    .min(2, "Description is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  headline: Yup.string()
    .min(2, "Title is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  zinc_code: Yup.string().required("This field is required"),
  page_title: Yup.string()
    .min(2, "Title is too short")
    .max(60, "Page title is too long")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Meta description is too long")
    .required("This field is required"),
  body: Yup.string().required("This field is required")
});

// sample format tooltip text
const sampleZincFormat =
  "Sample format: SAPH.TJO.19.05.0200 | Version 2.5 | 30 May 2019";

const UpdateArticleForm = ({
  notifs,
  postManagement,
  fetchCategories,
  fetchSpecializations,
  createArticle,
  history,
  data,
  ...props
}) => {
  const [categories, setCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [mastheadImageInfo, setmastheadImageInfo] = useState("");
  const [featuredImageInfo, setfeaturedImageInfo] = useState("");
  const [thumbnailImageInfo, setthumbnailImageInfo] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
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
        message.error(
          notifs.notifications
            ? notifs.notifications
            : "There was an error on processing your request"
        );
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id]);

  // get the file
  const getImage = (name, file) => {
    console.log(file);
    console.log(name);
    if (name === "masthead") {
      setmastheadImageInfo(file);
    }
    if (name === "featured") {
      setfeaturedImageInfo(file);
    }
    if (name === "thumbnail") {
      setthumbnailImageInfo(file);
    }
  };

  const submitForm = (values, action) => {
    action.setSubmitting(true);
    let formData = new FormData();
    formData.set("category_id", values.category_id);
    formData.set("other_tags", values.other_tags);
    values.specializations.length === 0
      ? formData.set("specializations", null)
      : formData.set("specializations", values.specializations);
    formData.set("headline", values.headline);
    formData.set("short_details", values.short_details);
    formData.set("zinc_code", values.zinc_code);
    formData.set("page_title", values.page_title);
    formData.set("meta_description", values.meta_description);
    formData.set("page_slug", values.page_slug);
    formData.set("meta_keywords", values.meta_keywords);
    formData.set("body", values.body);

    //if theres an uploaded image include these field on our form data
    if (values.masthead) {
      formData.set("masthead", mastheadImageInfo);
      formData.set("featured", featuredImageInfo);
      formData.set("thumbnail", thumbnailImageInfo);
    }

    createArticle(formData);
    action.setSubmitting(false);
    action.resetForm(); // rest form action if success
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
          <Form className="therapy-article-form">
            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
              <Col xs={24} md={8}>
                <SelectFormField
                  options={categories}
                  label="Category"
                  name="category_id"
                  onChange={props.setFieldValue}
                  isRequired={true}
                />
                <TagsSuggestionFormField
                  placeholder={"Select a tag"}
                  label="Other tags"
                  name="other_tags"
                  onChange={props.setFieldValue}
                  isRequired={false}
                />
              </Col>
              <Col xs={24} md={8}>
                <SelectTagsFormField
                  options={specializations}
                  label="Specializations"
                  name="specializations"
                  onChange={props.setFieldValue}
                  isRequired={false}
                  placeholder="Please select a specialization"
                />
              </Col>
              <Col xs={24} md={8}>
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

                <ZincCodeFormField
                  className="zinc-code-field"
                  name="zinc_code"
                  type="text"
                  onChange={props.setFieldValue}
                  label={
                    <div>
                      <span>Zinc Code </span>{" "}
                      <Tooltip placement="top" title={sampleZincFormat}>
                        <Icon type="info-circle" style={{ color: "#1890ff" }} />
                      </Tooltip>
                    </div>
                  }
                  isRequired={true}
                  placeholder="Enter a zinc code"
                />
              </Col>
            </Row>

            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Optimization</h3>
              <Col xs={24} md={12}>
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

              <Col xs={24} md={12}>
                <TextFormField
                  name="page_slug"
                  type="text"
                  label="Page Slug(Optional - system will generate if empty"
                  placeholder="Enter a page slug"
                  isRequired={false}
                />
                <TextFormField
                  name="meta_keywords"
                  type="text"
                  label="Meta Keywords(Optional)"
                  placeholder="Enter meta keywords"
                  isRequired={false}
                />
              </Col>
            </Row>

            {/* 3nd row */}
            <Row gutter={24} className="form-section last">
              <Col xs={24} md={8}>
                <h3>Feature Image</h3>
                <ImageUploader getImage={getImage} />
                {/* <ThumbnailGenerator getImages={getImages} /> */}
              </Col>
              <Col xs={24} md={16}>
                <h3>Article Body</h3>
                <Field name="body">
                  {({ field, form: { touched, errors }, meta }) => (
                    <div
                      className={
                        meta.touched && meta.error
                          ? "has-feedback has-error ant-form-item-control"
                          : "ant-form-item-control"
                      }
                    >
                      <ReactQuill
                        theme="snow"
                        placeholder="Write something..."
                        modules={UpdateArticleForm.modules}
                        formats={UpdateArticleForm.formats}
                        value={field.value}
                        onChange={field.onChange(field.name)}
                      />
                      {meta.touched && meta.error ? (
                        <div className="ant-form-explain">{meta.error}</div>
                      ) : null}
                    </div>
                  )}
                </Field>
              </Col>
            </Row>

            <Row>
              <DisplayFormikState {...props} />
            </Row>

            <div className="form-actions">
              <Button style={{ marginRight: 10 }}>
                <Link to="/therapy-areas">Cancel</Link>
              </Button>
              <Button htmlType="submit" type="primary">
                Save
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
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  { createArticle, fetchSpecializations, fetchCategories }
)(UpdateArticleForm);
