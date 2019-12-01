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
  fetchCurrentEvent,
  deleteEventHeading,
  clearCurrentVideo,
  setSelectedHeading
} from "../../../redux/actions/cme-actions/cmeActions";

const EventHighlightsForm = ({
  auth,
  createEventHeading,
  deleteEventHeading,
  fetchCurrentEvent,
  clearCurrentVideo,
  currentEvent,
  notifs,
  inProgress,
  isVideoOnEditMode,
  setSelectedHeading,
  ...props
}) => {
  const { values, validateField, setFieldValue } = useFormikContext();
  const [modalVisible, setModalVisible] = useState(false);
  //const [currentSelectedHeading, setCurrentSelectedHeading] = useState(null);
  const [currentSelectedVideo, setCurrentSelectedVideo] = useState(null);

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
    // const { current } = refInput;
    // console.log(current, "<======= USE REF");

    return () => {};
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

  // Component actions
  function handleDelete(id, e) {
    e.stopPropagation();

    const updatedHeadings = [...mapData]; // get our array from the state

    const newArray = updatedHeadings.filter((item, index) => {
      if (index === id) {
        const values = {
          event_section_id: item.id
        };

        // redux action
        deleteEventHeading(item.id, values);
      }

      // return new state
      if (index !== id) {
        return item;
      }
    });

    // set our component state
    setMapData(newArray);
  }

  function saveEntry(id, e) {
    e.stopPropagation();

    const updatedHeadings = [...mapData]; // get our array from the state

    // if our id matches the entry on the state
    updatedHeadings.filter((item, index) => {
      if (index === id) {
        const data = {
          event_id: currentEvent.id,
          heading: item.heading
        };

        // redux action
        createEventHeading(JSON.stringify(data));
      }
    });
  }

  function handleRename(id, e) {
    e.stopPropagation();

    console.log(id);
  }

  function handleModal(id) {
    clearCurrentVideo(); //redux action
    setModalVisible(true);
    const updatedHeadings = [...mapData]; // get our array from the state

    // if our id matches the entry on the state
    updatedHeadings.filter((item, index) => {
      if (index === id) {
        //setCurrentSelectedHeadingx(item);
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
              />

              <div
                className="headingListActions"
                style={{
                  display: "flex",
                  marginBottom: 20
                }}
              >
                {/* <Button onClick={e => handleRename(idx, e)}>
                                        <Icon type="edit" />
                                        Rename
                                    </Button> */}

                <Button
                  type="primary"
                  onClick={e => {
                    saveEntry(idx, e);
                  }}
                >
                  <Icon type="save" />
                  Save
                </Button>

                <Button type="danger" onClick={e => handleDelete(idx, e)}>
                  <Icon type="delete" />
                </Button>
              </div>

              <h4>Video List</h4>
              <VideoListTable
                videosData={mapData[idx].videos}
                auth={auth}
                handleModal={handleModal}
              />

              <Button
                type="primary"
                onClick={() => handleModal(idx)}
                style={{ marginTop: 20 }}
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
    isVideoOnEditMode: state.cmeReducer.editVideoMode
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      createEventHeading: createEventHeading,
      fetchCurrentEvent: fetchCurrentEvent,
      deleteEventHeading: deleteEventHeading,
      clearCurrentVideo: clearCurrentVideo,
      setSelectedHeading: setSelectedHeading
    },
    dispatch
  );
};

const EventHighlightsFormWrapper = connect(
  mapStateToProps,
  mapDispatchToProps
)(formikEnhancer);

export default EventHighlightsFormWrapper;
