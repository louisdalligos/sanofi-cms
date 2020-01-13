import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";
import { withFormik, Field, Formik, Form } from "formik";
import {
  Button,
  Row,
  Col,
  Tooltip,
  Icon,
  message,
  Tabs,
  Spin,
  Switch
} from "antd";
import * as Yup from "yup";
//import { DisplayFormikState } from "../../../utils/formikPropDisplay";
import RouteLeavingGuard from "../../utility-components/RouteLeavingGuard";

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
import EventHighlightsFormWrapper from "./EventHighlightsForm";

// utils
import { sampleZincFormat } from "../../../utils/constant";

// redux action
import {
  fetchCurrentEvent,
  changeEventStatus,
  featureEvent,
  updateEvent,
  setStatusChangeFormDisable
} from "../../../redux/actions/cme-actions/cmeActions";

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
  event_location: Yup.string().required("This field is required"),
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

const { TabPane } = Tabs;

const UpdateCMEForm = ({
  currentEvent,
  changeEventStatus,
  fetchCurrentEvent,
  featureEvent,
  notifs,
  history,
  updateEvent,
  isFormDirty,
  loading,
  statusChangeFormDisable,
  setStatusChangeFormDisable,
  ...props
}) => {
  // Event Id
  const [currentEventId, setCurrentEventId] = useState(props.match.params.id);

  // Event types
  const [eventTypes, setEventTypes] = useState([
    { id: 0, name: "Upcoming" },
    { id: 1, name: "Past" }
  ]);

  const [currentEventSelection, setCurrentEventSelection] = useState(null);

  const [thumbnailImageInfo, setthumbnailImageInfo] = useState("");
  const [featuredImageInfo, setfeaturedImageInfo] = useState("");
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "Unpublished" },
    { id: "published", name: "Published" },
    { id: "archived", name: "Archived" }
  ]);

  useEffect(() => {
    fetchCurrentEvent(currentEventId);

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentEvent) {
      const shapeData = {
        ...currentEvent,
        specializations: props.specializations.map(item => {
          return item.id;
        }),
        tag_all: true
      };
      props.getData(
        currentEvent.specializations === "0" ? shapeData : currentEvent
      ); // pass our data to parent for it to set the initial values of formik
    }

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentEvent]);

  // Tabs callback on change
  const callback = key => {
    console.log(key);
  };

  // Save action changing of status
  const saveStatus = val => {
    const id = currentEvent.id;

    const values = {
      id: id,
      status: val
    };

    changeEventStatus(id, values); // redux action
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

  return (
    <Spin spinning={loading}>
      <Row gutter={24} className="change-status-row">
        <Col xs={24} md={12}>
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
                        props.values.status = currentEvent.status;
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
        {/* <Col xs={24} md={12}>
          <h3 style={{ float: "left", marginRight: 10 }}>Featured</h3>
          <Tooltip
            placement="top"
            title={
              isEventFeatured
                ? "Remove from featured event"
                : "Feature the event?"
            }
          >
            <Switch
              className="switch-new-trigger"
              defaultChecked={isEventFeatured}
              onChange={handleSwitchChange}
            />
          </Tooltip>
        </Col> */}
      </Row>
      <Tabs onChange={callback} type="card" style={{ marginTop: 30 }}>
        <TabPane tab="Main Event Info" key="1">
          <form className="therapy-article-form" onSubmit={props.handleSubmit}>
            <Row gutter={24} className="form-section">
              <h3 style={{ marginLeft: 10 }}>Page Organization</h3>
              <Col xs={24} md={8}>
                <Field
                  as={SelectFormField}
                  name="category_id"
                  onChange={props.setFieldValue}
                  values={props.values.category_id}
                  label="Category"
                  requiredlabel="true"
                  options={props.categories}
                  placeholder={"Select a category"}
                />
                <Field
                  as={EventTypeField}
                  name="event_type"
                  onChange={handleEventChange}
                  values={props.values.event_type}
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
                  dateValue={props.values.event_date}
                  disabled={currentEventSelection !== null ? false : true}
                  disabledDate={
                    currentEventSelection === 0
                      ? disabledDate
                      : disabledFutureDate
                  }
                />

                <Field
                  as={TextFormField}
                  name="event_location"
                  type="text"
                  values={
                    props.values.event_location
                      ? props.values.event_location
                      : null
                  }
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
                  rawSpecialization={
                    (currentEvent && currentEvent.specializations) || null
                  }
                  name="specializations"
                  onChange={props.setFieldValue}
                  values={props.values.specializations}
                  label="Specializations"
                  requiredlabel="true"
                  options={props.specializations}
                  placeholder="Please select a specialization"
                  allSelected={props.values.tag_all}
                  onEditMode={true}
                />
                <Field
                  as={TagsSuggestionFormField}
                  name="other_tags"
                  onChange={props.setFieldValue}
                  values={props.values.other_tags}
                  label="Other tags"
                  requiredlabel="true"
                  placeholder={"Select a tag"}
                />
              </Col>
              <Col xs={24} md={9}>
                <TextAreaFormField
                  name="event_name"
                  type="text"
                  values={props.values.event_name}
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
                  values={props.values.event_description}
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
                <ImageUploader
                  mastHeadLabel="Featured"
                  hideImage={true}
                  isOnEditMode={true}
                  name="featured"
                />
              </Col>
              <Col xs={24} md={16}>
                <h3 className="ant-form-item-required">Event Body</h3>
                <TextEditorFormField
                  name="event_body"
                  values={props.values.event_body}
                  onChange={props.setFieldValue}
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

            <RouteLeavingGuard
              when={isFormDirty}
              navigate={path => history.push(path)}
              shouldBlockNavigation={location => (isFormDirty ? true : false)}
            />
          </form>
        </TabPane>

        {props.values.event_type === "Past" || props.values.event_type === 1 ? (
          <TabPane tab="Event Highlights" key="4">
            <Row>
              <Col>
                <h3>Event Hightlights</h3>
                <EventHighlightsFormWrapper auth={props.auth} />
              </Col>
            </Row>
          </TabPane>
        ) : null}
      </Tabs>
    </Spin>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  validateOnChange: false,
  validateOnBlur: false,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    let formData = new FormData();

    // format our event type
    let eventType;

    if (values.event_type === "Upcoming" || values.event_type === 0) {
      eventType = 0;
    }

    if (values.event_type === "Past" || values.event_type === 1) {
      eventType = 1;
    }

    formData.append("event_name", values.event_name);
    formData.append("event_type", eventType);
    formData.append("event_date", values.event_date);
    formData.append("event_description", values.event_description);
    formData.append("category_id", values.category_id);
    formData.append("other_tags", values.other_tags.join());
    formData.append(
      "specializations",
      values.tag_all ? 0 : values.specializations
    );
    formData.append("zinc_code", values.zinc_code);
    formData.append("page_title", values.page_title);
    formData.append("meta_description", values.meta_description);
    formData.append("slug", values.slug);
    formData.append("meta_keywords", values.meta_keywords);
    formData.append("event_body", values.event_body);
    formData.append("event_location", values.event_location);
    formData.append("_method", "PUT");

    //if theres an uploaded image include these field on our form data
    if (values.featured instanceof Blob) {
      formData.append("featured", values.featured);
      formData.append("thumbnail", values.thumbnail);
    }

    props.updateEvent(values.id, props.history, formData); // redux action
  },
  displayName: "UpdateCMEForm"
})(UpdateCMEForm);

const mapStateToProps = state => {
  return {
    currentEvent: state.cmeReducer.currentEvent,
    notifs: state.notificationReducer,
    isFormDirty: state.cmeReducer.isFormDirty,
    loading: state.cmeReducer.requestInProgress,
    statusChangeFormDisable: state.cmeReducer.statusChangeFormDisable
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrentEvent: fetchCurrentEvent,
      changeEventStatus: changeEventStatus,
      featureEvent: featureEvent,
      updateEvent: updateEvent,
      setStatusChangeFormDisable: setStatusChangeFormDisable
    },
    dispatch
  );
};

const UpdateCMEFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default UpdateCMEFormWrapper;
