import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { withFormik, Field } from "formik";
import { Button, Row, Col, Tooltip, Icon, message, Tabs } from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
//import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";
import moment from "moment";

// Form elements
import TextFormField from "../../smart-form/TextFormField";
import SelectFormField from "../../smart-form/SelectFormField";
import SelectTagsFormField from "../../smart-form/SelectTagsFormField";
import TagsSuggestionFormField from "../../smart-form/TagsSuggestionFormField";
import DatePickerFormField from "../../smart-form/DatePickerFormField";
import TextEditorFormField from "../../smart-form/TextEditorFormField";
import EventTypeField from "../../smart-form/EventTypeField";
import TextAreaFormField from "../../smart-form/TextAreaFormField";

// Other components
import ImageUploader from "../../smart-components/ImageUploader";

// redux actions
import { createEvent } from "../../../redux/actions/cme-actions/cmeActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// utils
import { sampleZincFormat } from "../../../utils/constant";

// validation schema
const schema = Yup.object().shape({
  category_id: Yup.string().required("This field is required"),
  event_name: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),
  event_description: Yup.string()
    .max(1000, "Maximum of 1000 characters allowed only")
    .required("This field is required"),
  zinc_code: Yup.string()
    .required("This field is required")
    .max(150, "Maximum of 150 characters allowed only"),
  event_date: Yup.string().required("This field is required"),
  event_type: Yup.string().required("This field is required"),
  //event_location: Yup.string().required("This field is required"),
  specializations: Yup.string().required("This field is required"),
  other_tags: Yup.string().required("This field is required"),
  page_title: Yup.string()
    .max(60, "Maximum of 60 characters allowed only")
    .required("This field is required"),
  meta_description: Yup.string()
    .max(150, "Maximum of 150 characters allowed only")
    .required("This field is required"),
  event_body: Yup.string().required("This field is required"),
  featured: Yup.string().required("This field is required")
});

const CreateCMEForm = ({
  data,
  history,
  notifs,
  categories,
  specializations,
  clearNotifications,
  createEvent,
  ...props
}) => {
  // Event types
  const [eventTypes, setEventTypes] = useState([
    { id: 0, name: "Upcoming" },
    { id: 1, name: "Past" }
  ]);

  const [currentEventSelection, setCurrentEventSelection] = useState(null);

  // Tabs callback on change
  const callback = key => {
    console.log(key);
  };

  function disabledDate(current) {
    return current && current < moment().startOf("day");
  }

  function disabledFutureDate(current) {
    // Can not select days before today and today
    return current && current > moment().startOf("day");
  }

  // Handle event type change
  const handleEventChange = e => {
    const { setFieldValue } = props;

    console.log(e);
    setFieldValue("event_type", e);
    setCurrentEventSelection(e);
    setFieldValue("event_date", "");
  };

  useEffect(() => {
    console.log(moment().endOf("day"));
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

  return (
    <form className="therapy-article-form" onSubmit={props.handleSubmit}>
      <Row gutter={24} className="form-section">
        <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
        <Col xs={24} md={8}>
          <Field
            as={SelectFormField}
            name="category_id"
            onChange={props.setFieldValue}
            label="Category"
            requiredlabel="true"
            options={categories}
            placeholder={"Select a category"}
          />
          <Field
            as={EventTypeField}
            name="event_type"
            onChange={handleEventChange}
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
            disabled={currentEventSelection !== null ? false : true}
            disabledDate={
              currentEventSelection === 0 ? disabledDate : disabledFutureDate
            }
          />

          {/* enable this if location required is removed {props.values.event_type === 0 ? (
            <TextFormField
              name="event_location"
              type="text"
              label="Event Location"
              requiredlabel="true"
              placeholder="Enter an event location"
            />
          ) : null} */}
          <Field
            as={TextFormField}
            name="event_location"
            type="text"
            label="Event Location"
            requiredlabel="true"
            placeholder="Enter an event location"
            onChange={props.setFieldValue}
            maxCountAllowed={100}
          />
        </Col>
        <Col xs={24} md={7}>
          <Field
            as={SelectTagsFormField}
            name="specializations"
            onChange={props.setFieldValue}
            label="Specializations"
            requiredlabel="true"
            options={specializations}
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
          <TextAreaFormField
            name="event_name"
            type="text"
            label="Event Name"
            requiredlabel="true"
            placeholder="Enter an event name"
            onChange={props.setFieldValue}
            maxCountAllowed={100}
            rows={1}
          />

          <TextAreaFormField
            name="event_description"
            type="text"
            label="Event Description"
            requiredlabel="true"
            placeholder="Enter an event description"
            onChange={props.setFieldValue}
            maxCountAllowed={1000}
            rows={4}
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
          <h3 className="ant-form-item-required">
            Feature Image <small>(required)</small>
          </h3>
          <ImageUploader
            mastHeadLabel="Featured"
            hideImage={true}
            name="featured"
          />
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
        <DisplayFormikState {...props.values} />
      </Row> */}

      <div className="form-actions">
        <Button style={{ marginRight: 10 }}>
          <Link to="/cme">Cancel</Link>
        </Button>
        <Button htmlType="submit" type="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    clearNotifications();
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
    formData.append("zinc_code", values.zinc_code);
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

    props.createEvent(formData); // redux action
  },
  displayName: "CreateCMEForm"
})(CreateCMEForm);

const mapStateToProps = state => {
  return {
    cmeManagement: state.cmeManagementReducer,
    notifs: state.notificationReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      clearNotifications: clearNotifications,
      createEvent: createEvent
    },
    dispatch
  );
};

const CreateCMEFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default CreateCMEFormWrapper;
