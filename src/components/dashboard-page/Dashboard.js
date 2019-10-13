import React, { Fragment, useState } from "react";
import { Timeline, Button, Layout, PageHeader, Card } from "antd";
import Navbar from "../main-navigation/Navbar";

const { Content } = Layout;

const Dashboard = props => {
  const [reverse, setReverse] = useState(false);

  const pageTitle = "Dashboard";

  return (
    <Fragment>
      <Navbar {...props} />

      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />

        <div>
          <Card
            size="small"
            title="Small size card"
            extra={<a href="#">More</a>}
            style={{ width: 300 }}
          >
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </Content>
    </Fragment>
  );
};

export default Dashboard;
