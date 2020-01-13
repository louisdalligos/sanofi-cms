import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Formik, Field, Form, withFormik } from "formik";
import { Button, Row, Col, message, Icon, Spin, Tooltip } from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

// redux actions
import {
  updateArticle,
  changeArticleStatus,
  fetchCurrentArticle,
  setStatusChangeFormDisable
} from "../../../redux/actions/post-management-actions/postManagementActions";

import { setFormDirty } from "../../../redux/actions/form-actions/formActions";

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
  short_details: Yup.string()
    .max(1000, "Maximum of 1000 characters allowed only")
    .required("This field is required"),
  headline: Yup.string()
    .max(150, "Maximum of 100 characters allowed only")
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
});

const UpdateArticleForm = ({
  notifs,
  fetchCurrentArticle,
  updateArticle,
  currentArticle,
  changeArticleStatus,
  isFormDirty,
  loading,
  statusChangeFormDisable,
  setStatusChangeFormDisable,
  setFormDirty,
  ...props
}) => {
  const { resetForm } = props;

  // article Id
  const [currentArticleId, setCurrentArticleId] = useState(
    props.match.params.id
  );

  // Fetch data state
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [subCategoryOptions, setSubCategoryOptions] = useState([]);
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "Unpublished" },
    { id: "published", name: "Published" },
    { id: "archived", name: "Archived" }
  ]);

  useEffect(() => {
    console.log(isFormDirty, "IS FORM DIRTY?");
  }, [isFormDirty]);

  useEffect(() => {
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

    // set our form
    setFormDirty(false);

    return () => {
      console.log("unmount -------->");
      setFormDirty(false);
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentArticle) {
      const shapeData = {
        ...currentArticle,
        specializations: props.specializations.map(item => {
          return item.id;
        }),
        tag_all: true
      };

      props.getData(
        currentArticle.specializations === "0" ? shapeData : currentArticle
      ); // pass our data to parent for it to set the initial values of formik
    }

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentArticle]);

  useEffect(() => {
    switch (notifs.id) {
      case "UPDATE_ARTICLE_SUCCESS":
        resetForm();
        message.success(notifs.notifications.success);
        fetchCurrentArticle(currentArticle.id);
        props.history.push("/therapy-areas");
        break;
      case "UPDATE_ARTICLE_FAILED":
        message.error(
          notifs.notifications
            ? notifs.notifications.message
            : "There was an error on processing your request"
        );
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  const saveStatus = val => {
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
            validateOnChange={false}
            validateOnBlur={false}
          >
            {props => (
              <Form>
                <label>Current status: </label>
                <SelectFormField
                  options={statusOptions}
                  name="status"
                  onChange={props.setFieldValue}
                  disabled={statusChangeFormDisable}
                  style={{ width: 200 }}
                />

                {!statusChangeFormDisable ? (
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
                        setStatusChangeFormDisable(true);
                        props.values.status = currentArticle.status;
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <div className="set-status-form-control">
                    <Button
                      type="primary"
                      onClick={() => setStatusChangeFormDisable(false)}
                    >
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
              options={props.categories}
              label="Category"
              name="category_id"
              onChange={props.setFieldValue}
              requiredlabel="true"
              values={props.values.category_id}
            />
            <SelectFormField
              options={props.subCategories}
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
              requiredlabel="true"
            />
          </Col>
          <Col xs={24} md={7}>
            <SelectTagsFormField
              rawSpecialization={
                (currentArticle && currentArticle.specializations) || null
              }
              options={props.specializations}
              label="Specializations"
              name="specializations"
              onChange={props.setFieldValue}
              requiredlabel="true"
              placeholder="Please select a specialization"
              values={props.values.specializations}
              allSelected={props.values.tag_all}
              onEditMode={true}
            />
          </Col>
          <Col xs={24} md={9}>
            <TextAreaFormField
              name="headline"
              type="text"
              label="Article Name"
              requiredlabel="true"
              placeholder="Enter an article name"
              values={props.values.headline}
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
              values={props.values.short_details}
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
              <span className="ant-form-item-required">Zinc Code </span>{" "}
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
              onChange={props.setFieldValue}
              maxCountAllowed={60}
            />
            <TextAreaFormField
              name="meta_description"
              type="text"
              label="Meta Description"
              requiredlabel="true"
              placeholder="Enter a meta description"
              values={props.values.meta_description}
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
              values={props.values.slug}
              onChange={props.setFieldValue}
            />
            <TextFormField
              name="meta_keywords"
              type="text"
              label="Meta Keywords(Optional)"
              placeholder="Enter meta keywords"
              values={props.values.meta_keywords}
              onChange={props.setFieldValue}
            />
          </Col>
        </Row>

        {/* 3nd row */}
        <Row gutter={24} className="form-section last">
          <Col xs={24} md={8}>
            <h3 className="ant-form-item-required">
              Feature Image <small>(required)</small>
            </h3>
            <ImageUploader isOnEditMode={true} name="featured" />
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
                    <DisplayFormikState {...props.values} />
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
          when={isFormDirty}
          navigate={path => props.history.push(path)}
          shouldBlockNavigation={location => (isFormDirty ? true : false)}
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
    let formData = new FormData();

    formData.append("category_id", values.category_id);
    formData.append("subcategory_id", values.subcategory_id);
    formData.append("other_tags", values.other_tags);
    formData.append(
      "specializations",
      values.tag_all ? 0 : values.specializations
    );
    formData.append("headline", values.headline);
    formData.append("short_details", values.short_details);
    formData.append("zinc_code", values.zinc_code);
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug);
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("body", values.body);
    formData.append("_method", "PUT");

    //if theres an uploaded image include these field on our form data
    if (values.masthead instanceof Blob) {
      formData.append("masthead", values.masthead);
      formData.append("featured", values.featured);
      formData.append("thumbnail", values.thumbnail);
    }

    props.updateArticle(props.currentArticle.id, formData);
  },
  displayName: "UpdateArticleForm"
})(UpdateArticleForm);

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    currentArticle: state.postManagementReducer.currentArticle,
    postManagement: state.postManagementReducer,
    loading: state.postManagementReducer.requestInProgress,
    isFormDirty: state.formReducer.isFormDirty,
    statusChangeFormDisable: state.postManagementReducer.statusChangeFormDisable
  };
};

const UpdateArticleFormWrapper = connect(
  mapStateToProps,
  {
    updateArticle,
    fetchCurrentArticle,
    changeArticleStatus,
    setStatusChangeFormDisable,
    setFormDirty
  }
)(formikEnhancer);

export default UpdateArticleFormWrapper;
