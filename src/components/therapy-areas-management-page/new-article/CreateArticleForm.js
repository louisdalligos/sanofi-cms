import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form } from "formik";
import { Button, Row, Col, message, Icon, Tooltip, Checkbox } from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";

// redux actions
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
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";
import TextAreaFormField from "../../smart-form/TextAreaFormField";

// Other components
import ImageUploader from "../../smart-components/ImageUploader";

import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  subcategory_id: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  other_tags: Yup.string().required("This field is required"),
  short_details: Yup.string()
    .max(1000, "Maximum of 1000 characters allowed only")
    .required("This field is required"),
  headline: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),
  zinc_code: Yup.string()
    .required("This field is required")
    .max(150, "Maximum of 150 characters allowed only"),
  page_title: Yup.string()
    .max(60, "Maximum of 60 characters allowed only")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Maximum of 150 characters allowed only")
    .required("This field is required"),
  body: Yup.string().required("This field is required"),
  featured: Yup.string().required("This field is required")
  // zinc_code1: Yup.string()
  //     .required("Required field")
  //     .matches(
  //         /[A-Z]{4}.[A-Z]{3}.[0-9]{2}.[0-9]{2}.[0-9]{4}/,
  //         "Please complete the code"
  //     ),
  // zinc_code2: Yup.string()
  //     .required("Required field")
  //     .matches(/[0-9]{1}.[0-9]{1}/, "Please complete version"),
  // zinc_code3: Yup.string()
  //     .required("Required field")
  //     .matches(
  //         /[0-9]{2}[ ][A-Z]{1}[a-z]{1}[a-z]{1}[ ][0-9]{4}/,
  //         "Please complete the date"
  //     )
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

  const [mastheadImageInfo, setmastheadImageInfo] = useState("");
  const [featuredImageInfo, setfeaturedImageInfo] = useState("");
  const [thumbnailImageInfo, setthumbnailImageInfo] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
    fetchSpecializations();
    //eslint-disable-next-line
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
        message.success(notifs.notifications.success);
        history.push("/therapy-areas");
        break;
      case "CREATE_ARTICLE_FAILED":
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
    console.log(values);
    action.setSubmitting(true);
    let formData = new FormData();

    formData.set("category_id", values.category_id);
    formData.set("subcategory_id", values.subcategory_id);
    formData.set("other_tags", values.other_tags);
    values.tag_all === true
      ? formData.set("specializations", 0)
      : formData.set("specializations", values.specializations);
    formData.set("headline", values.headline);
    formData.set("short_details", values.short_details);
    formData.set("zinc_code", values.zinc_code);
    // formData.append(
    //     "zinc_code",
    //     `${values.zinc_code1} | Version ${values.zinc_code2} | ${values.zinc_code3}`
    // );
    formData.set("page_title", values.page_title);
    formData.set("meta_description", values.meta_description);
    formData.set("slug", values.slug);
    formData.set("meta_keywords", values.meta_keywords);
    formData.set("body", values.body);

    //if theres an uploaded image include these field on our form data
    if (values.masthead instanceof Blob) {
      formData.append("masthead", values.masthead);
      formData.append("featured", values.featured);
      formData.append("thumbnail", values.thumbnail);
    }

    createArticle(formData);
    action.setSubmitting(false);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={data}
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
                  requiredlabel="true"
                />
              </Col>
              <Col xs={24} md={7}>
                <SelectTagsFormField
                  // create
                  options={specializations}
                  label="Specializations"
                  name="specializations"
                  onChange={props.setFieldValue}
                  requiredlabel="true"
                  placeholder="Please select a specialization"
                />
              </Col>
              <Col xs={24} md={9}>
                <TextAreaFormField
                  name="headline"
                  type="text"
                  label="Article Name"
                  requiredlabel="true"
                  placeholder="Enter an article name"
                  onChange={props.setFieldValue}
                  maxCountAllowed={100}
                  rows={1}
                />
                <TextAreaFormField
                  name="short_details"
                  type="text"
                  label="Article Description"
                  requiredlabel="true"
                  placeholder="Enter an article description"
                  onChange={props.setFieldValue}
                  maxCountAllowed={1000}
                  rows={4}
                />
                <label
                  style={{
                    display: "block",
                    margin: "15px 0"
                  }}
                >
                  <span className="ant-form-item-required">Zinc Code </span>
                  <Tooltip placement="top" title={sampleZincFormat}>
                    <Icon type="info-circle" style={{ color: "#1890ff" }} />
                  </Tooltip>
                </label>
                <TextFormField
                  name="zinc_code"
                  type="text"
                  size="small"
                  placeholder="Enter the zinc code"
                  onChange={props.setFieldValue}
                  maxCountAllowed={150}
                />
                {/* <ZincCodeFormField
                                    className="zinc-code-field1"
                                    name="zinc_code1"
                                    type="text"
                                    onChange={props.setFieldValue}
                                    maskValidation="AAAA.AAA.11.11.1111"
                                    size="small"
                                />
                                <ZincCodeFormField
                                    className="zinc-code-field2"
                                    name="zinc_code2"
                                    type="text"
                                    onChange={props.setFieldValue}
                                    maskValidation="1.1"
                                    size="small"
                                    inlineLabel="Version"
                                />
                                <ZincCodeFormField
                                    className="zinc-code-field3"
                                    name="zinc_code3"
                                    type="text"
                                    onChange={props.setFieldValue}
                                    maskValidation="11 A** 1111"
                                    size="small"
                                /> */}
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
                  onChange={props.setFieldValue}
                  maxCountAllowed={60}
                />
                <TextAreaFormField
                  name="meta_description"
                  type="text"
                  label="Meta Description"
                  requiredlabel="true"
                  placeholder="Enter a meta description"
                  onChange={props.setFieldValue}
                  maxCountAllowed={150}
                  rows={4}
                />
              </Col>

              <Col xs={24} md={12}>
                <TextFormField
                  name="slug"
                  type="text"
                  label="Page Slug(Optional - system will generate if empty"
                  placeholder="Enter a page slug"
                  onChange={props.setFieldValue}
                />
                <TextFormField
                  name="meta_keywords"
                  type="text"
                  label="Meta Keywords(Optional)"
                  placeholder="Enter meta keywords"
                  onChange={props.setFieldValue}
                />
              </Col>
            </Row>

            {/* 3nd row */}
            <Row gutter={24} className="form-section last">
              <Col xs={24} md={8}>
                <div>
                  <h3 className="ant-form-item-required">
                    Feature Image <small>(required)</small>
                  </h3>
                  <ImageUploader isOnEditMode={false} name="featured" />
                </div>
              </Col>
              <Col xs={24} md={16}>
                <h3 className="ant-form-item-required">Article Body</h3>
                <Field
                  as={TextEditorFormField}
                  name="body"
                  values={props.values.body}
                  onChange={props.setFieldValue}
                />
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
          </Form>
        )}
      </Formik>
    </>
  );
};

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
