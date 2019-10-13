import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

// redux action imports
//import { clearArticles } from "../../redux/actions/post-management-actions/postManagementActions"; // clear current state data @todo add rest of state
import { logout } from "../../redux/actions/auth-actions/authActions";

const { SubMenu } = Menu;

const Navbar = ({ logout }) => {
  const [current, setCurrent] = useState("mail");

  const onLogout = () => {
    //clearArticles();
    logout();
  };

  return (
    <div className="application-navigation-bar">
      <div className="logoSection">
        <img src={logo} alt="MD Corner" />
      </div>

      <div className="menuSection">
        <Menu
          selectedKeys={[current]}
          mode="horizontal"
          style={{ background: "#FFF" }}
        >
          <Menu.Item key="dashboard">
            <Link to="/">Dashboard</Link>
          </Menu.Item>
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <Link to="/users">Users</Link>
              </span>
            }
          >
            <Menu.Item key="doctors">
              <Link to="/doctors">Doctors</Link>
            </Menu.Item>
            <Menu.Item key="cpd-management">CPD Management</Menu.Item>
            <Menu.Item key="admins">
              <Link to="/admins">Site Admins</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            title={<span className="submenu-title-wrapper">Content</span>}
          >
            <Menu.Item key="general-settings">General Settings</Menu.Item>
            <li className="ant-menu-item">
              <Link to="/therapyareas">Therapy Areas</Link>
            </li>
          </SubMenu>
          <SubMenu
            title={<span className="submenu-title-wrapper">Settings</span>}
          >
            <Menu.Item key="general-settings-s">General Settings</Menu.Item>
            <Menu.Item key="highlights">Home Page Highlights</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
      <div className="profileMenu">
        <Avatar
          size="small"
          src="https://randomuser.me/api/portraits/women/68.jpg"
          style={{ marginRight: 10 }}
        />
        <span>
          Logged in
          <Link to="/profile">Admin</Link>
        </span>
        <Button type="link" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
