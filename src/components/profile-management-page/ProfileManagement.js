import React, { Fragment } from "react";
import { PageHeader, Tabs, Row, Col } from "antd";

import WrappedUserInfoForm from "./UserInfoForm";
import WrappedChangePasswordForm from "./ChangePasswordForm";

const { TabPane } = Tabs;

const ProfileManagement = props => {
  const pageTitle = "User Profile Management";

  return (
    <Fragment>
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
