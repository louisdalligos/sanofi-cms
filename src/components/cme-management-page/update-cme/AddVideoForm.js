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
  clearCurrentVideo
} from "../../../redux/actions/cme-actions/cmeActions";

// validation schema
const schema = Yup.object().shape({
  video_title: Yup.string()
    .required("This field is required")
    .max(150, "Video title is too long"),
  video_embed: Yup.string().required("This field is required"),
  //.max(150, "Video title is too long"),
  video_description: Yup.string()
    .required("This field is required")
    .max(150, "Video title is too long")
});

const AddVideoForm = ({
  currentHeadingSelected,
  fetchCurrentEvent,
  currentEvent,
  createEventHeadingVideo,
  currentVideo,
  isVideoOnEditMode,
  updateEventHeadingVideo,
  notifs,
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
      console.log("UNMOUNTING ________");
      clearCurrentVideo(); // clear selected
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
      case "UPDATE_EVENT_HEADING_VIDEO_SUCCESS":
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data
        props.handleModalClose();
        props.resetForm();
        message.success(
          notifs.notifications ? notifs.notifications.success : "Success"
        );
        break;
      case "UPDATE_EVENT_HEADING_VIDEO_FAILED":
        notifs.notifications
          ? notifs.notifications.forEach(element => {
              message.error(element);
            })
          : message.error("Oops something went wrong!");
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  const handleCancel = resetForm => {
    resetForm();
    props.handleModalClose();
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3>Video Information</h3>
      <Field
        as={TextAreaFormField}
        rows={4}
        name="video_embed"
        onChange={handleChange}
        values={values.video_embed}
        label="Video Embed Code:"
        requiredlabel="true"
      />

      <Field
        as={TextFormField}
        name="video_title"
        rows={1}
        onChange={handleChange}
        values={values.video_title}
        label="Video Title"
        requiredlabel="true"
      />

      <Field
        as={TextAreaFormField}
        rows={4}
        name="video_description"
        onChange={handleChange}
        values={values.video_description}
        label="Video Description:"
        requiredlabel="true"
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
      video_embed: props.currentVideo.video_embed,
      video_description: props.currentVideo.video_description
    };
  },
  validationSchema: schema,
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values);
    //debugger;
    const videoId = values.id; // get event video id formik values

    // redux action
    if (props.isVideoOnEditMode) {
      props.updateEventHeadingVideo(videoId, JSON.stringify(values));
      return;
    } else {
      // data to send to add action
      const data = {
        ...values,
        event_section_id: props.currentHeadingSelected.id // get selected heading from redux store
      };

      props.createEventHeadingVideo(JSON.stringify(data));
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
      updateEventHeadingVideo: updateEventHeadingVideo
    },
    dispatch
  );
};

const AddVideoFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default AddVideoFormWrapper;
