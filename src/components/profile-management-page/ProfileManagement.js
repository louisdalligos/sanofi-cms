import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, PageHeader, Tabs, Row } from "antd";

import Navbar from "../main-navigation/Navbar";
import WrappedUserInfoForm from "./UserInfoForm";
import WrappedChangePasswordForm from "./ChangePasswordForm";

const { Content } = Layout;
const { TabPane } = Tabs;

const ProfileManagement = props => {
  const pageTitle = "User Profile Management";

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Navbar {...props} />

      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />

        <Row>
          <Tabs tabPosition={"left"}>
            <TabPane tab="User Information" key="1">
              <WrappedUserInfoForm />
            </TabPane>

            <TabPane tab="Change Password" key="2">
              <WrappedChangePasswordForm />
            </TabPane>
          </Tabs>
        </Row>
      </Content>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    user: state.userMaintenanceReducer.user
  };
};
export default connect(mapStateToProps)(ProfileManagement);
