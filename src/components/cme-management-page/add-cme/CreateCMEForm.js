import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { Button, Row, Col, Tooltip, Icon, message, Tabs } from "antd";
import * as Yup from "yup";
// import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

import axios from "axios";
import { API } from "../../../utils/api";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import ZincCodeFormField from "../../smart-form/ZincCodeFormField";
import DatePickerFormField from "../../smart-form/DatePickerFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";

// Other components
import ImageUploader from "./ImageUploader";

// utils
import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  event_name: Yup.string()
    .required("This field is required")
    .max(60, "Event name is too long"),
  event_description: Yup.string()
    .required("This field is required")
    .max(150, "Event description is too long"),
  event_date: Yup.string().required("This field is required"),
  event_type: Yup.string().required("This field is required"),
  event_location: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  other_tags: Yup.string().required("This field is required"),
  page_title: Yup.string()
    .required("This field is required")
    .max(60, "Page title is too long"),
  meta_description: Yup.string().required("This field is required"),
  event_body: Yup.string().required("This field is required"),
  zinc_code1: Yup.string().required("Required field"),
  zinc_code2: Yup.string().required("Required field"),
  zinc_code3: Yup.string().required("Required field")
});

const { TabPane } = Tabs;

const CreateCMEForm = ({ ...props }) => {
  const {
    values,
    handleChange,
    onChange,
    handleSubmit,
    setSubmitting,
    resetForm,
    setFieldValue
  } = props;

  // Event types
  const [eventTypes, setEventTypes] = useState([
    { id: 0, name: "Upcoming" },
    { id: 1, name: "Past" }
  ]);

  // Fetch data state
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  useEffect(() => {
    console.log("PROPS: ", props);

    setSpecializationOptions(
      props.postManagement.specializations
        ? props.postManagement.specializations
        : []
    );
    setCategoryOptions(
      props.postManagement.categories.results
        ? props.postManagement.categories.results
        : []
    );

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  // Tabs callback on change
  const callback = key => {
    console.log(key);
  };

  return (
    <form className="therapy-article-form" onSubmit={handleSubmit}>
      <Row gutter={24} className="form-section">
        <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
        <Col xs={24} md={8}>
          <Field
            as={SelectFormField}
            name="category_id"
            onChange={setFieldValue}
            values={values.category_id}
            label="Category"
            requiredlabel="true"
            options={categoryOptions}
            placeholder={"Select a category"}
          />
          <Field
            as={DatePickerFormField}
            placeholder={"Select a date"}
            label="Event Date"
            name="event_date"
            onChange={setFieldValue}
            requiredlabel="true"
            values={values.event_date}
          />
          <Field
            as={SelectFormField}
            name="event_type"
            onChange={setFieldValue}
            values={values.event_type}
            label="Event Type"
            requiredlabel="true"
            options={eventTypes}
            placeholder={"Select an event type"}
          />

          <TextFormField
            name="event_location"
            type="text"
            values={values.event_location ? values.event_location : null}
            label="Event Location"
            requiredlabel="true"
            placeholder="Enter an event location"
          />
        </Col>
        <Col xs={24} md={7}>
          <Field
            as={SelectTagsFormField}
            name="specializations"
            onChange={setFieldValue}
            values={values.specializations}
            label="Specializations"
            requiredlabel="true"
            options={specializationOptions}
            placeholder="Please select a specialization"
          />
          <Field
            as={TagsSuggestionFormField}
            name="other_tags"
            onChange={setFieldValue}
            values={values.other_tags}
            label="Other tags"
            requiredlabel="true"
            placeholder={"Select a tag"}
          />
        </Col>
        <Col xs={24} md={9}>
          <TextFormField
            name="event_name"
            type="text"
            values={values.event_name}
            label="Event Name"
            requiredlabel="true"
            placeholder="Enter an event name"
          />

          <TextFormField
            name="event_description"
            type="text"
            values={values.event_description}
            label="Event Description"
            requiredlabel="true"
            placeholder="Enter an event description"
          />

          <label
            style={{
              display: "block",
              margin: "15px 0"
            }}
            className="ant-form-item-required"
          >
            <span>Zinc Code </span>
            <Tooltip placement="top" title={sampleZincFormat}>
              <Icon type="info-circle" style={{ color: "#1890ff" }} />
            </Tooltip>
          </label>
          <ZincCodeFormField
            className="zinc-code-field1"
            name="zinc_code1"
            type="text"
            onChange={setFieldValue}
            maskValidation="AAAA.AAA.11.11.11"
            size="small"
          />
          <ZincCodeFormField
            className="zinc-code-field2"
            name="zinc_code2"
            type="text"
            onChange={setFieldValue}
            maskValidation="Version 1.1"
            size="small"
          />
          <ZincCodeFormField
            className="zinc-code-field3"
            name="zinc_code3"
            type="text"
            onChange={setFieldValue}
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
            values={values.page_title}
          />
          <TextFormField
            name="meta_description"
            type="text"
            label="Meta Description"
            requiredlabel="true"
            placeholder="Enter a meta description"
            values={values.meta_description}
          />
        </Col>

        <Col xs={24} md={12}>
          <TextFormField
            name="slug"
            type="text"
            label="Page Slug(Optional - system will generate if empty"
            placeholder="Enter a page slug"
            values={values.slug}
          />
          <TextFormField
            name="meta_keywords"
            type="text"
            label="Meta Keywords(Optional)"
            placeholder="Enter meta keywords"
            values={values.meta_keywords}
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
          <h3 className="ant-form-item-required">Event Body</h3>
          <TextEditorFormField
            name="event_body"
            values={values.event_body}
            onChange={setFieldValue}
          />
        </Col>
      </Row>

      {/* <Row>
                <DisplayFormikState {...values} />
            </Row> */}

      <div className="form-actions">
        <Button style={{ marginRight: 10 }}>
          <Link to="/cme">Cancel</Link>
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
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values);
    let formData = new FormData();

    formData.append("category_id", values.category_id);
    formData.append("event_type", values.event_type);
    formData.append("other_tags", values.other_tags);
    values.tag_all === 0
      ? formData.append("specializations", 0)
      : formData.append("specializations", values.specializations);
    formData.append("event_name", values.event_name);
    formData.append("event_description", values.event_description);
    formData.append(
      "zinc_code",
      `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`
    );
    formData.append("event_date", values.event_date);
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug);
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("event_body", values.event_body);
    formData.append("event_location", values.event_location);

    //if theres an uploaded image include these field on our form data
    if (values.featured) {
      formData.append("featured", values.featured); // get the blob file from component state
      formData.append("thumbnail", values.thumbnail); // get the blob file from component state
    }

    axios({
      url: `${API}/cme/create`,
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.auth.access_token}`
      },
      data: formData
    })
      .then(res => {
        setSubmitting(false);
        console.log(res);
        message.success(
          res.data.success ? res.data.success : "Created event successfully"
        );
        resetForm();
        props.history.push("/cme"); // redirect to table
      })
      .catch(err => {
        setSubmitting(false);
        console.log(err.response.data);

        if (err.response.data.length > 0) {
          console.log(err.response.data);
        } else {
          message.error(
            err.response.data.error
              ? err.response.data.error
              : "There was an error on processing your request"
          );
        }
      });
  },
  displayName: "CreateCMEForm"
})(CreateCMEForm);

const mapStateToProps = state => {
  return {
    cmeManagement: state.cmeManagementReducer
  };
};

const CreateCMEFormWrapper = connect(
  mapStateToProps,
  null
)(formikEnhancer);

export default CreateCMEFormWrapper;
