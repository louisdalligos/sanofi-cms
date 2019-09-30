import React, { useContext, useEffect } from "react";
import { Layout } from "antd";

import AppBreadcrumb from "Components/Global/AppBreadcrumb/AppBreadcrumb";
import AppHeader from "Components/Global/AppHeader/AppHeader";

import AuthContext from "Context/auth/authContext";

import TherapyArticles from "Components/TherapyArticles/TherapyArticles";
import ArticleForm from "Components/TherapyArticles/ArticleForm";

const { Header, Content } = Layout;

const Dashboard = props => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
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
        <div style={{ background: "#fff", marginTop: 50, minHeight: 380 }}>
          <h1>Dashboard</h1>

          <div>
            <TherapyArticles />
          </div>

          <ArticleForm />
        </div>
      </Content>
    </Layout>
  );
};

export default Dashboard;
