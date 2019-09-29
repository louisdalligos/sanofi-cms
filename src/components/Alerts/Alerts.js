import React, { useContext } from "react";
import AlertContext from "Context/alerts/alertContext";

import { Alert } from "antd";

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map(alert => (
      // <div key={alert.id} className={`alert alert-${alert.type}`}>
      //   {alert.message}
      // </div>

      <Alert message={alert.message} type={alert.type} />
    ))
  );
};

export default Alerts;
