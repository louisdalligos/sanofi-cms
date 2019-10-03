import React, { Fragment, useEffect, useContext, useMemo } from "react";
import { Layout } from "antd";

import AppBreadcrumb from "Components/Global/AppBreadcrumb/AppBreadcrumb";
import AppHeader from "Components/Global/AppHeader/AppHeader";

//@todo refactor to use redux
import AuthContext from "Context/auth/authContext";

const { Header, Content } = Layout;

const DashboardLayout = React.memo(({ contentArea, pageTitle }) => {
  // shouldComponentUpdate() {
  //   return false;
  // }

  useMemo(() => {
    return false;
  });

  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
          <h2>{pageTitle}</h2>
          {contentArea}
        </Content>
      </Layout>
    </Fragment>
  );
});

export default DashboardLayout;
