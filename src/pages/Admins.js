import React from "react";
import DashboardLayout from "Pages/Layout/DashboardLayout";

import AdminsTable from "Components/Users/Admins/AdminsTable";

const Admins = props => {
  return (
    <DashboardLayout
      contentArea={<AdminsTable />}
      pageTitle={"Administrators"}
    />
  );
};

export default Admins;
