import React, { Fragment } from "react";
import { Layout, PageHeader } from "antd";
import Navbar from "../main-navigation/Navbar";
import TherapyAreasTable from "./TherapyAreasTable";

const { Content } = Layout;

const TherapyAreasManagement = props => {
  const pageTitle = "Therapy Areas";

  return (
    <Fragment>
      <Navbar {...props} />
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <TherapyAreasTable />
      </div>
    </Fragment>
  );
};

export default TherapyAreasManagement;
