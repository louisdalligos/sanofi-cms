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
import WrappedAdminsTableFilter from "./AdminsTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";
import { TableAction } from "../smart-table/TableAction";
import { RecordStatus } from "../smart-table/RecordStatus";

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
        <RecordStatus id={record.id} status={record.status} label={text} />
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
      title: "Role",
      dataIndex: "role_display_name",
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
        <Fragment>
          {record.status === "deleted" ? (
            <TableAction
              title="Undo delete?"
              buttonType="primary"
              iconType="undo"
              recordId={record.id}
              handleTableAction={showUndoDeleteConfirm}
            />
          ) : (
            <TableAction
              title={
                auth.user.fullname === record.fullname ? null : "Delete admin?"
              }
              iconType="delete"
              recordId={record.id}
              handleTableAction={showDeleteConfirm}
              buttonDisabled={
                auth.user.fullname === record.fullname ? true : false
              }
            />
          )}

          {record.status === "locked" ? (
            <TableAction
              title="Unlock account?"
              buttonType="primary"
              iconType="unlock"
              recordId={record.id}
              handleTableAction={showUnlockConfirm}
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
    fetch(); // fetch initial - only applies on initial fetch of all results

    console.log(auth, "AUTH");
    //eslint-disable-next-line
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    setPageSize(params.per_page ? params.per_page : 10);
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
      title: "Are you sure you want to delete this admin?",
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
      title: "Are you sure you want to revert to previous status?",
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

  function showUnlockConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unlock this admin?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        unlockAdmin(id);
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
      <WrappedAdminsTableFilter
        filterFetch={filterFetch}
        fetch={fetch}
        setStatePageSize={setStatePageSize}
      />

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={false}
        onChange={handleTableChange}
        size="small"
        locale={{ emptyText: "No results found" }}
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
