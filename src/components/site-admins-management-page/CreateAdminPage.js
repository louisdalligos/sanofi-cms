import React, { Fragment } from "react";
import { Layout, PageHeader } from "antd";

import Navbar from "../main-navigation/Navbar";
import WrappedCreateAdminForm from "./CreateAdminForm";

const { Content } = Layout;

const CreateAdminsPage = props => {
  const pageTitle = "Create an admin";

  return (
    <Fragment>
      <Navbar {...props} />
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />
        <WrappedCreateAdminForm />
      </Content>
    </Fragment>
  );
};

export default CreateAdminsPage;
