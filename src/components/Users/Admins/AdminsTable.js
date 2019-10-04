import React, { Fragment, useContext, useState, useEffect } from "react";
import { Table, Button, Spin, Icon, Modal } from "antd";

// redux actions import
//import { fetchArticles } from "Services/redux/actions/articleActions";

const customIconLoading = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const AdminsTable = props => {
  const [columns] = useState([
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
      key: "status"
    },
    {
      title: "View",
      render: (text, record) => (
        <Button type="link">
          <Icon type="eye" />
        </Button>
      )
    },
    {
      title: "Doctors Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "PRC#",
      dataIndex: "prc_number",
      key: "prc_number"
    },
    {
      title: "CPD Points",
      dataIndex: "cpd_points",
      key: "cpd_points"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile"
    },
    {
      title: "Verified Since",
      dataIndex: "verified_since",
      key: "verified_since"
    },
    {
      title: "Archive",
      render: (text, record) => (
        <Button type="link">
          <Icon type="delete" />
        </Button>
      )
    }
  ]);

  const dataSource = [
    {
      key: "1",
      status: "Pending",
      name: "John Doe",
      prc_number: 12586865,
      cpd_points: "987",
      email: "johndoe@test.com",
      mobile: "0983787388",
      verified_since: "Jan 1, 2019"
    },
    {
      key: "2",
      status: "For Deletion",
      name: "Test Account",
      prc_number: 56624415,
      cpd_points: "156",
      email: "test@test.com",
      mobile: "0981585388",
      verified_since: "Dec 15, 2019"
    }
  ];

  useEffect(() => {
    // fetchArticles();
    //eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Button type="primary" style={{ float: "right", zIndex: 500 }}>
        New Profile
      </Button>
      <Table columns={columns} dataSource={dataSource} />
    </Fragment>
  );
};

export default AdminsTable;
