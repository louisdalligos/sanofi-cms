import React, { useContext, useEffect } from "react";

import AuthContext from "Context/auth/authContext";

const Dashboard = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, welcome {user && user.name}</p>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
