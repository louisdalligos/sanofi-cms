import React, { Fragment, useState } from "react";
import { Timeline, Button, Layout, PageHeader } from "antd";
import Navbar from "../main-navigation/Navbar";

const { Content } = Layout;

const Dashboard = props => {
  const [reverse, setReverse] = useState(false);

  const pageTitle = "Dashboard";

  const handleClick = () => {
    setReverse({ reverse: !reverse });
  };

  return (
    <Fragment>
      <Navbar {...props} />

      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <PageHeader title={pageTitle} />

        <div>
          <Timeline pending="Recording..." reverse={reverse}>
            <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
            <Timeline.Item>
              Solve initial network problems 2015-09-01
            </Timeline.Item>
            <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
          </Timeline>
          <Button
            type="primary"
            style={{ marginTop: 16 }}
            onClick={handleClick}
          >
            Toggle Reverse
          </Button>
        </div>
      </Content>
    </Fragment>
  );
};

export default Dashboard;
