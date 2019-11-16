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
  archiveArticle,
  changeArticleStatus
} from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// Table components
import TherapyAreasTableFilter from "./TherapyAreasTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";

const { confirm } = Modal;

const TherapyAreasTable = ({
  notifs,
  clearNotifications,
  postManagement,
  archiveArticle,
  changeArticleStatus,
  auth
}) => {
  const columns = [
    // {
    //     title: "Featured",
    //     dataIndex: "featured",
    //     rowKey: "id",
    //     render: (text, record) => (
    //         <Tooltip placement="top" title="Featured article">
    //             <Icon type="star" />
    //         </Tooltip>
    //     )
    // },
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
        <Tooltip placement="top" title="Edit article">
          <Button type="link" onClick={e => handleSelectArticle(record.id, e)}>
            <Link to={`/therapy-areas/${record.id}`}>
              <Icon type="form" />
            </Link>
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Page Title",
      dataIndex: "page_title",
      rowKey: "id",
      sorter: true,
      render: (text, record) => (
        <Button type="link" onClick={e => handleSelectArticle(record.id, e)}>
          <Link to={`/therapy-areas/${record.id}`}>{text}</Link>
        </Button>
      )
    },
    {
      title: "Thumbnail Image",
      dataIndex: "thumbnail_image",
      rowKey: "id",
      width: 150,
      render: (text, record) => (
        // <img src={record.thumbnail_image} width="100" alt="" />
        <img src={record.thumbnail_image} alt="" width="70" />
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
      title: "Archive",
      rowKey: "id",
      render: (text, record) => (
        <Tooltip placement="right" title="Archive this article">
          <Button type="danger" onClick={e => showArchiveConfirm(record.id, e)}>
            <Icon type="file-exclamation" />
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
    //eslint-disable-next-line
  }, []);

  // Table event handlers
  const fetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/therapy-areas`,
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
      url: `${API}/therapy-areas`,
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
      case "ARCHIVE_ARTICLE_SUCCESS":
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Article successfully archived!"
        );
        fetch(); // call our api to fetch updated data
        clearNotifications(); // cleanup our notification object
        setPageNumber(1);
        break;
      case "ARCHIVE_ARTICLE_FAILED":
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
  }, [notifs.id]);

  // table actions
  function showArchiveConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to archive this article?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        archiveArticle(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function handleSelectArticle(id, e) {
    e.stopPropagation();
    console.log(id);
    //fetchCurrentAdmin(id);
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
      <TherapyAreasTableFilter filterFetch={filterFetch} />

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
    notifs: state.notificationReducer,
    postManagement: state.postManagementReducer
  };
};

export default connect(
  mapStateToProps,
  {
    clearNotifications,
    archiveArticle,
    changeArticleStatus
  }
)(TherapyAreasTable);
