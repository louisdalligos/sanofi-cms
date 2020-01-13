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
  Typography
} from "antd";
import { Link } from "react-router-dom";

import { noImage } from "../../utils/constant";

// redux actions import
import { changeArticleStatus } from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";
import {
  filterTableWithParams,
  setPageSize,
  setPageNumber,
  setParams,
  clearParams,
  setParamUrl,
  setTotalResultCount
} from "../../redux/actions/table-actions/tableActions";

// Table components
import WrappedTherapyAreasTableFilter from "./TherapyAreasTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";
import { TableAction } from "../smart-table/TableAction";

// Import our table config settings
import { COLUMN_ITEM_LINK, COLUMN_ITEM_SHORT_DESC } from "../../utils/config";

import { capitalizeFirstChar } from "../../utils/helper";

const { confirm } = Modal;

const TherapyAreasTable = ({
  changeArticleStatus,
  filterTableWithParams,
  tableData,
  loading,
  pageSize,
  pageNumber,
  setPageSize,
  setPageNumber,
  params,
  paramUrl,
  setParamUrl,
  clearParams,
  setTotalResultCount,
  totalResultCount
}) => {
  const columns = [
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
            {capitalizeFirstChar(text)}
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
          <Button type="link">
            <Link to={`/therapy-areas/${record.id}`}>
              <Icon type="form" />
            </Link>
          </Button>
        </Tooltip>
      )
    },
    {
      title: "Article Title/Thumbnail",
      dataIndex: "headline",
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
            <Button type="link">
              <Link to={`/therapy-areas/${record.id}`} title={text}>
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
      title: "Archive",
      rowKey: "id",
      render: (text, record) => (
        <Fragment>
          {record.status === "archived" ? (
            <TableAction
              title="Unarchive the article?"
              buttonType="primary"
              iconType="undo"
              recordId={record.id}
              handleTableAction={showUnArchiveConfirm}
            />
          ) : (
            <TableAction
              title="Archive the article?"
              iconType="delete"
              recordId={record.id}
              handleTableAction={showArchiveConfirm}
            />
          )}
        </Fragment>
      )
    }
  ];

  const [data, setData] = useState([]);

  useEffect(() => {
    filterTableWithParams(null, "/therapy-areas"); // fetch initial
    setParamUrl("/therapy-areas"); // set the url
    console.log(tableData, "TABLE DATA");

    return () => {
      // cleanup filters - set to default
      clearParams();
    };
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    setData(tableData.results);
    setTotalResultCount(tableData.result_count);

    //eslint-disable-next-line
  }, [tableData.results]);

  // table actions
  function showArchiveConfirm(id, e) {
    e.stopPropagation();

    console.log(id);

    confirm({
      title: "Are you sure you want to archive this article?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        const values = {
          status: "archived"
        };

        changeArticleStatus(id, values);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showUnArchiveConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unarchive this article?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        const values = {
          status: "unarchived"
        };

        changeArticleStatus(id, values);
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

    filterTableWithParams({ ...obj }, paramUrl);
    setPageNumber(pageNumber);
  }

  function onPageSizeChange(current, pageSize) {
    let obj = { per_page: pageSize };

    filterTableWithParams({ ...params, ...obj }, paramUrl);
    setPageSize(pageSize); // set the page size - redux action
    setParams({ ...params, per_page: pageSize });
    setTotalResultCount(tableData.result_count);
  }

  // handle table sort
  const handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, "Pagination");
    console.log(filters, "Filters");
    console.log(sorter, "Sorter");

    const obj = {
      order_by_field: sorter.field,
      order_by_sort: sorter.order && sorter.order === "ascend" ? "ASC" : "DESC",
      per_page: pageSize
    };

    filterTableWithParams({ ...obj }, paramUrl);
    setData(tableData.results); // set our data local state
  };

  const setStatePageSize = () => {
    return pageSize;
  };

  return (
    <Fragment>
      {/* breadcrumbs */}
      <PageBreadcrumb />

      {/* filters */}
      <WrappedTherapyAreasTableFilter
        //filterFetch={filterFetch}
        fetch={fetch}
        setStatePageSize={setStatePageSize}
      />

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading ? true : false}
        pagination={false}
        onChange={handleTableChange}
        size="small"
        locale={{ emptyText: "No results found" }}
        scroll={{ x: 1100 }}
      />

      {!loading && totalResultCount !== null ? (
        <Pagination
          showQuickJumper
          showSizeChanger
          pageSizeOptions={["10", "25", "50", "100"]}
          total={totalResultCount}
          showTotal={(totalResultCount, range) =>
            `${range[0]}-${range[1]} of ${totalResultCount} items`
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
    postManagement: state.postManagementReducer,
    tableData: state.tableReducer,
    loading: state.tableReducer.requestInProgress,
    pageSize: state.tableReducer.per_page,
    pageNumber: state.tableReducer.page_number,
    params: state.tableReducer.params,
    paramUrl: state.tableReducer.param_url,
    totalResultCount: state.tableReducer.result_count
  };
};

export default connect(
  mapStateToProps,
  {
    changeArticleStatus,
    filterTableWithParams,
    setPageSize,
    setPageNumber,
    setParams,
    setParamUrl,
    clearParams,
    setTotalResultCount
  }
)(TherapyAreasTable);
