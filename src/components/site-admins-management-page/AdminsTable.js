import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  Icon,
  Table,
  message,
  Modal,
  Tooltip,
  Pagination,
  Tag
} from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions import
import {
  deleteAdmin,
  undoDeleteAdmin,
  fetchCurrentAdmin,
  unlockAdmin
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// Table components
import AdminsTableFilter from "./AdminsTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";

const { confirm } = Modal;

const AdminsTable = ({
  fetchCurrentAdmin,
  deleteAdmin,
  undoDeleteAdmin,
  unlockAdmin,
  notifs,
  clearNotifications,
  auth
}) => {
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "id",
      className: "status-column",
      sorter: true,
      width: 80,
      render: (text, record) => (
        <div>
          <Tag
            color={
              record.status === "active"
                ? "green"
                : record.status === "deleted"
                ? "volcano"
                : record.status === "pending"
                ? "geekblue"
                : "black"
            }
            key={record.id}
          >
            {text}
          </Tag>
        </div>
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
          onClick={e => handleSelectAdmin(record.id, e)}
          disabled={record.status === "pending" ? true : null}
        >
          <Link to={`/admins/${record.id}`}>{text}</Link>
        </Button>
      )
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
      dataIndex: "registration_completed_at",
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
      title: "Actions",
      rowKey: "id",
      width: 120,
      className: "table-action-column",
      render: (text, record) => (
        <div>
          {record.status === "deleted" ? (
            <Tooltip placement="right" title="Undo archive this admin">
              <Button
                type="primary"
                onClick={e => showUndoDeleteConfirm(record.id, e)}
              >
                <Icon type="undo" />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip placement="right" title="Delete this admin">
              <Button
                type="danger"
                onClick={e => showDeleteConfirm(record.id, e)}
              >
                <Icon type="delete" />
              </Button>
            </Tooltip>
          )}
          {record.status === "locked" ? (
            <Tooltip placement="right" title="Unlock this account">
              <Button type="primary" onClick={e => unlockAdmin(record.id)}>
                <Icon type="unlock" />
              </Button>
            </Tooltip>
          ) : null}
        </div>
      )
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(); // fetch initial - only applies on initial fetch of all results
    //eslint-disable-next-line
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/cms`,
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
      url: `${API}/cms`,
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
        if (response.data.success === "No results found") {
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
      case "UNLOCK_ADMIN_ERROR":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );

        clearNotifications();
        break;
      case "UNLOCK_ADMIN_SUCCESS":
        message.success(notifs.notifications.success);
        clearNotifications();
        setTimeout(() => {
          fetch();
          setPageNumber(1);
        }, 1000);
        break;
      case "DELETE_ADMIN_FAILED":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );
        clearNotifications();
        break;
      case "DELETE_ADMIN_SUCCESS":
        message.success(notifs.notifications.success);
        fetch(); // call our api to fetch updated data
        setPageNumber(1);
        clearNotifications(); // cleanup our notification object
        break;
      case "UNDO_DELETE_ADMIN_FAILED":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );
        clearNotifications();
        break;
      case "UNDO_DELETE_ADMIN_SUCCESS":
        message.success(notifs.notifications.success);
        fetch(); // call our api to fetch updated data
        setPageNumber(1);
        clearNotifications(); // cleanup our notification object
        break;
      case "FETCH_CURRENT_ADMIN_FAILED":
        message.error(notifs.notifications.error);
        clearNotifications(); // cleanup our notification object
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id]);

  // table actions
  function showDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to archive this admin?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        deleteAdmin(id);
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
        undoDeleteAdmin(id); // redux action
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function handleSelectAdmin(id, e) {
    e.stopPropagation();
    fetchCurrentAdmin(id);
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

  // handle table sort
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(filters);

    const obj = {
      order_by_field: sorter.field,
      order_by_sort: sorter.order && sorter.order === "ascend" ? "ASC" : "DESC"
    };
    filterFetch({ ...obj });
  };

  return (
    <Fragment>
      {/* breadcrumbs */}
      <PageBreadcrumb />

      {/* filters */}
      <AdminsTableFilter filterFetch={filterFetch} />

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={false}
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
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentAdmin,
    deleteAdmin,
    undoDeleteAdmin,
    unlockAdmin,
    clearNotifications
  }
)(AdminsTable);
