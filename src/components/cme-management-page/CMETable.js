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
  Tag,
  Switch,
  Typography
} from "antd";
import { Link } from "react-router-dom";

import axios from "axios";
import { API } from "../../utils/api";

import { noImage } from "../../utils/constant";

import { changeEventStatus } from "../../redux/actions/cme-actions/cmeActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// Table components
import WrappedCMETableFilter from "./CMETableFilter";
import PageBreadcrumb from "./PageBreadcrumb";
import { TableAction } from "../smart-table/TableAction";

// Import our table config settings
import { COLUMN_ITEM_LINK } from "../../utils/config";

const { confirm } = Modal;

const CMETable = ({ notifs, clearNotifications, changeEventStatus, auth }) => {
  const columns = [
    {
      title: "Featured",
      dataIndex: "new",
      rowKey: "id",
      width: 70,
      render: (text, record) => (
        <Tooltip placement="top" title="Tag as featured?">
          <Switch className="switch-new-trigger" />
        </Tooltip>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "id",
      sorter: true,
      width: 95,
      render: (text, record) => (
        <Fragment>
          <Tag
            color={
              record.status === "published"
                ? "green"
                : record.status === "archived"
                ? "volcano"
                : record.status === "unpublished"
                ? "geekblue"
                : "blue"
            }
            key={record.id}
          >
            {text}
          </Tag>
          <small style={{ display: "block" }}>
            {record.deleted_at ? record.deleted_at : null}
          </small>
        </Fragment>
      )
    },
    {
      title: "Edit",
      rowKey: "id",
      width: 50,
      render: (text, record) => (
        <Tooltip placement="top" title="Edit event">
          <Button type="link">
            <Link to={`/cme/${record.id}`}>
              <Icon type="form" />
            </Link>
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Event Name/Description",
      dataIndex: "event_name",
      rowKey: "id",
      sorter: true,
      width: 400,
      render: (text, record) => (
        <div className="table-title-featured-wrap">
          {/* <img src={record.thumbnail_image} alt="" width="70" /> */}
          <img
            src={record.thumbnail_image ? record.thumbnail_image : noImage}
            alt={text}
            className="table-list-thumbnail-image"
          />
          <div>
            <Button type="link">
              <Link to={`/cme/${record.id}`}>
                {" "}
                <Typography.Text ellipsis={true} style={COLUMN_ITEM_LINK}>
                  {text}
                </Typography.Text>
              </Link>
            </Button>
            <small>{record.short_description}</small>
          </div>
        </div>
      )
    },
    {
      title: "Event Type",
      dataIndex: "event_type",
      rowKey: "id",
      sorter: true,
      render: (text, record) => (
        <Tag
          color={record.event_type === "Upcoming" ? "green" : "blue"}
          key={record.id}
        >
          {record.event_type}
        </Tag>
      )
    },
    {
      title: "Zinc Code",
      dataIndex: "zinc_code",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Publish Date",
      dataIndex: "published_at",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Date Created",
      dataIndex: "created_at",
      rowKey: "id",
      sorter: true
    },
    {
      title: "Actions",
      rowKey: "id",
      render: (text, record) => (
        <Fragment>
          {record.status === "archived" ? (
            <TableAction
              title="Unarchive the event?"
              buttonType="primary"
              iconType="undo"
              recordId={record.id}
              handleTableAction={showUnArchiveConfirm}
            />
          ) : (
            <TableAction
              title="Archive the event?"
              iconType="delete"
              recordId={record.id}
              handleTableAction={showArchiveConfirm}
            />
          )}
        </Fragment>
      )
    }
  ];

  const [data, setData] = useState([
    {
      id: 1,
      event_name: "Event One",
      event_type: "upcoming",
      status: "unpublished",
      short_description: "Lorem ipsum",
      zinc_code: "AAAA.AAA.12.06.16 | Version 0.6 | 06 DEC 2016",
      date_created: new Date()
    },
    {
      id: 2,
      event_name: "Event Two",
      event_type: "past",
      status: "unpublished",
      short_description: "Lorem ipsum",
      zinc_code: "FFXFE.DFE.12.06.16 | Version 1.6 | 12 DEC 1998",
      date_created: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetch(); // fetch initial list of events
    //eslint-disable-next-line
  }, []);

  // Table event handlers
  const fetch = (params = {}) => {
    setLoading(true);
    setPageSize(params.per_page ? params.per_page : 10);
    axios({
      url: `${API}/cme`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      params: params
    })
      .then(response => {
        setTotal(response.data.info ? response.data.info.total_count : null); // get total count from server and set to state
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
      url: `${API}/cme`,
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
          setTotal(response.data.info ? response.data.info.total_count : null); // get total count from server and set to state
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
      case "CHANGE_EVENT_STATUS_SUCCESS":
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Event successfully archived!"
        );
        fetch(); // call our api to fetch updated data
        clearNotifications(); // cleanup our notification object
        setPageNumber(1);
        break;
      case "CHANGE_EVENT_STATUS_FAILED":
        message.error(
          notifs.notifications
            ? notifs.notifications.error
            : "There was an error on processing your request!"
        );
        clearNotifications();
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

  // table actions
  function showArchiveConfirm(id, e) {
    e.stopPropagation();

    const values = {
      status: "archived"
    };

    confirm({
      title: "Are you sure you want to archive this event?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        changeEventStatus(id, values);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showUnArchiveConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unarchive this event?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        const values = {
          status: "unarchived"
        };

        changeEventStatus(id, values);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
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
      <WrappedCMETableFilter
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

      {!loading && total !== null ? (
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
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  {
    clearNotifications,
    changeEventStatus
  }
)(CMETable);
