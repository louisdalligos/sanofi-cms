import React, { Fragment } from "react";
import { connect } from "react-redux";
import { PageHeader, Card, Row, Col, Icon, List } from "antd";

const pageTitle = "Dashboard";

const Dashboard = ({ ...props }) => {
  const list = [
    {
      label: "Pending email validation",
      value: 2
    },
    {
      label: "New This Month",
      value: 20
    }
  ];

  const list2 = [
    {
      label: "All time",
      value: 2
    },
    {
      label: "Active",
      value: 20
    },
    {
      label: "Blocked",
      value: 20
    }
  ];

  const list3 = [
    {
      label: "All time",
      value: 2
    },
    {
      label: "Active",
      value: 20
    },
    {
      label: "Blocked",
      value: 20
    }
  ];
  return (
    <Fragment>
      <div className="dashboard-layout">
        <PageHeader title={pageTitle} />

        <Row gutter={24}>
          <Col xs={24} md={8}>
            <Card title="Users" bordered={false}>
              <div className="list-entry">
                <h4>New Doctors</h4>
                <List
                  className=""
                  itemLayout="horizontal"
                  dataSource={list}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={<a href="#">{item.label}</a>} />
                      <div>{item.value}</div>
                    </List.Item>
                  )}
                />
              </div>

              <div className="list-entry">
                <h4>Total Doctors</h4>
                <List
                  className=""
                  itemLayout="horizontal"
                  dataSource={list2}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={<a href="#">{item.label}</a>} />
                      <div>{item.value}</div>
                    </List.Item>
                  )}
                />
              </div>

              <div className="list-entry">
                <h4>Total Administrators</h4>
                <List
                  className=""
                  itemLayout="horizontal"
                  dataSource={list3}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={<a href="#">{item.label}</a>} />
                      <div>{item.value}</div>
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} md={16}>
            <Card title="Quick Links" bordered={false}>
              <p>Card content</p>
              <p>Card content</p>
              <p>Card content</p>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(Dashboard);
