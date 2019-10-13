import React, { Fragment, useEffect } from "react";
import { Layout, PageHeader } from "antd";
import { withRouter } from "react-router-dom";

import Navbar from "../main-navigation/Navbar";
import WrappedUpdateAdminForm from "./UpdateAdminForm";

const { Content } = Layout;

const UpdateAdminsPage = props => {
  const pageTitle = "Update an admin";

  return (
    <Fragment>
      <Navbar {...props} />
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />
        {/* pass the id to the form */}
        <WrappedUpdateAdminForm id={props.match.params.id} />
      </Content>
    </Fragment>
  );
};

export default withRouter(UpdateAdminsPage);
