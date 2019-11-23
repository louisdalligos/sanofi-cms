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

import {
  archiveProduct,
  changeProductStatus
} from "../../redux/actions/product-management-actions/productManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

// Table components
import WrappedProductsTableFilter from "./ProductsTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";

// Import our table config settings
import { COLUMN_ITEM_LINK, COLUMN_ITEM_SHORT_DESC } from "../../utils/config";

const { confirm } = Modal;

const ProductsTable = ({
  notifs,
  clearNotifications,
  archiveProduct,
  changeProductStatus,
  auth
}) => {
  const columns = [
    {
      title: "New",
      dataIndex: "new",
      rowKey: "id",
      width: 60,
      render: (text, record) => (
        <Tooltip placement="top" title="Tag as new product?">
          <Switch className="switch-new-trigger" />
        </Tooltip>
      )
    },
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "id",
      sorter: true,
      width: 90,
      render: (text, record) => (
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
      )
    },
    {
      title: "Edit",
      rowKey: "id",
      width: 50,
      render: (text, record) => (
        <Tooltip placement="top" title="Edit product">
          <Button type="link" onClick={e => handleSelectProduct(record.id, e)}>
            <Link to={`/products/${record.id}`}>
              <Icon type="form" />
            </Link>
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Product Name/Description",
      dataIndex: "product_name",
      rowKey: "id",
      sorter: true,
      width: 400,
      render: (text, record) => (
        <div className="table-title-featured-wrap">
          <img
            src={record.thumbnail_image ? record.thumbnail_image : noImage}
            alt={text}
            className="table-list-thumbnail-image"
          />
          <div>
            <Button
              type="link"
              onClick={e => handleSelectProduct(record.id, e)}
            >
              <Link to={`/products/${record.id}`}>
                <Typography.Text ellipsis={true} style={COLUMN_ITEM_LINK}>
                  {text}
                </Typography.Text>
              </Link>
            </Button>

            <Typography.Text ellipsis={true} style={COLUMN_ITEM_SHORT_DESC}>
              {record.short_description}
            </Typography.Text>
          </div>
        </div>
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
        <Tooltip placement="right" title="Archive this product">
          <Button
            type="danger"
            onClick={e => showArchiveConfirm(record.id, e)}
            disabled={record.status === "archived"}
          >
            <Icon type="delete" />
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
    fetch(); // fetch initial list of products
    //eslint-disable-next-line
  }, []);

  // Table event handlers
  const fetch = (params = {}) => {
    setLoading(true);
    setPageSize(params.per_page ? params.per_page : 10);
    axios({
      url: `${API}/products`,
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
        console.log(response.data.results, "products response");
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
      url: `${API}/products`,
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
      case "ARCHIVE_PRODUCT_SUCCESS":
        message.success(
          notifs.notifications
            ? notifs.notifications.success
            : "Product successfully archived!"
        );
        fetch(); // call our api to fetch updated data
        clearNotifications(); // cleanup our notification object
        setPageNumber(1);
        break;
      case "ARCHIVE_PRODUCT_FAILED":
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
      title: "Are you sure you want to archive this product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        archiveProduct(id);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function handleSelectProduct(id, e) {
    e.stopPropagation();
    console.log(id);
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
      <WrappedProductsTableFilter
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
        scroll={{ x: 1300 }}
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
    archiveProduct,
    changeProductStatus
  }
)(ProductsTable);
