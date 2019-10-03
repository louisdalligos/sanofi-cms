import React from "react";
import DashboardLayout from "Pages/Layout/DashboardLayout";

import UserProfile from "Components/UserProfile/UserProfile";

const Profile = props => {
  return (
    <DashboardLayout contentArea={<UserProfile />} pageTitle={"User Profile"} />
  );
};

export default Profile;
