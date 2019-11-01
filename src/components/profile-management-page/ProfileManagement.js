import React, { Fragment } from "react";
import { Layout, PageHeader, Tabs, Row, Col } from "antd";

import Navbar from "../main-navigation/Navbar";
import WrappedUserInfoForm from "./UserInfoForm";
import WrappedChangePasswordForm from "./ChangePasswordForm";

const { Content } = Layout;
const { TabPane } = Tabs;

const ProfileManagement = props => {
  const pageTitle = "User Profile Management";

  return (
    <Fragment>
      <Navbar {...props} />

      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        <Row>
          <Col>
            <Tabs tabPosition={"left"}>
              <TabPane tab="User Information" key="1">
                <WrappedUserInfoForm />
              </TabPane>

              <TabPane tab="Change Password" key="2">
                <WrappedChangePasswordForm />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default ProfileManagement;
