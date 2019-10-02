import React, { Component, Fragment } from "react";
import { Layout } from "antd";

import AppBreadcrumb from "Components/Global/AppBreadcrumb/AppBreadcrumb";
import AppHeader from "Components/Global/AppHeader/AppHeader";

const { Header, Content } = Layout;

export default class DashboardLayout extends Component {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return (
      <Fragment>
        <Layout>
          <Header
            style={{
              position: "fixed",
              zIndex: 1,
              width: "100%",
              background: "#FFF"
            }}
          >
            <AppHeader />
          </Header>
          <Content style={{ padding: "0 50px", marginTop: 64 }}>
            <AppBreadcrumb />

            {this.props.contentArea}
          </Content>
          >
        </Layout>
      </Fragment>
    );
  }
}
