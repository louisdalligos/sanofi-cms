import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withFormik, Field } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";

// Form components
import TextFormField from "../../smart-form/TextAreaFormField";
import TextAreaFormField from "../../smart-form/TextAreaFormField";

import {
  fetchCurrentEvent,
  createEventHeadingVideo,
  updateEventHeadingVideo,
  clearCurrentVideo,
  clearSelectedHeading
} from "../../../redux/actions/cme-actions/cmeActions";

import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

// validation schema
const schema = Yup.object().shape({
  video_title: Yup.string()
    .max(100, "Maximum of 100 characters allowed only")
    .required("This field is required"),
  video_description: Yup.string()
    .max(1000, "Maximum of 1000 characters allowed only")
    .required("This field is required"),
  video_link: Yup.string()
    .required("This field is required")
    .matches(
      /^(http:\/\/|https:\/\/)(vimeo\.com)\//,
      "Please enter a valid vimeo link"
    )
});

const AddVideoForm = ({
  currentHeadingSelected,
  fetchCurrentEvent,
  currentEvent,
  createEventHeadingVideo,
  currentVideo,
  isVideoOnEditMode,
  updateEventHeadingVideo,
  clearCurrentVideo,
  clearSelectedHeading,
  notifs,
  clearNotifications,
  ...props
}) => {
  const {
    values,
    handleChange,
    onChange,
    handleSubmit,
    setSubmitting,
    resetForm
  } = props;

  useEffect(() => {
    console.log(currentHeadingSelected, "Current heading selected");

    // on unmount
    return () => {
      console.log("UNMOUNTING VIDEO EDIT/ADD FORM ________");
      //clearCurrentVideo(); // clear selected
      //clearSelectedHeading();
    };
    //eslint-disable-next-line
  }, []);

  // useeffect for debugging purposes only
  useEffect(() => {
    if (onChange) {
      onChange(values);
    }
  }, [values, onChange]);

  // Notifications listener
  useEffect(() => {
    switch (notifs.id) {
      case "CREATE_EVENT_HEADING_VIDEO_SUCCESS":
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data
        props.handleModalClose();
        props.resetForm();
        message.success(
          notifs.notifications ? notifs.notifications.success : "Success"
        );
        break;
      case "CREATE_EVENT_HEADING_VIDEO_FAILED":
        message.error(
          notifs.notifications
            ? notifs.notifications
            : "Oops something went wrong!"
        );
        clearNotifications();
        break;
      case "UPDATE_EVENT_HEADING_VIDEO_SUCCESS":
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data
        props.handleModalClose();
        props.resetForm();
        message.success(
          notifs.notifications ? notifs.notifications.success : "Success"
        );
        break;
      case "UPDATE_EVENT_HEADING_VIDEO_FAILED":
        const errorMsg = notifs.notifications;
        // 3 level validation of api response - bad
        if (errorMsg) {
          if (errorMsg.errors) {
            errorMsg.errors.forEach(element => {
              message.error(element);
            });
          } else if (errorMsg.error) {
            message.error(errorMsg.error);
          } else {
            message.error(errorMsg);
          }
        }

        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  const handleCancel = resetForm => {
    resetForm();
    clearCurrentVideo();
    props.handleModalClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Video Information</h3>

      <TextFormField
        name="video_link"
        onChange={props.setFieldValue}
        values={values.video_link}
        label="Vimeo Link"
        requiredlabel="true"
        maxCountAllowed={100}
        rows={1}
      />

      <TextFormField
        name="video_title"
        onChange={props.setFieldValue}
        values={values.video_title}
        label="Video Title"
        requiredlabel="true"
        maxCountAllowed={100}
        rows={1}
      />

      <TextAreaFormField
        rows={6}
        name="video_description"
        values={values.video_description}
        label="Video Description:"
        requiredlabel="true"
        onChange={props.setFieldValue}
        maxCountAllowed={1000}
      />

      {/* <pre>{JSON.stringify(values, null, 2)}</pre> */}

      <div className="form-actions">
        <Button
          style={{ marginRight: 10 }}
          onClick={handleCancel.bind(null, resetForm)}
        >
          Cancel
        </Button>
        <Button htmlType="submit" type="primary">
          {isVideoOnEditMode ? "Update" : "Save"}
        </Button>
      </div>
    </form>
  );
};

const formikEnhancer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      id: props.currentVideo.id,
      event_section_id: props.currentVideo.event_section_id,
      video_title: props.currentVideo.video_title,
      //video_embed: props.currentVideo.video_embed,
      video_description: props.currentVideo.video_description,
      video_link: props.currentVideo.video_link
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    clearNotifications();

    const videoId = values.id; // get event video id formik values

    console.log(values);
    //debugger;

    // redux action
    if (props.isVideoOnEditMode) {
      //alert("Edit mode action");
      props.updateEventHeadingVideo(videoId, values);
      //debugger;
      return;
    } else {
      // data to send to add action
      const data = {
        ...values,
        event_section_id: props.currentHeadingSelected.id // get selected heading from redux store
      };

      props.createEventHeadingVideo(data);
    }
  },
  displayName: "AddVideoForm"
})(AddVideoForm);

const mapStateToProps = state => {
  return {
    currentEvent: state.cmeReducer.currentEvent,
    notifs: state.notificationReducer,
    currentVideo: state.cmeReducer.currentVideoSelected,
    isVideoOnEditMode: state.cmeReducer.editVideoMode,
    currentHeadingSelected: state.cmeReducer.currentHeadingSelected
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createEventHeadingVideo: createEventHeadingVideo,
      fetchCurrentEvent: fetchCurrentEvent,
      updateEventHeadingVideo: updateEventHeadingVideo,
      clearCurrentVideo: clearCurrentVideo,
      clearSelectedHeading: clearSelectedHeading,
      clearNotifications: clearNotifications
    },
    dispatch
  );
};

const AddVideoFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default AddVideoFormWrapper;
