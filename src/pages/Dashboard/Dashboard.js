import React, { useContext, useEffect } from "react";

import AuthContext from "Context/auth/authContext";

const Dashboard = props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
