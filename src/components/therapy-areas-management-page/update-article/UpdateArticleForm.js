import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, withFormik } from "formik";
import { Button, Row, Col, message, Icon, Spin, Tooltip } from "antd";
import * as Yup from "yup";
import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  updateArticle,
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
import TextEditorFormField from "../../smart-form/TextEditorFormField";

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
  fetchCurrentArticle,
  updateArticle,
  currentArticle,
  changeArticleStatus,
  ...props
}) => {
  // article Id
  const [currentArticleId, setCurrentArticleId] = useState(
    props.match.params.id
  );

  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fetch data state
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "unpublished" },
    { id: "published", name: "published" },
    { id: "archived", name: "archived" }
  ]);

  useEffect(() => {
    setLoading(true);
    fetchCurrentArticle(currentArticleId);

    setSpecializationOptions(
      props.postManagement.specializations
        ? props.postManagement.specializations
        : []
    );
    setCategoryOptions(
      props.postManagement.categories
        ? props.postManagement.categories.results
        : []
    );
    setSubCategoryOptions(
      props.postManagement.subCategories
        ? props.postManagement.subCategories.results
        : []
    );

    return () => {
      console.log("unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentArticle) {
      props.getData(currentArticle); // pass our data to parent for it to set the initial values of formik

      setLoading(false);
    }

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentArticle]);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_CURRENT_ARTICLE_SUCCESS":
        setLoading(false);
        break;
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
              status: props.values.status
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

      <form className="therapy-article-form" onSubmit={props.handleSubmit}>
        <Row gutter={24} className="form-section">
          <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
          <Col xs={24} md={8}>
            <SelectFormField
              options={categoryOptions}
              label="Category"
              name="category_id"
              onChange={props.setFieldValue}
              requiredlabel="true"
              values={props.values.category_id}
            />
            <SelectFormField
              options={subCategoryOptions}
              label="Sub Category"
              name="subcategory_id"
              onChange={props.setFieldValue}
              requiredlabel="true"
              values={props.values.subcategory_id}
            />
            <TagsSuggestionFormField
              placeholder={"Select a tag"}
              label="Other tags"
              name="other_tags"
              onChange={props.setFieldValue}
              values={props.values.other_tags}
            />
          </Col>
          <Col xs={24} md={7}>
            <SelectTagsFormField
              options={specializationOptions}
              label="Specializations"
              name="specializations"
              onChange={props.setFieldValue}
              requiredlabel="true"
              placeholder="Please select a specialization"
              values={props.values.specializations}
            />
          </Col>
          <Col xs={24} md={9}>
            <TextFormField
              name="headline"
              type="text"
              label="Headline"
              requiredlabel="true"
              placeholder="Enter a headline"
              values={props.values.headline}
            />
            <TextFormField
              name="short_details"
              type="text"
              label="Short Details"
              requiredlabel="true"
              placeholder="Enter a short detail"
              values={props.values.short_details}
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
              values={props.values.page_title}
            />
            <TextFormField
              name="meta_description"
              type="text"
              label="Meta Description"
              requiredlabel="true"
              placeholder="Enter a meta description"
              values={props.values.meta_description}
            />
          </Col>

          <Col xs={24} md={12}>
            <TextFormField
              name="slug"
              type="text"
              label="Page Slug(Optional - system will generate if empty"
              placeholder="Enter a page slug"
              values={props.values.slug}
            />
            <TextFormField
              name="meta_keywords"
              type="text"
              label="Meta Keywords(Optional)"
              placeholder="Enter meta keywords"
              values={props.values.meta_keywords}
            />
          </Col>
        </Row>

        {/* 3nd row */}
        <Row gutter={24} className="form-section last">
          <Col xs={24} md={8}>
            <h3>Feature Image</h3>
            <ImageUploader />
          </Col>
          <Col xs={24} md={16}>
            <h3>Article Body</h3>
            <Field
              as={TextEditorFormField}
              name="body"
              values={props.values.body}
            />
          </Col>
        </Row>

        <Row>
          <DisplayFormikState {...props.values} />
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
          navigate={path => props.history.push(path)}
          shouldBlockNavigation={location => (props.dirty ? true : false)}
        />
      </form>
    </Spin>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values);
  },
  displayName: "UpdateArticleForm"
})(UpdateArticleForm);

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    currentArticle: state.postManagementReducer.currentArticle,
    postManagement: state.postManagementReducer
  };
};

const UpdateArticleFormWrapper = connect(
  mapStateToProps,
  { updateArticle, fetchCurrentArticle, changeArticleStatus }
)(formikEnhancer);

export default UpdateArticleFormWrapper;
