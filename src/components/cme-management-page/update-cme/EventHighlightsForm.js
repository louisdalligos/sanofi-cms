import React, { Fragment, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Formik, Form, Field, useFormikContext, withFormik } from "formik";
import * as Yup from "yup";
import { Button, message, Modal, Spin, Icon } from "antd";
import { bindActionCreators } from "redux";

//import { DisplayFormikState } from "../../../utils/formikPropDisplay";

// Components
import EventHeading from "./EventHeading";
import AddVideoForm from "./AddVideoForm";
import VideoListTable from "./VideoListTable";

// redux actions
import {
  createEventHeading,
  renameEventHeading,
  fetchCurrentEvent,
  deleteEventHeading,
  clearCurrentVideo,
  clearSelectedHeading,
  setSelectedHeading
} from "../../../redux/actions/cme-actions/cmeActions";

const { confirm } = Modal;

const EventHighlightsForm = ({
  auth,
  createEventHeading,
  renameEventHeading,
  deleteEventHeading,
  fetchCurrentEvent,
  clearCurrentVideo,
  currentEvent,
  notifs,
  inProgress,
  isVideoOnEditMode,
  isHeadingOnEditMode,
  setSelectedHeading,
  currentSelectedHeading,
  ...props
}) => {
  const { values, validateField, setFieldValue } = useFormikContext();
  const [modalVisible, setModalVisible] = useState(false);
  const addVideoButtonRef = useRef(null);

  const blankHeading = {
    heading: "",
    event_video: []
  };

  // our initial state
  const [mapData, setMapData] = useState([]);

  const addHeading = () => {
    setMapData([...mapData, { ...blankHeading }]);
  };

  const handleOnChange = e => {
    const updatedHeadings = [...mapData]; // get our array from the state
    updatedHeadings[e.target.dataset.idx][e.target.dataset.name] =
      e.target.value;

    setMapData(updatedHeadings);
  };

  useEffect(() => {
    setMapData(currentEvent.sections ? currentEvent.sections : []); // update our data state
  }, []);

  // Notifications listener
  useEffect(() => {
    switch (notifs.id) {
      case "CREATE_EVENT_HEADING_SUCCESS":
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data

        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Successfully created an event heading"
        );
        break;
      case "CREATE_EVENT_HEADING_FAILED":
        notifs.notifications
          ? notifs.notifications.forEach(element => {
              message.error(element);
            })
          : message.error("Oops something went wrong!");
        break;
      case "RENAME_EVENT_HEADING_SUCCESS":
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Successfully renamed the event heading"
        );
        break;
      case "RENAME_EVENT_HEADING_FAILED":
        message.error(
          notifs.notifications
            ? notifs.notifications.error
            : "Failed to rename the event heading"
        );
        break;
      case "DELETE_EVENT_HEADING_SUCCESS":
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data

        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Successfully deleted the event heading"
        );
        break;
      case "DELETE_EVENT_HEADING_VIDEO_SUCCESS":
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Successfully deleted the video"
        );
        fetchCurrentEvent(currentEvent.id); // fetch again to get updated data
        break;
      case "FETCH_CURRENT_EVENT_SUCCESS":
        setMapData(currentEvent.sections ? currentEvent.sections : []); // update our data state
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  function deleteHeadingAction(id) {
    const updatedHeadings = [...mapData]; // get our array from the state

    const newArray = updatedHeadings.filter((item, index) => {
      if (index === id) {
        // redux action
        deleteEventHeading(item.id);
      }

      // return new state
      if (index !== id) {
        return item;
      }
    });

    // set our component state
    setMapData(newArray);
  }

  // Component actions
  function handleDelete(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to delete this event heading section?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        deleteHeadingAction(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function saveEntry(id, e, inputHeadingRef, saveButtonRef, editButtonRef) {
    e.stopPropagation();

    let inputEl = document.getElementById(`${inputHeadingRef.props.id}`);

    if (inputEl.value.length < 1) {
      console.log(inputEl.value);
      message.error("Please input a heading name");
      return;
    }

    // set state for input
    document.getElementById(`${inputHeadingRef.props.id}`).disabled = true;
    document
      .getElementById(`${inputHeadingRef.props.id}`)
      .classList.add("ant-input-disabled");

    // set state for button
    document.getElementById(`${saveButtonRef.props.id}`).style.display = "none";
    document.getElementById(`${editButtonRef.props.id}`).style.display =
      "block";

    const updatedHeadings = [...mapData]; // get our array from the state

    // if our id matches the entry on the state
    updatedHeadings.filter((item, index) => {
      if (index === id) {
        // check if on edit mode
        if (isHeadingOnEditMode) {
          const data = {
            event_id: currentEvent.id,
            heading: item.heading
          };

          renameEventHeading(item.id, data);
        } else {
          const data = {
            event_id: currentEvent.id,
            heading: item.heading
          };

          // redux action
          createEventHeading(data);
        }
      }
    });
  }

  function handleRename(id, e, inputHeadingRef, saveButtonRef, editButtonRef) {
    e.stopPropagation();

    console.log(saveButtonRef);
    // set state for input
    document.getElementById(`${inputHeadingRef.props.id}`).disabled = false;
    document
      .getElementById(`${inputHeadingRef.props.id}`)
      .classList.remove("ant-input-disabled");

    // set state for button
    document.getElementById(`${saveButtonRef.props.id}`).style.display =
      "block";
    document.getElementById(`${editButtonRef.props.id}`).style.display = "none";

    const updatedHeadings = [...mapData]; // get our array from the state

    // if our id matches the entry on the state
    updatedHeadings.filter((item, index) => {
      if (index === id) {
        console.log(item);
        setSelectedHeading(item); // set the current heading selection first
      }
    });
  }

  function handleModal(id) {
    clearCurrentVideo(); //redux action
    setModalVisible(true);
    const updatedHeadings = [...mapData]; // get our array from the state

    // if our id matches the entry on the state
    updatedHeadings.filter((item, index) => {
      if (index === id) {
        setSelectedHeading(item); // redux action
      }
    });
  }

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <Spin spinning={inProgress}>
        <form>
          {mapData.map((val, idx) => (
            <div key={idx} style={{ marginBottom: 60 }}>
              <Field
                as={EventHeading}
                name="heading"
                key={`heading-${idx}`}
                idx={idx}
                data={mapData}
                handleOnChange={handleOnChange}
                handleRename={handleRename}
                saveEntry={saveEntry}
                handleDelete={handleDelete}
                stateData={mapData}
                videoAddRef={addVideoButtonRef}
              />

              <VideoListTable
                videosData={mapData[idx].videos}
                auth={auth}
                handleModal={handleModal}
              />

              <Button
                type="primary"
                onClick={() => handleModal(idx)}
                style={{ marginTop: 20 }}
                id={`btn-add-video-${idx}`}
                ref={addVideoButtonRef}
              >
                Add video
              </Button>
            </div>
          ))}

          <Button
            type="link"
            onClick={addHeading}
            style={{ display: "block", marginTop: 20 }}
          >
            + Add Heading
          </Button>

          {/* <DisplayFormikState {...props.values} /> */}
        </form>
      </Spin>
      <Modal
        title={isVideoOnEditMode ? "Edit Video" : "Add Video"}
        visible={modalVisible}
        className="modal-form"
      >
        <AddVideoForm handleModalClose={handleModalClose} />
      </Modal>
    </div>
  );
};

const formikEnhancer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: props => {
    return {
      sections: props.currentEvent.sections
    };
  },
  handleSubmit: (values, { props, setSubmitting, resetForm }) => {
    console.log(values);
  },
  displayName: "EventHighlightsForm"
})(EventHighlightsForm);

const mapStateToProps = state => {
  return {
    currentEvent: state.cmeReducer.currentEvent,
    notifs: state.notificationReducer,
    inProgress: state.cmeReducer.requestInProgress,
    isVideoOnEditMode: state.cmeReducer.editVideoMode,
    isHeadingOnEditMode: state.cmeReducer.editHeadingMode,
    currentSelectedHeading: state.cmeReducer.currentSelectedHeading
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createEventHeading: createEventHeading,
      renameEventHeading: renameEventHeading,
      fetchCurrentEvent: fetchCurrentEvent,
      deleteEventHeading: deleteEventHeading,
      clearCurrentVideo: clearCurrentVideo,
      setSelectedHeading: setSelectedHeading,
      clearSelectedHeading: clearSelectedHeading
    },
    dispatch
  );
};

const EventHighlightsFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default EventHighlightsFormWrapper;
