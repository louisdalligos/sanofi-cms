import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withFormik, Formik, Form, Field } from "formik";
import { Button, Row, Col, Tooltip, Icon, message, Tabs } from "antd";
import * as Yup from "yup";
// import { DisplayFormikState } from "../../../utils/formikPropDisplay";
//import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

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
  zinc_code1: Yup.string()
    .required("Required field")
    .matches(
      /[A-Z]{4}.[A-Z]{3}.[0-9]{2}.[0-9]{2}.[0-9]{4}/,
      "Please complete the code"
    ),
  zinc_code2: Yup.string()
    .required("Required field")
    .matches(/[Version][ ][0-9]{1}.[0-9]{1}/, "Please complete version"),
  zinc_code3: Yup.string()
    .required("Required field")
    .matches(
      /[0-9]{2}[ ][A-Z]{1}[a-z]{1}[a-z]{1}[ ][0-9]{4}/,
      "Please complete the date"
    )
});

const CreateCMEForm = ({ data, history, notifs, ...props }) => {
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

  useEffect(() => {
    switch (notifs.id) {
      case "CREATE_EVENT_SUCCESS":
        message.success(notifs.notifications.success);
        history.push("/cme");
        break;
      case "CREATE_EVENT_FAILED":
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

  // Tabs callback on change
  const callback = key => {
    console.log(key);
  };

  const submitForm = (values, action) => {
    let formData = new FormData();

    formData.append("event_name", values.event_name);
    formData.append("event_type", values.event_type);
    formData.append("event_description", values.event_description);
    formData.append("event_date", values.event_date);
    formData.append("category_id", values.category_id);
    formData.append("other_tags", values.other_tags);
    values.tag_all === true
      ? formData.append("specializations", 0)
      : formData.append("specializations", values.specializations);
    formData.append(
      "zinc_code",
      `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`
    );
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
        action.resetForm();
        action.setSubmitting(false);
        console.log(res);
        message.success(
          res.data.success ? res.data.success : "Created event successfully"
        );
        history.push("/cme");
      })
      .catch(err => {
        action.setSubmitting(false);
        message.error(
          err.response.data.error
            ? err.response.data.error
            : "There was an error on processing your request"
        );
      });
  };

  return (
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
              <Field
                as={SelectFormField}
                name="category_id"
                onChange={props.setFieldValue}
                label="Category"
                requiredlabel="true"
                options={categoryOptions}
                placeholder={"Select a category"}
              />
              <Field
                as={SelectFormField}
                name="event_type"
                onChange={props.setFieldValue}
                label="Event Type"
                requiredlabel="true"
                options={eventTypes}
                placeholder={"Select an event type"}
              />
              <Field
                as={DatePickerFormField}
                placeholder={"Select a date"}
                label="Event Date"
                name="event_date"
                onChange={props.setFieldValue}
                requiredlabel="true"
              />

              <TextFormField
                name="event_location"
                type="text"
                label="Event Location"
                requiredlabel="true"
                placeholder="Enter an event location"
              />
            </Col>
            <Col xs={24} md={7}>
              <Field
                as={SelectTagsFormField}
                name="specializations"
                onChange={props.setFieldValue}
                label="Specializations"
                requiredlabel="true"
                options={specializationOptions}
                placeholder="Please select a specialization"
              />
              <Field
                as={TagsSuggestionFormField}
                name="other_tags"
                onChange={props.setFieldValue}
                label="Other tags"
                requiredlabel="true"
                placeholder={"Select a tag"}
              />
            </Col>
            <Col xs={24} md={9}>
              <TextFormField
                name="event_name"
                type="text"
                label="Event Name"
                requiredlabel="true"
                placeholder="Enter an event name"
              />

              <TextFormField
                name="event_description"
                type="text"
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
                onChange={props.setFieldValue}
                maskValidation="AAAA.AAA.11.11.1111"
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
              <h3 className="ant-form-item-required">
                Feature Image <small>(required)</small>
              </h3>
              <ImageUploader />
            </Col>
            <Col xs={24} md={16}>
              <h3 className="ant-form-item-required">Event Body</h3>
              <TextEditorFormField
                name="event_body"
                onChange={props.setFieldValue}
                values={props.values.event_body}
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
        </Form>
      )}
    </Formik>
  );
};

const mapStateToProps = state => {
  return {
    cmeManagement: state.cmeManagementReducer,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateCMEForm);
