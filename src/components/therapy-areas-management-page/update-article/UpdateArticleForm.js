import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Button, Row, Col, message, Icon, Spin, Tooltip } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  updateArticle,
  fetchCategories,
  fetchSubCategories,
  fetchSpecializations,
  changeArticleStatus,
  fetchCurrentArticle
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

import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  //specializations: Yup.string().required("This field is required"),
  short_details: Yup.string()
    .min(1, "Short descriptions too short")
    .max(150, "Short description is too long")
    .required("This field is required"),
  headline: Yup.string()
    .min(1, "Headline is too short")
    .max(150, "Headline is too long")
    .required("This field is required"),
  //zinc_code: Yup.string().required("This field is required"),
  page_title: Yup.string()
    .min(1, "Page title is too short")
    .max(60, "Page title is too long")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Meta description is too long")
    .required("This field is required"),
  body: Yup.string().required("This field is required"),
  zinc_code1: Yup.string().required("Required field"),
  zinc_code2: Yup.string().required("Required field"),
  zinc_code3: Yup.string().required("Required field")
});

const UpdateArticleForm = ({
  notifs,
  postManagement,
  fetchCategories,
  fetchSubCategories,
  fetchSpecializations,
  fetchCurrentArticle,
  updateArticle,
  currentArticle,
  changeArticleStatus,
  history,
  match,
  ...props
}) => {
  const [currentArticleId, setCurrentArticleId] = useState(match.params.id);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [featuredImageInfo, setfeaturedImageInfo] = useState("");
  const [mastheadImageInfo, setmastheadImageInfo] = useState("");
  const [thumbnailImageInfo, setthumbnailImageInfo] = useState("");

  const [loading, setLoading] = useState(false);

  const [statusOptions, setStatusOptions] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);

  // form data state values
  const [categoryId, setCategoryId] = useState("");
  const [subCategoryId, setSubCategoryId] = useState("");
  const [otherTags, setOtherTags] = useState([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [headline, setHeadline] = useState("");
  const [zincCode, setZincCode] = useState("");
  const [shortDetails, setShortDetails] = useState("");
  const [slug, setSlug] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("");
  const [zincode1, setZinCode1] = useState("");
  const [zincode2, setZincCode2] = useState("");
  const [zincode3, setZincCode3] = useState("");

  const [masthead, setMasthead] = useState("");
  const [featured, setFeatured] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchCurrentArticle(currentArticleId);
    fetchCategories();
    fetchSubCategories();
    fetchSpecializations();

    setStatusOptions([
      { id: "unpublished", name: "unpublished" },
      { id: "published", name: "published" },
      { id: "archived", name: "archived" }
    ]);

    return () => {
      //alert("Unmount update");
      //setLoading(false);
    };
    //eslint-disable-next-line
  }, []);

  const setComponentState = currentArticle => {
    console.log(currentArticle);

    const formatTag = currentArticle.other_tags
      ? currentArticle.other_tags.toString().split(",")
      : [];

    const formatSpecial = currentArticle.specializations
      ? currentArticle.specializations
          .toString()
          .split(",")
          .map(item => {
            return parseInt(item, 10);
          })
      : [];

    setCategoryId(currentArticle.category_id);
    setSubCategoryId(currentArticle.subcategory_id);

    setOtherTags(formatTag);

    setSelectedSpecializations(formatSpecial);
    setPageTitle(currentArticle.page_title);
    setHeadline(currentArticle.headline);
    //setZincCode(currentArticle.zinc_code);
    setShortDetails(currentArticle.short_details);
    setSlug(currentArticle.slug);
    setMetaDescription(currentArticle.meta_description);
    setMetaKeywords(currentArticle.meta_keywords);
    setBody(currentArticle.body);
    setStatus(currentArticle.status);
    setMasthead(currentArticle.masthead_image);
    setFeatured(currentArticle.featured_image);
    setThumbnail(currentArticle.thumbnail_image);

    // work on our zinc code
    const str = currentArticle.zinc_code.split("|");
    setZinCode1(str[0].trim());
    setZincCode2(str[1].trim());
    setZincCode3(str[2].trim());
  };

  useEffect(() => {
    if (currentArticle) {
      setTimeout(() => {
        setComponentState(currentArticle);
      }, 1000);
    }
  }, [currentArticle]);

  useEffect(() => {
    switch (notifs.id) {
      case "CHANGE_ARTICLE_STATUS_SUCCESS":
        setLoading(false);
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Article successfully publised"
        );
        break;
      case "CHANGE_ARTICLE_STATUS_FAILED":
        setLoading(false);
        message.error(
          notifs.notifications
            ? notifs.notifications.error
            : "There was an error on processing your request"
        );
        break;
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        setLoading(false);
        break;
      case "FETCH_SUBCATEGORIES_SUCCESS":
        setSubCategories(postManagement.subCategories.results);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
        break;
      case "UPDATE_ARTICLE_SUCCESS":
        message.success(notifs.notifications.success);
        fetchCurrentArticle(currentArticle.id);
        setLoading(false);
        break;
      case "UPDATE_ARTICLE_FAILED":
        message.error(
          notifs.notifications
            ? notifs.notifications
            : "There was an error on processing your request"
        );
        setLoading(false);
        break;
      default:
        return;
    }

    setIsDisabled(true);
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

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
    clearNotifications(); // clear our notifs
    action.setSubmitting(true);

    let formData = new FormData();

    formData.append("category_id", values.category_id);
    formData.append("subcategory_id", values.subcategory_id);
    formData.append("other_tags", values.other_tags);
    values.specializations.length === 0
      ? formData.append("specializations", null)
      : formData.append("specializations", values.specializations);
    formData.append("headline", values.headline);
    formData.append("short_details", values.short_details);
    formData.append(
      "zinc_code",
      `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`
    );
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug.replace(/\s+/g, "-").toLowerCase());
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("body", values.body);
    formData.append("_method", "PUT");

    // if theres an uploaded image include these field on our form data
    if (mastheadImageInfo) {
      formData.append("masthead", mastheadImageInfo);
      formData.append("featured", featuredImageInfo);
      formData.append("thumbnail", thumbnailImageInfo);
    }

    updateArticle(currentArticle.id, formData);
    action.setSubmitting(false);

    setComponentState(values);
  };

  const saveStatus = val => {
    setLoading(true);
    const id = currentArticle.id;
    const values = {
      status: val
    };
    changeArticleStatus(id, values); // redux action
  };

  return (
    <Spin spinning={loading}>
      <Row gutter={24} className="change-status-row">
        <Col>
          <Formik
            enableReinitialize={true}
            initialValues={{
              status: status
            }}
          >
            {props => (
              <Form>
                <label>Current status: </label>
                <SelectFormField
                  options={statusOptions}
                  name="status"
                  onChange={props.setFieldValue}
                  disabled={isDisabled}
                  style={{ width: 200 }}
                />

                {!isDisabled ? (
                  <div className="set-status-form-control">
                    <Button
                      type="primary"
                      onClick={() => {
                        saveStatus(props.values.status);
                      }}
                    >
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setIsDisabled(true);
                        props.values.status = currentArticle.status;
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="set-status-form-control">
                    <Button type="primary" onClick={() => setIsDisabled(false)}>
                      Change
                    </Button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
      <Formik
        enableReinitialize={true}
        initialValues={{
          status: status,
          category_id: categoryId,
          subcategory_id: subCategoryId,
          other_tags: otherTags,
          specializations: selectedSpecializations,
          headline: headline,
          short_details: shortDetails,
          //zinc_code: zincCode,
          page_title: pageTitle,
          meta_description: metaDescription,
          slug: slug,
          meta_keywords: metaKeywords ? metaKeywords : "",
          body: body,
          zinc_code1: zincode1,
          zinc_code2: zincode2,
          zinc_code3: zincode3,
          featured: featured,
          masthead: masthead,
          thumbnail: thumbnail
        }}
        onSubmit={submitForm}
        validationSchema={schema}
        validateOnChange={false}
        validateOnBlur={false}
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
                  requiredlabel="true"
                />
                <SelectFormField
                  options={subCategories}
                  label="Sub Category"
                  name="subcategory_id"
                  onChange={props.setFieldValue}
                  requiredlabel="true"
                />
                <TagsSuggestionFormField
                  placeholder={"Select a tag"}
                  label="Other tags"
                  name="other_tags"
                  onChange={props.setFieldValue}
                />
              </Col>
              <Col xs={24} md={7}>
                <SelectTagsFormField
                  options={specializations}
                  label="Specializations"
                  name="specializations"
                  onChange={props.setFieldValue}
                  requiredlabel="true"
                  placeholder="Please select a specialization"
                />
              </Col>
              <Col xs={24} md={9}>
                <TextFormField
                  name="short_details"
                  type="text"
                  label="Short Details"
                  requiredlabel="true"
                  placeholder="Enter a short detail"
                />
                <TextFormField
                  name="headline"
                  type="text"
                  label="Headline"
                  requiredlabel="true"
                  placeholder="Enter a headline"
                />
                <label
                  style={{
                    display: "block",
                    margin: "15px 0"
                  }}
                >
                  <span>Zinc Code </span>{" "}
                  <Tooltip placement="top" title={sampleZincFormat}>
                    <Icon type="info-circle" style={{ color: "#1890ff" }} />
                  </Tooltip>
                </label>
                <ZincCodeFormField
                  className="zinc-code-field1"
                  name="zinc_code1"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="AAAA.AAA.11.11.11"
                  size="small"
                />
                <ZincCodeFormField
                  className="zinc-code-field2"
                  name="zinc_code2"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="Version 1.1"
                  size="small"
                />
                <ZincCodeFormField
                  className="zinc-code-field3"
                  name="zinc_code3"
                  type="text"
                  onChange={props.setFieldValue}
                  maskValidation="11 A** 1111"
                  size="small"
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
                  requiredlabel="true"
                  placeholder="Enter a page title"
                />
                <TextFormField
                  name="meta_description"
                  type="text"
                  label="Meta Description"
                  requiredlabel="true"
                  placeholder="Enter a meta description"
                />
              </Col>

              <Col xs={24} md={12}>
                <TextFormField
                  name="slug"
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
            <Row gutter={24} className="form-section last">
              <Col xs={24} md={8}>
                <h3>Feature Image</h3>
                <ImageUploader getImage={getImage} />
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

            {/* <Row>
                            <DisplayFormikState {...props} />
                        </Row> */}

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
    </Spin>
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
    notifs: state.notificationReducer,
    currentArticle: state.postManagementReducer.currentArticle
  };
};

export default connect(
  mapStateToProps,
  {
    updateArticle,
    fetchSpecializations,
    fetchCategories,
    fetchSubCategories,
    fetchCurrentArticle,
    changeArticleStatus
  }
)(UpdateArticleForm);
