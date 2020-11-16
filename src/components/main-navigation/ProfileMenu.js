import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Icon } from "antd";

import { logout } from "../../redux/actions/auth-actions/authActions";

const ProfileMenu = ({ user, logout, ...props }) => {
    // Profile menu click action
    const handleProfileMenuClick = ({ key }) => {
        console.log(key);
        //message.info(`Click on item ${key}`);
        if (key === "profile-settings") {
            props.history.push("/profile");
        } else if (key === "logout") {
            logout();
        }
    };

    // Menu items
    const profileMenu = (
        <Menu onClick={handleProfileMenuClick}>
            <Menu.Item key="profile-settings">
                <Icon type="user" />
                Account Settings
            </Menu.Item>
            <Menu.Item key="logout">
                <Icon type="logout" />
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="profileMenu">
            <Dropdown overlay={profileMenu} className="profile-menu-dropdown">
                <span>
                    Welcome,{" "}
                    <Link to="/profile">
                        {user && user.fullname ? user.fullname : null}
                    </Link>
                </span>
            </Dropdown>
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
    { logout }
)(ProfileMenu);
