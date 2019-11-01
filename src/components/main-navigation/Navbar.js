import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Menu, Avatar, Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

// redux action imports
//import { clearArticles } from "../../redux/actions/post-management-actions/postManagementActions"; // clear current state data @todo add rest of state
import { logout } from "../../redux/actions/auth-actions/authActions";

const { SubMenu } = Menu;

const Navbar = ({ logout, currentUser, ...props }) => {
  const [current, setCurrent] = useState("mail");

  useEffect(() => {
    //console.log(currentUser, "Current user from navbar");
  }, [currentUser]);

  const onLogout = () => {
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
          {(currentUser && currentUser.role === "superadmin") ||
          (currentUser && currentUser.role === "admin") ? (
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <Link to="/doctors">Users</Link>
                </span>
              }
            >
              <Menu.Item key="doctors">
                <Link to="/doctors">Doctors</Link>
              </Menu.Item>
              {currentUser && currentUser.role === "superadmin" ? (
                <Menu.Item key="cpd-management" className="third-level-menu">
                  CPD Management
                </Menu.Item>
              ) : null}
              {currentUser && currentUser.role === "superadmin" ? (
                <Menu.Item key="admins">
                  <Link to="/admins">Site Admins</Link>
                </Menu.Item>
              ) : null}
            </SubMenu>
          ) : null}
          <SubMenu
            title={<span className="submenu-title-wrapper">Content</span>}
          >
            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item key="general-settings">General Settings</Menu.Item>
            ) : null}

            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item
                key="doctor-specialization"
                className="third-level-menu"
              >
                <Link to="/doctor-specialization">Doctor Specialization</Link>
              </Menu.Item>
            ) : null}

            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item key="categories" className="third-level-menu">
                <Link to="/categories">Categories/Illnesses</Link>
              </Menu.Item>
            ) : null}

            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item key="subcategories" className="third-level-menu">
                <Link to="/sub-categories">Subcategories/Sections</Link>
              </Menu.Item>
            ) : null}

            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item key="other-tags" className="third-level-menu">
                <Link to="/other-tags">Other Tags</Link>
              </Menu.Item>
            ) : null}

            <Menu.Item key="therapy-areas">
              <Link to="/therapy-areas">Therapy Areas</Link>
            </Menu.Item>

            <Menu.Item key="cme">
              <Link to="/cme">CME</Link>
            </Menu.Item>
            {currentUser && currentUser.role !== "editor" ? (
              <Menu.Item key="academy">
                <Link to="/academy">Academy</Link>
              </Menu.Item>
            ) : null}

            <Menu.Item key="products">
              <Link to="/products">Products</Link>
            </Menu.Item>
          </SubMenu>

          {currentUser && currentUser.role !== "editor" ? (
            <SubMenu
              title={<span className="submenu-title-wrapper">Settings</span>}
            >
              <Menu.Item key="general-settings">General Settings</Menu.Item>
              <Menu.Item key="highlights">Home Page Highlights</Menu.Item>
              <Menu.Item key="site-header-footer">
                Site Header &amp; Footer
              </Menu.Item>
              <Menu.Item key="site-logo-seo">Site Logo, General SEO</Menu.Item>
              <Menu.Item key="email-notifications">
                Email Notifications
              </Menu.Item>
            </SubMenu>
          ) : null}
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
          <Link to="/profile">
            {currentUser && currentUser.fullname ? currentUser.fullname : null}
          </Link>
        </span>
        <Button type="link" onClick={onLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    currentUser: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
