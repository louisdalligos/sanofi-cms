import React, { Fragment } from "react";

import logo from "Assets/logo.png";
import "./appHeader.scss";
import AppHeaderMenu from "../AppHeaderMenu/AppHeaderMenu";
import MyProfileMenu from "../MyProfileMenu/MyProfileMenu";

// Import our child components
//import MyProfileMenu from "Components/MyProfileMenu/MyProfileMenu";
//import AppHeaderMenu from "Components/AppHeaderMenu/AppHeaderMenu";

const AppHeader = () => {
  return (
    <Fragment>
      <div className="logoSection">
        <img src={logo} alt="MD Corner" />
      </div>
      <AppHeaderMenu />
      <MyProfileMenu />
    </Fragment>
  );
};

export default AppHeader;
