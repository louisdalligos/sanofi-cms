import React, { Fragment } from "react";
import { PageHeader, Row, Col, Card, Icon, List, Badge } from "antd";

const list = [
  {
    label: "Pending email validation",
    value: 2
  },
  {
    label: "New This Month",
    value: 20
  },
  {
    label: "New This Year",
    value: 350
  }
];

const list2 = [
  {
    label: "All time",
    value: 4123
  },
  {
    label: "Active",
    value: 4103
  },
  {
    label: "Blocked",
    value: 26
  },
  {
    label: "Deleted",
    value: 16
  }
];

const list3 = [
  {
    label: "Accessed Today",
    value: 34
  },
  {
    label: "Accessed within 7 days",
    value: 235
  }
];

const UsersDashboard = () => {
  const pageTitle = "Users";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        <Row gutter={16}>
          <h2 style={{ marginLeft: 10 }}>
            <Icon type="user" /> Doctors
          </h2>
          <Col span={8}>
            <Card title="New Doctors" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "#87d068"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Doctors" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list2}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "#2db7f5"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Site Access" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list3}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "orange"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={16} style={{ marginTop: 30 }}>
          <h2 style={{ marginLeft: 10 }}>
            <Icon type="user" /> Admins
          </h2>
          <Col span={8}>
            <Card title="New Admins" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "#2db7f5"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Total Site Admins" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list2}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "lime"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Site Access" bordered={false}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={list3}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta title={<a href="#">{item.label}</a>} />
                    <Badge
                      count={item.value}
                      style={{
                        backgroundColor: "purple"
                      }}
                      showZero
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default UsersDashboard;
