import React, { useContext } from "react";

import AuthContext from "Context/auth/authContext";
import TherapyContext from "Context/therapy/therapyContext";

import { Avatar, Button } from "antd";

const MyProfileMenu = () => {
  const authContext = useContext(AuthContext);
  const therapyContext = useContext(TherapyContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearArticles } = therapyContext;

  const onLogout = () => {
    logout();
    clearArticles();
  };

  return (
    <div className="profileMenu">
      <Avatar size="small" icon="user" />
      <span>Hello, welcome {user && user.name}</span>
      <Button type="link" onClick={onLogout}>
        Logout
      </Button>
    </div>
  );
};

export default MyProfileMenu;
