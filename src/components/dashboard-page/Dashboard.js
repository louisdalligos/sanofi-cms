import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Card, Row, Col, Icon, List, Badge, Spin } from "antd";

import {
  fetchTotalMonthlyNewDoctors,
  fetchTotalActiveDoctors,
  fetchTotalBlockedDoctors,
  fetchTotalActiveAdmins,
  fetchTotalBlockedAdmins,
  fetchTotalCategories,
  fetchTotalSubCategories,
  fetchTotalTherapyArticles,
  fetchTotalProducts,
  fetchTotalEvents
} from "../../redux/actions/dashboard-actions/dashboardActions";

import {
  fetchSpecializations,
  fetchCategories,
  fetchSubCategories
} from "../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Dashboard";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const Dashboard = ({
  fetchCategories,
  fetchSpecializations,
  fetchSubCategories,
  fetchTotalMonthlyNewDoctors,
  fetchTotalActiveDoctors,
  fetchTotalBlockedDoctors,
  fetchTotalActiveAdmins,
  fetchTotalBlockedAdmins,
  fetchTotalCategories,
  fetchTotalSubCategories,
  fetchTotalTherapyArticles,
  fetchTotalProducts,
  fetchTotalEvents,
  dashboardData,
  currentUser,
  ...props
}) => {
  // component state
  const [monthlyUsersCount, setMonthlyUsersCount] = useState(null);
  const [totalActiveDoctors, setTotalActiveDoctors] = useState(null);
  const [totalBlockedDoctors, setTotalBlockedDoctors] = useState(null);
  const [totalActiveAdmins, setTotalActiveAdmins] = useState(null);
  const [totalBlockedAdmins, setTotalBlockedAdmins] = useState(null);

  const [newDoctors, setNewDoctors] = useState([]); // new doctors card on ui
  const [totalDoctorsData, setTotalDoctorsData] = useState([]); // total doctors cards on ui
  const [totalAdminsData, setTotalAdminsData] = useState([]); // total admins cards on ui

  const [totalProducts, setTotalProducts] = useState(null);
  const [totalArticles, setTotalArticles] = useState(null);
  const [totalEvents, setTotalEvents] = useState(null);
  const [totalCategories, setTotalCategories] = useState(null);
  const [totalSubcategories, setTotalSubcategories] = useState(null);

  const [role, setRole] = useState(null);
  useEffect(() => {
    fetchTotalMonthlyNewDoctors();
    fetchTotalActiveDoctors();
    fetchTotalBlockedDoctors();
    fetchTotalActiveAdmins();
    fetchTotalBlockedAdmins();
    fetchTotalCategories();
    fetchTotalSubCategories();
    fetchTotalTherapyArticles();
    fetchTotalProducts();
    fetchTotalEvents();

    fetchSpecializations();
    fetchCategories();
    fetchSubCategories();
    console.log(dashboardData);

    //setRole(props.role);
    return () => {
      // unmount
    };
  }, []);

  useEffect(() => {
    if (currentUser) {
      setRole(currentUser.role);
    }
    // eslint-disable-next-line
  }, [currentUser]);

  // effect for monthly count of registered doctors
  useEffect(() => {
    setMonthlyUsersCount(dashboardData.totalNewDoctorsMonthly);
    setTotalActiveDoctors(dashboardData.totalActiveDoctors);
    setTotalBlockedDoctors(dashboardData.totalBlockedDoctors);
    setTotalActiveAdmins(dashboardData.totalActiveAdmins);
    setTotalBlockedAdmins(dashboardData.totalBlockedAdmins);
    setTotalArticles(dashboardData.totalTherapyArticles);
    setTotalProducts(dashboardData.totalProducts);
    setTotalEvents(dashboardData.totalEvents);
    setTotalCategories(dashboardData.totalCategories);
    setTotalSubcategories(dashboardData.totalSubcategories);

    if (monthlyUsersCount !== 0) {
      let arr = [];

      arr.push(
        // {
        //     label: "Pending Email Validation",
        //     value: 0 // set our count coming from state
        // },
        {
          label: "New This Month",
          value: monthlyUsersCount // set our count coming from state
        }
      );

      setNewDoctors(arr); // set our state
      console.log(arr);
    }

    if (totalActiveDoctors !== 0 || totalBlockedDoctors !== 0) {
      let arr = [];

      arr.push(
        {
          label: "Active",
          value: totalActiveDoctors // set our count coming from state
        },
        {
          label: "Blocked",
          value: totalBlockedDoctors // set our count coming from state
        }
      );

      setTotalDoctorsData(arr); // set our state
    }

    if (totalActiveAdmins !== 0 || totalBlockedAdmins !== 0) {
      let arr = [];

      arr.push(
        {
          label: "Active",
          value: totalActiveAdmins // set our count coming from state
        },
        {
          label: "Blocked",
          value: totalBlockedAdmins // set our count coming from state
        }
      );

      setTotalAdminsData(arr); // set our state
    }
  }, [dashboardData]);

  return (
    <Fragment>
      <div className="dashboard-layout">
        <PageHeader title={pageTitle} />

        <Row gutter={24}>
          {role !== "editor" ? (
            <Col xs={24} md={7}>
              <Card title="Users" bordered={false}>
                <div className="list-entry">
                  <h4>New Doctors</h4>

                  <List
                    className=""
                    itemLayout="horizontal"
                    dataSource={newDoctors}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta title={<span>{item.label}</span>} />
                        {console.log(item.value)}
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
                </div>

                <div className="list-entry">
                  <h4>Total Doctors</h4>
                  {dashboardData.totalActiveDoctors ? (
                    <List
                      className=""
                      itemLayout="horizontal"
                      dataSource={totalDoctorsData}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta title={<span>{item.label}</span>} />
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
                  ) : (
                    <Spin indicator={antIcon} />
                  )}
                </div>

                <div className="list-entry">
                  <h4>Total Administrators</h4>
                  {dashboardData.totalActiveAdmins ? (
                    <List
                      className=""
                      itemLayout="horizontal"
                      dataSource={totalAdminsData}
                      renderItem={item => (
                        <List.Item>
                          <List.Item.Meta title={<span>{item.label}</span>} />
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
                  ) : (
                    <Spin indicator={antIcon} />
                  )}
                </div>
              </Card>
            </Col>
          ) : null}

          <Col
            xs={role !== "editor" || role !== "editor" ? 24 : null}
            md={role !== "editor" || role !== "editor" ? 17 : null}
            span={role === "editor" ? 24 : null}
            //offset={role === "editor" ? 3 : null}
          >
            <Card title="Quick Links" bordered={false}>
              <Row gutter={24}>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h2>Therapy Areas</h2>
                    <span className="data-count">{totalArticles} articles</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h2>CME</h2>
                    <span className="data-count">{totalEvents} events</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h2>Academy</h2>
                    <span className="data-count">No data</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h2>Products</h2>
                    <span className="data-count">{totalProducts} products</span>
                  </div>
                </Col>
              </Row>
              <div className="spacing-line"></div>
              <Row gutter={24}>
                <h4 style={{ marginLeft: 15, marginBottom: 30 }}>
                  General Settings
                </h4>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h3>Specializations</h3>
                    <span className="data-count">No data</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h3>Categories/Illnessess</h3>
                    <span className="data-count">{totalCategories}</span>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="dashboard-card-item">
                    <h3>Subcategories/Sections</h3>
                    <span className="data-count">{totalSubcategories}</span>
                  </div>
                </Col>
                <Col md={6}>
                  {/* <div className="dashboard-card-item">
                                        <h3>Other tags</h3>
                                        <span className="data-count">
                                            No data
                                        </span>
                                    </div> */}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    dashboardData: state.dashboardReducer,
    currentUser: state.authReducer.user
  };
};

export default connect(
  mapStateToProps,
  {
    fetchTotalMonthlyNewDoctors,
    fetchTotalActiveDoctors,
    fetchTotalBlockedDoctors,
    fetchTotalActiveAdmins,
    fetchTotalBlockedAdmins,
    fetchTotalCategories,
    fetchTotalSubCategories,
    fetchTotalTherapyArticles,
    fetchTotalProducts,
    fetchTotalEvents,
    fetchSpecializations,
    fetchCategories,
    fetchSubCategories
  }
)(Dashboard);
