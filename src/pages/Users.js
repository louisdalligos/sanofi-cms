import React from "react";
import DashboardLayout from "Pages/Layout/DashboardLayout";

import UsersDashboard from "Components/Users/UsersDashboard";

const Users = props => {
  return (
    <DashboardLayout contentArea={<UsersDashboard />} pageTitle={"Users"} />
  );
};

export default Users;
