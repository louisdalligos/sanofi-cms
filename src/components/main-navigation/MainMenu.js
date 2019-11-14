import React, { useState } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const MainMenu = ({ user, ...props }) => {
  const [current, setCurrent] = useState("dashboard");

  const handleMenuClick = e => {
    console.log("click ", e.key);
    setCurrent(e.key);
    props.setDrawerVisibility(false);
  };

  return (
    <div className="menuSection">
      <Menu
        selectedKeys={[current]}
        mode={props.mode}
        style={{ background: "#FFF" }}
        onClick={handleMenuClick}
      >
        <Menu.Item key="dashboard">
          <Link to="/">Dashboard</Link>
        </Menu.Item>

        {(user && user.role === "superadmin") ||
        (user && user.role === "admin") ? (
          <SubMenu title={<span className="submenu-title-wrapper">Users</span>}>
            <Menu.Item key="doctors">
              <Link to="/doctors">Doctors</Link>
            </Menu.Item>
            {user && user.role === "superadmin" ? (
              <Menu.Item key="cpd-management" className="third-level-menu">
                CPD Management
              </Menu.Item>
            ) : null}
            {user && user.role === "superadmin" ? (
              <Menu.Item key="admins">
                <Link to="/admins">Site Admins</Link>
              </Menu.Item>
            ) : null}
          </SubMenu>
        ) : null}
        <SubMenu title={<span className="submenu-title-wrapper">Content</span>}>
          {user && user.role !== "editor" ? (
            <Menu.Item key="general-settings">General Settings</Menu.Item>
          ) : null}

          {user && user.role !== "editor" ? (
            <Menu.Item key="doctor-specialization" className="third-level-menu">
              <Link to="/doctor-specialization">Doctor Specialization</Link>
            </Menu.Item>
          ) : null}

          {user && user.role !== "editor" ? (
            <Menu.Item key="categories" className="third-level-menu">
              <Link to="/categories">Categories/Illnesses</Link>
            </Menu.Item>
          ) : null}

          {user && user.role !== "editor" ? (
            <Menu.Item key="subcategories" className="third-level-menu">
              <Link to="/sub-categories">Subcategories/Sections</Link>
            </Menu.Item>
          ) : null}

          {user && user.role !== "editor" ? (
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
          {user && user.role !== "editor" ? (
            <Menu.Item key="academy">
              <Link to="/academy">Academy</Link>
            </Menu.Item>
          ) : null}

          <Menu.Item key="products">
            <Link to="/products">Products</Link>
          </Menu.Item>
        </SubMenu>

        {user && user.role !== "editor" ? (
          <SubMenu
            title={<span className="submenu-title-wrapper">Settings</span>}
          >
            <Menu.Item key="general-settings">General Settings</Menu.Item>
            <Menu.Item key="highlights">Home Page Highlights</Menu.Item>
            <Menu.Item key="site-header-footer">
              Site Header &amp; Footer
            </Menu.Item>
            <Menu.Item key="site-logo-seo">Site Logo, General SEO</Menu.Item>
            <Menu.Item key="email-notifications">Email Notifications</Menu.Item>
          </SubMenu>
        ) : null}
      </Menu>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    user: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  null
)(MainMenu);
