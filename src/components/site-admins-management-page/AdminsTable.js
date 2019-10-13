import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Icon, Spin, Row, Table, Alert, Modal, message } from "antd";
import { Link } from "react-router-dom";

// redux actions import
import {
  fetchVerifiedAdmins,
  deleteAdmin
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const customIconLoading = <Icon type="loading" style={{ fontSize: 24 }} spin />;
const { confirm } = Modal;

const AdminsTable = ({
  verifiedAdmins,
  requestInProgress,
  fetchVerifiedAdmins,
  deleteAdmin,
  notifs,
  notifId,
  clearNotifications
}) => {
  const [columns] = useState([
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "id",
      sorter: true
    },
    {
      title: "View",
      rowKey: "id",
      render: (text, record) => (
        <Button type="link">
          <Link to={`/update-admin/${record.id}`}>
            <Icon type="eye" />
          </Link>
        </Button>
      )
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Position",
      dataIndex: "position",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Department",
      dataIndex: "department",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Verified since",
      dataIndex: "verified_since",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "email",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Archive",
      rowKey: "id",
      render: (text, record) => (
        <Button type="link" onClick={e => showDeleteConfirm(record.id, e)}>
          <Icon type="delete" />
        </Button>
      )
    }
  ]);

  //const [data, setData] = useState([]); // use data to store our api results and update the state of table

  useEffect(() => {
    if (!verifiedAdmins) {
      //setData(verifiedAdmins); // set data on state
      fetchVerifiedAdmins();
    }

    if (notifId) {
      // if (notifId === "DELETE_ADMIN_FAILED") {
      //     notifs.notifications.error
      //         ? message.error(notifs.notifications.error)
      //         : null;
      // } else if (notifId === "DELETE_ADMIN_SUCCESS") {
      //     message.success(notifs.notifications.success);
      // } else {
      //     return;
      // }
    }

    //eslint-disable-next-line
  }, [notifId]);

  if (requestInProgress || verifiedAdmins === null) {
    return (
      <div className="loading-container">
        <Spin indicator={customIconLoading} />
      </div>
    );
  }

  function showDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure archive this admin?",
      content: "Some descriptions here",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("OK deleted", id);
        deleteAdmin(id);
        //setData(verifiedAdmins);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  return (
    <Fragment>
      <Row>
        <Button type="primary" style={{ float: "right", zIndex: 500 }}>
          <Link to="/create-admin">New Profile</Link>
        </Button>
      </Row>
      <Row>
        <Table
          columns={columns}
          dataSource={verifiedAdmins}
          rowKey={record => record.id}
        />
      </Row>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    verifiedAdmins: state.superadmin.verifiedAdmins,
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer,
    notifId: state.notificationReducer.id
  };
};

export default connect(
  mapStateToProps,
  { fetchVerifiedAdmins, deleteAdmin, clearNotifications }
)(AdminsTable);
