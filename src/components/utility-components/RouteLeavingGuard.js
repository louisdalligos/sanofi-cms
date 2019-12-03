import React, { useState, useEffect } from "react";
import { Prompt } from "react-router-dom";
import { Modal } from "antd";

const RouteLeavingGuard = ({ shouldBlockNavigation, navigate, when }) => {
    const [lastLocation, setlastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    useEffect(() => {
        // check if user confirmed, then set the pathname to prop on the form
        if (confirmedNavigation) {
            navigate(lastLocation.pathname);
        }
    }, [lastLocation, navigate, confirmedNavigation]);

    const handleBlockedNavigation = nextLocation => {
        if (!confirmedNavigation && shouldBlockNavigation(nextLocation)) {
            setlastLocation(nextLocation);
            Modal.confirm({
                title: "Are you sure?",
                content: "Changes will not be saved",
                okText: "Yes, proceed",
                cancelText: "Continue editing",
                onOk() {
                    setConfirmedNavigation(true);
                },
                onCancel() {
                    console.log("Cancel");
                }
            });
            return false;
        }

        return true;
    };

    return <Prompt when={when} message={handleBlockedNavigation} />;
};

export default RouteLeavingGuard;
