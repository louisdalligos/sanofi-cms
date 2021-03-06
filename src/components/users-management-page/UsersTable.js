import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Table, message, Modal, Pagination } from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions import
import {
  deleteUser,
  undoDeleteUser,
  fetchCurrentUser,
  unlockUser,
  blockUser,
  unBlockUser
} from "../../redux/actions/admin-actions/superAdminActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// Table components
import WrappedUsersTableFilter from "./UsersTableFilter";
import PageBreadcrumb from "./PageBreadCrumb";
import { TableAction } from "../smart-table/TableAction";
import { RecordStatus } from "../smart-table/RecordStatus";

const { confirm } = Modal;

const UsersTable = ({
  fetchCurrentUser,
  deleteUser,
  undoDeleteUser,
  unlockUser,
  unBlockUser,
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
      width: 80,
      sorter: true,
      render: (text, record) => (
        <RecordStatus id={record.id} status={record.status} label={text} />
      )
    },
    {
      title: "Full Name",
      dataIndex: "fullname",
      rowKey: "id",
      width: 180,
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
      width: 180,
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
      dataIndex: "registration_completed_at",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Action",
      rowKey: "id",
      width: 140,
      className: "table-action-column",
      render: (text, record) => (
        <Fragment>
          <TableAction
            title="Delete user?"
            iconType="delete"
            recordId={record.id}
            handleTableAction={showDeleteConfirm}
          />
          {record.status === "blocked" ? (
            <TableAction
              title="Unblock user?"
              buttonType="primary"
              iconType="undo"
              recordId={record.id}
              handleTableAction={showUnBlockConfirm}
            />
          ) : (
            <TableAction
              title={
                record.status === "pending"
                  ? "Account is currently pending"
                  : "Block user?"
              }
              iconType="close"
              recordId={record.id}
              handleTableAction={showBlockConfirm}
              buttonDisabled={record.status === "pending" ? true : false}
            />
          )}

          {record.status === "locked" ? (
            <TableAction
              title="Unlock user?"
              buttonType="primary"
              iconType="unlock"
              recordId={record.id}
              handleTableAction={showUnLockConfirm}
            />
          ) : null}
        </Fragment>
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
    //eslint-disable-next-line
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    setPageSize(params.per_page ? params.per_page : 10);
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
      case "UNLOCK_USER_FAILED":
      case "BLOCK_USER_FAILED":
      case "UNBLOCK_USER_FAILED":
        message.error(
          notifs.notifications.error ? notifs.notifications.error : null
        );
        clearNotifications();
        break;
      case "UNLOCK_USER_SUCCESS":
      case "BLOCK_USER_SUCCESS":
      case "UNBLOCK_USER_SUCCESS":
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

  function showUnLockConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unlock this user?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log("OK deleted", id);
        unlockUser(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showUnBlockConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unblock this user?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log("OK deleted", id);
        unBlockUser(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title:
        "Are you sure you want to delete this user? Their information will be anonymized upon confirming deletion",
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

  // handle table sort
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination);
    const obj = {
      order_by_field: sorter.field,
      order_by_sort: sorter.order && sorter.order === "ascend" ? "ASC" : "DESC",
      per_page: pageSize
    };
    filterFetch({ ...obj });
  };

  const setStatePageSize = () => {
    return pageSize;
  };

  return (
    <Fragment>
      {/* breadcrumbs */}
      <PageBreadcrumb />

      {/* filters */}
      <WrappedUsersTableFilter
        filterFetch={filterFetch}
        fetch={fetch}
        setStatePageSize={setStatePageSize}
      />

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        pagination={false}
        loading={loading}
        onChange={handleTableChange}
        size="small"
        locale={{ emptyText: "No results found" }}
        scroll={{ x: 1200 }}
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
    siteUsers: state.superadmin.siteUsers,
    requestInProgress: state.superadmin.requestInProgress,
    notifs: state.notificationReducer,
    postManagement: state.postManagementReducer
  };
};

export default connect(
  mapStateToProps,
  {
    fetchCurrentUser,
    deleteUser,
    undoDeleteUser,
    unlockUser,
    unBlockUser,
    blockUser,
    clearNotifications
  }
)(UsersTable);
