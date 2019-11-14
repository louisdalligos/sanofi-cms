import React, { Fragment } from "react";
import { PageHeader } from "antd";

import UsersTable from "./UsersTable";

const UserManagement = props => {
  const pageTitle = "Doctors";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <UsersTable />
      </div>
    </Fragment>
  );
};

export default UserManagement;
