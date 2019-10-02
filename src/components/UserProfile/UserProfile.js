import React, { Fragment } from "react";
import { Tabs } from "antd";
import WrappedUserInfoForm from "./UserInfoForm";
import WrappedChangePasswordForm from "./ChangePasswordForm";

const { TabPane } = Tabs;

const UserProfile = ({ id }) => {
  console.log(id);
  return (
    <Fragment>
      <h2>User profile</h2>

      <Tabs tabPosition={"left"}>
        <TabPane tab="User Information" key="1">
          <WrappedUserInfoForm />
        </TabPane>

        <TabPane tab="Change Password" key="2">
          <WrappedChangePasswordForm />
        </TabPane>
      </Tabs>
    </Fragment>
  );
};

export default UserProfile;
