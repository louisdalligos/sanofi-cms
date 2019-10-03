import React, { useContext } from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";

import AuthContext from "Context/auth/authContext";

// redux action imports
import { clearArticles } from "Services/redux/actions/articleActions";
//import { logout } from "Services/redux/actions/authActions";

const MyProfileMenu = ({ clearArticles }) => {
  const authContext = useContext(AuthContext);

  const { logout, user } = authContext;

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
