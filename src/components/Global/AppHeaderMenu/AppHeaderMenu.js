import React, { useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const AppHeaderMenu = () => {
  const [current, setCurrent] = useState("mail");

  const handleClick = () => {
    console.log("menu click");
  };

  return (
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
          <Menu.Item key="site-admins">
            <Link to="/admins">Site Admins</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu title={<span className="submenu-title-wrapper">Content</span>}>
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
  );
};

export default AppHeaderMenu;
