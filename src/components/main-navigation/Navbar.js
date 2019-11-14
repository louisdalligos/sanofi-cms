import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Icon, Drawer } from "antd";
import logo from "../../assets/logo.png";

// menu components
import MainMenu from "./MainMenu";
import ProfileMenu from "./ProfileMenu";

const Navbar = ({ ...props }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (isMobileMenuOpen) {
      console.log("drawer open");
    }
    return () => {
      console.log("Unmounting");
      document.body.setAttribute("width", "100%");
    };
    // eslint-disable-next-line
  }, [isMobileMenuOpen]);

  // Mobile menu trigger
  const handleMobileMenuTrigger = () => {
    console.log("mobile menu");
    setIsMobileMenuOpen(true);
  };

  // Handle drawer menu close
  const handleDrawerClose = () => {
    setIsMobileMenuOpen(false);
  };

  const handle = e => {
    console.log("closed", e);
    setIsMobileMenuOpen(e);
  };

  return (
    <Fragment>
      <div className="application-navigation-bar">
        <div className="logoSection">
          <span
            className="mobile-menu-trigger-icon"
            onClick={handleMobileMenuTrigger}
          >
            <Icon type="menu-unfold" />
          </span>

          <Link to="/">
            <img src={logo} alt="MD Corner" />
          </Link>
        </div>

        <MainMenu mode="horizontal" />

        <ProfileMenu {...props} />
      </div>

      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={handleDrawerClose}
        visible={isMobileMenuOpen}
        className="drawer-mobile-menu"
      >
        <MainMenu mode="inline" setDrawerVisibility={handle} />
      </Drawer>
    </Fragment>
  );
};

export default Navbar;
