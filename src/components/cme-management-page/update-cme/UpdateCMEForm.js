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

import axios from "axios";
import { API } from "../../../utils/api";
import qs from "qs";

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
import EventHighlightsFormWrapper from "./EventHighlightsForm";

// utils
import { sampleZincFormat } from "../../../utils/constant";

// redux action
import {
  fetchCurrentEvent,
  changeEventStatus
} from "../../../redux/actions/cme-actions/cmeActions";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

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
  //specializations: Yup.string().required("This field is required"),
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

const UpdateCMEForm = ({
  currentEvent,
  changeEventStatus,
  fetchCurrentEvent,
  notifs,
  ...props
}) => {
  // Event Id
  const [currentEventId, setCurrentEventId] = useState(props.match.params.id);

  // Event types
  const [eventTypes, setEventTypes] = useState([
    { id: 0, name: "Upcoming" },
    { id: 1, name: "Past" }
  ]);

  // loading state
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  // Fetch data state
  const [specializationOptions, setSpecializationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [thumbnailImageInfo, setthumbnailImageInfo] = useState("");
  const [featuredImageInfo, setfeaturedImageInfo] = useState("");
  const [isEventFeatured, setIsEventFeatured] = useState(true);
  const [statusOptions, setStatusOptions] = useState([
    { id: "unpublished", name: "unpublished" },
    { id: "published", name: "published" },
    { id: "archived", name: "archived" }
  ]);

  useEffect(() => {
    setLoading(true);
    fetchCurrentEvent(currentEventId);

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

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (currentEvent) {
      props.getData(currentEvent); // pass our data to parent for it to set the initial values of formik

      setLoading(false);
    }

    return () => {
      console.log("CME FORM unmount -------->");
    };
    //eslint-disable-next-line
  }, [currentEvent]);

  // Notifications listener
  useEffect(() => {
    switch (notifs.id) {
      case "CHANGE_EVENT_STATUS_SUCCESS":
        setLoading(false);
        setIsDisabled(true);
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Success in changing event status"
        );
        break;
      case "CHANGE_EVENT_STATUS_FAILED":
        setLoading(false);
        message.error(
          notifs.notifications
            ? notifs.notifications.error
            : "There was an error on processing your request"
        );
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id]);

  // Tabs callback on change
  const callback = key => {
    console.log(key);
  };

  // get/send image to uploader componennt
  const getImage = (name, file) => {
    if (name === "featured") {
      setfeaturedImageInfo(file);
    }
    if (name === "thumbnail") {
      setthumbnailImageInfo(file);
    }
  };

  // Save action changing of status
  const saveStatus = val => {
    setLoading(true);
    const id = currentEvent.id;

    const values = {
      id: id,
      status: val
    };

    changeEventStatus(id, values); // redux action
  };

  // handle set to featured switch
  function handleSwitchChange(checked) {
    console.log(checked);
  }

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
                        props.values.status = currentEvent.status;
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
        <Col xs={24} md={12}>
          <h3 style={{ float: "left", marginRight: 10 }}>Featured</h3>
          <Tooltip
            placement="top"
            title={
              isEventFeatured && isEventFeatured === "Yes"
                ? "Remove from featured event"
                : "Feature the event?"
            }
          >
            <Switch
              className="switch-new-trigger"
              defaultChecked={isEventFeatured && isEventFeatured === "Yes"}
              onChange={handleSwitchChange}
            />
          </Tooltip>
        </Col>
      </Row>
      <Tabs onChange={callback} type="card" style={{ marginTop: 30 }}>
        <TabPane tab="Main Product Info" key="1">
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
                  options={categoryOptions}
                  placeholder={"Select a category"}
                />
                <Field
                  as={DatePickerFormField}
                  placeholder={"Select a date"}
                  label="Event Date"
                  name="event_date"
                  onChange={props.setFieldValue}
                  requiredlabel="true"
                  values={props.values.event_date}
                />
                <Field
                  as={SelectFormField}
                  name="event_type"
                  onChange={props.setFieldValue}
                  values={props.values.event_type}
                  label="Event Type"
                  requiredlabel="true"
                  options={eventTypes}
                  placeholder={"Select an event type"}
                  defaultValue={
                    props.values.event_type === 0 ? "Upcoming" : "Past"
                  }
                />

                <TextFormField
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
                />
              </Col>
              <Col xs={24} md={7}>
                <Field
                  as={SelectTagsFormField}
                  name="specializations"
                  onChange={props.setFieldValue}
                  values={props.values.specializations}
                  label="Specializations"
                  requiredlabel="true"
                  options={specializationOptions}
                  placeholder="Please select a specialization"
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
                <TextFormField
                  name="event_name"
                  type="text"
                  values={props.values.event_name}
                  label="Event Name"
                  requiredlabel="true"
                  placeholder="Enter an event name"
                />

                <TextFormField
                  name="event_description"
                  type="text"
                  values={props.values.event_description}
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
              when={props.dirty}
              navigate={path => props.history.push(path)}
              shouldBlockNavigation={location => (props.dirty ? true : false)}
            />
          </form>
        </TabPane>
        <TabPane tab="Event Highlights" key="4" disabled={props.isEditMode}>
          <Row>
            <Col>
              <h3>Event Hightlights</h3>
              <EventHighlightsFormWrapper auth={props.auth} />
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </Spin>
  );
};

const formikEnhancer = withFormik({
  mapPropsToValues: props => props.data,
  validationSchema: schema,
  enableReinitialize: true,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    const data = {
      page_title: values.page_title,
      category_id: values.category_id,
      other_tags: values.other_tags.join(),
      specializations: values.specializations.join(),
      event_name: values.event_name,
      event_description: values.event_description,
      zinc_code: `${values.zinc_code1} | ${values.zinc_code2} | ${values.zinc_code3}`,
      event_date: values.event_date,
      page_title: values.page_title,
      meta_description: values.meta_description,
      slug: values.slug,
      meta_keywords: values.meta_keywords,
      event_body: values.event_body,
      event_location: values.event_location,
      event_type: values.event_type
    };

    console.log(qs.stringify(values), "<<======FORMAT");
    axios({
      url: `${API}/cme/update/${values.id}`,
      method: "put",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${props.auth.access_token}`
      },
      data: qs.stringify(data)
    })
      .then(res => {
        setSubmitting(false);
        message.success(
          res.data.success ? res.data.success : "Updated event successfully"
        );
        resetForm();
        props.history.push("/cme"); // redirect to table
      })
      .catch(err => {
        setSubmitting(false);

        if (err.response.data.length > 0) {
          console.log(err.response.data);
        } else {
          message.error(
            err.response.data.error
              ? err.response.data.error
              : err.response.data.message
          );
        }
      });
  },
  displayName: "UpdateCMEForm"
})(UpdateCMEForm);

const mapStateToProps = state => {
  return {
    currentEvent: state.cmeReducer.currentEvent,
    notifs: state.notificationReducer
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCurrentEvent: fetchCurrentEvent,
      changeEventStatus: changeEventStatus
    },
    dispatch
  );
};

const UpdateCMEFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default UpdateCMEFormWrapper;
