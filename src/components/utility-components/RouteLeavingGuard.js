import React, { Fragment, useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import { Modal } from "antd";

const RouteLeavingGuard = ({ shouldBlockNavigation, navigate, when }) => {
  const [visible, setVisible] = useState(false);
  const [lastLocation, setlastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  useEffect(() => {
    //navigate(lastLocation.pathname);
  }, [lastLocation]);

  const showModal = location => {
    console.log("show modal location", location);
    setVisible(true);
    setlastLocation(location);
  };

  const closeModal = callback => {
    //console.log("close modal", callback);
    setVisible(false);
    // callback;
  };

  const handleBlockedNavigation = nextLocation => {
    console.log(nextLocation, "handle blocked navigation");
    if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
      showModal(nextLocation);
      return false;
    }

    return true;
  };

  const handleConfirmNavigationClick = () =>
    closeModal(() => {
      console.log("confirm ok last location", lastLocation);
      if (lastLocation) {
        setConfirmedNavigation(true);
      }
    });

  return (
    <Fragment>
      <Prompt when={when} message={handleBlockedNavigation} />
      <Modal
        title="Are you sure?"
        visible={visible}
        onOk={handleConfirmNavigationClick}
        onCancel={closeModal}
        okText="Yes, proceed"
        cancelText="Continue editing"
      >
        <p>Changes will not be saved</p>
      </Modal>
    </Fragment>
  );
};

export default RouteLeavingGuard;
