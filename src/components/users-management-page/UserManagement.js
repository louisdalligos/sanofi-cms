import React, { Fragment } from "react";
import { PageHeader } from "antd";

import Navbar from "../main-navigation/Navbar";
import UsersTable from "./UsersTable";

const UserManagement = props => {
  const pageTitle = "Doctors";

  return (
    <Fragment>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <UsersTable />
      </div>
    </Fragment>
  );
};

export default UserManagement;
