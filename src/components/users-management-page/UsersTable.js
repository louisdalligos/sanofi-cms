import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Row,
  Table,
  message,
  Select,
  Form,
  Input,
  Modal,
  Tooltip,
  Breadcrumb,
  Pagination
} from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions import
import {
  deleteUser,
  undoDeleteUser,
  fetchCurrentUser,
  unlockUser,
  blockUser
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { confirm } = Modal;
const { Option } = Select;
const Search = Input.Search;

const UsersTable = ({
  fetchCurrentUser,
  deleteUser,
  undoDeleteUser,
  unlockUser,
  blockUser,
  clearNotifications,
  notifs,
  auth
}) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "id",
      className: "status-column",
      width: 50,
      fixed: "left",
      filters: [
        { text: "Active", value: "active" },
        { text: "Pending", value: "pending" },
        { text: "Deleted", value: "deleted" },
        { text: "Locked", value: "locked" }
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (text, record) => (
        <Tooltip
          placement="top"
          title={
            record.status !== "locked"
              ? `Account is currently ${record.status}`
              : "Unlock this user"
          }
        >
          <Icon
            type={
              record.status === "active"
                ? "check"
                : record.status === "deleted"
                ? "exclamation"
                : record.status === "pending"
                ? "question-circle-o"
                : "unlock"
            }
            onClick={
              record.status === "locked" ? e => unlockUser(record.id) : null
            }
            style={
              record.status === "active"
                ? { color: "#92CD00" }
                : record.status === "pending"
                ? { color: "#1890ff" }
                : record.status === "deleted"
                ? { color: "red" }
                : record.status === "locked"
                ? { color: "black" }
                : null
            }
          />
        </Tooltip>
      )
    },
    {
      title: "View",
      rowKey: "id",
      className: "status-column",
      width: 50,
      render: (text, record) => (
        <Tooltip
          placement="top"
          title={
            record.status === "pending"
              ? "Account is still pending"
              : record.status === "deleted"
              ? "Account has been deleted"
              : "View/Update doctor's information"
          }
        >
          <Button
            type="link"
            onClick={e => handleSelectUser(record.id, e)}
            disabled={
              record.status === "pending" || record.status === "deleted"
                ? true
                : null
            }
          >
            <Link to={`/doctors/${record.id}`}>
              <Icon type="eye" />
            </Link>
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      rowKey: "id",
      sorter: true,
      render: (text, record) => (
        <Button
          type="link"
          onClick={e => handleSelectUser(record.id, e)}
          disabled={
            record.status === "pending" || record.status === "deleted"
              ? true
              : null
          }
        >
          <Link to={`/doctors/${record.id}`}> {record.fullname} </Link>
        </Button>
      )
    },
    {
      title: "PRC #",
      dataIndex: "prc_number",
      rowKey: "id",
      sorter: true
    },
    {
      title: "CPD Points",
      dataIndex: "cpd_point",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Email",
      dataIndex: "email",
      rowKey: "id",
      width: 100,
      sorter: true
    },
    {
      title: "Mobile No.",
      dataIndex: "mobile_number",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Verified since",
      dataIndex: "email_verified_at",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Archive",
      rowKey: "id",
      render: (text, record) => (
        <Tooltip
          placement="right"
          title={
            record.status === "pending"
              ? "Account is still pending"
              : record.status === "deleted"
              ? "Account has been deleted"
              : "Delete this user?"
          }
        >
          <Button
            type="danger"
            onClick={e => showDeleteConfirm(record.id, e)}
            disabled={
              record.status === "pending" || record.status === "deleted"
                ? true
                : null
            }
          >
            <Icon type="delete" />
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Block",
      rowKey: "id",
      className: "status-column",
      render: (text, record) => (
        <Tooltip
          placement="right"
          title={
            record.status === "pending"
              ? "Account is still pending"
              : record.status === "deleted"
              ? "Account has been deleted"
              : record.status === "locked"
              ? "Account is blocked"
              : "Block this user?"
          }
        >
          <Button
            type="danger"
            onClick={e => showBlockConfirm(record.id, e)}
            disabled={
              record.status === "pending" ||
              record.status === "deleted" ||
              record.status === "locked"
                ? true
                : null
            }
          >
            <Icon type="close-circle" />
          </Button>
        </Tooltip>
      )
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(); // fetch initial
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/users`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      params: params
    })
      .then(response => {
        console.log("response: ", response);
        setTotal(response.data.info.total_count); // get total count from server and set to state
        setLoading(false);
        setData(response.data.results);
      })
      .catch(err => {
        setLoading(false);
        message.error(
          err && err.response.data.error
            ? err.response.data.error
            : "There was an error in processing your request"
        );
      });
  };

  // this fetch is for filters @todo - refactor to redux - see the redundancy on filter function
  const filterFetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/users`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      params: params
    })
      .then(response => {
        setLoading(false);
        if (response.data.success == "No results found") {
          setTotal(0);
          message.error("No results found");
        } else {
          setTotal(
            response.data && response.data.info.result_count
              ? response.data.info.result_count
              : null
          ); // get total count from server and set to state
        }

        setData(response.data.results ? response.data.results : []);
      })
      .catch(err => {
        setLoading(false);
        message.error(
          err && err.response.data.error
            ? err.response.data.error
            : "There was an error in processing your request"
        );
      });
  };

  useEffect(() => {
    switch (notifs.id) {
      case "UNLOCK_USER_FAILED":
      case "BLOCK_USER_FAILED":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );
        clearNotifications();
        break;
      case "UNLOCK_USER_SUCCESS":
      case "BLOCK_USER_SUCCESS":
        message.success(notifs.notifications.success);
        clearNotifications();
        setTimeout(() => {
          fetch();
          setPageNumber(1);
        }, 1000);
        break;
      case "DELETE_USER_FAILED":
        notifs.notifications.error
          ? message.error(notifs.notifications.error)
          : message.error("There was an error in processing your request");
        clearNotifications();
        break;
      case "DELETE_USER_SUCCESS":
        message.success(notifs.notifications.success);
        fetch(); // call our api to fetch updated data
        setPageNumber(1);
        clearNotifications(); // cleanup our notification object
        break;
      case "UNDO_DELETE_USER_FAILED":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );
        clearNotifications();
        break;
      case "UNDO_DELETE_USER_SUCCESS":
        message.success(notifs.notifications.success);
        fetch(); // call our api to fetch updated data
        setPageNumber(1);
        clearNotifications(); // cleanup our notification object
        break;
      case "FETCH_CURRENT_USER_FAILED":
        message.error(notifs.notifications.error);
        clearNotifications(); // cleanup our notification object
        break;
      default:
        return;
    }
    // eslint-disable-next-line
  }, [notifs.id]);

  function showBlockConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to block this user?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log("OK deleted", id);
        blockUser(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure yout want to archive this user?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log("OK deleted", id);
        deleteUser(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showUndoDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to revert back to active status?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log("OK undo deleted", id);
        undoDeleteUser(id); // redux action
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function onSearch(e) {
    console.log(e);
    let obj = { search: e };
    filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
  }

  function handleSelectUser(id, e) {
    e.stopPropagation();
    console.log("View user", id);
    fetchCurrentUser(id);
  }

  function itemRender(current, type, originalElement) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  function onPagerChange(pageNumber) {
    let obj = { page: pageNumber, per_page: pageSize };
    fetch({ ...obj });
    setPageNumber(pageNumber);
  }

  function onPageSizeChange(current, pageSize) {
    setPageSize(pageSize); // set the page size to update the state
    let obj = { per_page: pageSize };
    fetch({ ...obj });
  }

  function onSelectChange(e) {
    let obj = { accessed: e };
    filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
  }

  // handle table sort
  const handleTableChange = (pagination, filters, sorter) => {
    const obj = {
      order_by_field: sorter.field,
      order_by_sort: sorter.order && sorter.order === "ascend" ? "ASC" : "DESC"
    };
    filterFetch({ ...obj });
  };

  return (
    <Fragment>
      <div className="page-breadcrumb">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item key="users">Users</Breadcrumb.Item>
            <Breadcrumb.Item key="doctors">
              <Link to="/doctors">Doctors</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div>
          <Button type="primary">
            <Link to="/doctors/create">New Profile</Link>
          </Button>
        </div>
      </div>
      <Row>
        <div className="filter-table-wrapper">
          <Form layout="inline">
            <Form.Item label="Specializations">
              <Select defaultValue="All specializations" style={{ width: 150 }}>
                <Option value="1">Specialization 1</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Accessed">
              <Select
                defaultValue="anytime"
                style={{ width: 200 }}
                onChange={onSelectChange}
              >
                <Option value="anytime">Anytime</Option>
                <Option value="today">Today</Option>
                <Option value="within_seven_days">Within 7 days</Option>
                <Option value="within_thirty_days">Within 30 days</Option>
                <Option value="not_within_365_days">Not within 365 days</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Search
                placeholder="name, email..."
                onSearch={onSearch}
                style={{ width: 250 }}
              />
            </Form.Item>
          </Form>
        </div>
      </Row>
      <Row>
        <Table
          columns={columns}
          rowKey={record => record.id}
          dataSource={data}
          pagination={false}
          loading={loading}
          onChange={handleTableChange}
          size="small"
          locale={{ emptyText: "No result found" }}
          scroll={{ x: 1100 }}
        />

        {!loading ? (
          <Pagination
            showQuickJumper
            showSizeChanger
            pageSizeOptions={["10", "25", "50", "100"]}
            total={total}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
            pageSize={pageSize}
            defaultCurrent={pageNumber}
            itemRender={itemRender}
            onChange={onPagerChange}
            onShowSizeChange={onPageSizeChange}
            size="small"
            className="table-pagination-custom"
          />
        ) : null}
      </Row>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    siteUsers: state.superadmin.siteUsers,
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentUser,
    deleteUser,
    undoDeleteUser,
    unlockUser,
    blockUser,
    clearNotifications
  }
)(UsersTable);
