import React, { useContext } from "react";
import { connect } from "react-redux";

import AuthContext from "Context/auth/authContext";
//import TherapyContext from "Context/therapy/therapyContext";

import { Avatar, Button } from "antd";

// redux action imports
import { clearArticles } from "Services/redux/actions/articleActions";

const MyProfileMenu = ({ clearArticles }) => {
  const authContext = useContext(AuthContext);
  //const therapyContext = useContext(TherapyContext);

  const { isAuthenticated, logout, user } = authContext;
  //const { clearArticles } = therapyContext;

  const onLogout = () => {
    clearArticles();
    logout();
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

const mapStateToProps = state => {
  return {
    article: state.articleState
  };
};
export default connect(
  mapStateToProps,
  { clearArticles }
)(MyProfileMenu);
