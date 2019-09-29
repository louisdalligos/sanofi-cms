import React, { useContext } from "react";

import AuthContext from "Context/auth/authContext";

import { Avatar, Button } from "antd";

const MyProfileMenu = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  };

  return (
    <div className="profileMenu">
      <Avatar size="small" icon="user" />
      <p>Hello, welcome {user && user.name}</p>
      <Button type="link" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default MyProfileMenu;
