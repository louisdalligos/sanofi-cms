import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout, PageHeader, Card } from "antd";
import Navbar from "../main-navigation/Navbar";
const { Content } = Layout;

const Dashboard = ({ ...props }) => {
  const pageTitle = "Dashboard";

  return (
    <Fragment>
      <Navbar {...props} />

      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        <div>
          <Card size="small" title="Small size card" style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
