import React, { Fragment } from "react";
import { PageHeader } from "antd";

import Navbar from "../main-navigation/Navbar";
import AdminsTable from "./AdminsTable";

const SiteAdminManagement = props => {
  const pageTitle = "Administrator";

  return (
    <Fragment>
      <Navbar {...props} />
      <div style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />
        <AdminsTable />
      </div>
    </Fragment>
  );
};

export default SiteAdminManagement;
