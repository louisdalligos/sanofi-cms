import React, { useContext } from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";
import { Link } from "react-router-dom";

import AuthContext from "Context/auth/authContext";

// redux action imports
import { clearArticles } from "Actions/articleActions";
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
      <span>
        Hello, welcome <Link to="/profile/1">{user && user.name}</Link>
      </span>
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
