import React, { useContext } from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";

// redux action imports
import { clearArticles } from "Services/redux/actions/articleActions";
import { logout } from "Services/redux/actions/authActions";

const MyProfileMenu = ({ clearArticles, logout }) => {
  const onLogout = () => {
    clearArticles();
    logout();
  };

  return (
    <div className="profileMenu">
      <Avatar size="small" icon="user" />
      <span>Hello, welcome admin</span>
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
  { clearArticles, logout }
)(MyProfileMenu);
