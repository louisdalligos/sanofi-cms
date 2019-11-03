import React, { Fragment, useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import { Modal } from "antd";

const RouteLeavingGuard = ({ shouldBlockNavigation, navigate, when }) => {
  const [visible, setVisible] = useState(false);
  const [lastLocation, setlastLocation] = useState(null);
  const [confirmedNavigation, setConfirmedNavigation] = useState(false);

  useEffect(() => {
    if (confirmedNavigation && !visible) {
      console.log(lastLocation.pathname);
      navigate(lastLocation.pathname);
    }
  }, [confirmedNavigation]);

  const showModal = location => {
    setVisible(true);
    setlastLocation(location);
  };

  const closeModal = (callback, ...params) => {
    setVisible(false);
    callback(params);
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
    closeModal(lastLocation => {
      console.log(lastLocation);
      if (lastLocation) {
        setConfirmedNavigation(true);
        // this.setState({
        //    confirmedNavigation: true
        // }, () => {
        //    // Navigate to the previous blocked location with your navigate function
        //    navigate(lastLocation.pathname)
        // })
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
