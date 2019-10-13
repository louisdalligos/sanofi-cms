import React, { Fragment } from "react";
import { Layout, PageHeader } from "antd";
import Navbar from "../main-navigation/Navbar";
import TherapyArticles from "./TherapyArticles";

const { Content } = Layout;

const TherapyAreas = props => {
  const pageTitle = "Therapy Areas";

  return (
    <Fragment>
      <Navbar {...props} />

      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />

        <TherapyArticles />
      </Content>
    </Fragment>
  );
};

export default TherapyAreas;
