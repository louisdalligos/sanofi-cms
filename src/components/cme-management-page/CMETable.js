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

import { noImage } from "../../utils/constant";

import {
  changeEventStatus,
  featureEvent
} from "../../redux/actions/cme-actions/cmeActions";

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
import WrappedCMETableFilter from "./CMETableFilter";
import PageBreadcrumb from "./PageBreadcrumb";
import { TableAction } from "../smart-table/TableAction";

// Import our table config settings
import { COLUMN_ITEM_LINK } from "../../utils/config";

import { capitalizeFirstChar } from "../../utils/helper";

const { confirm } = Modal;

const CMETable = ({
  changeEventStatus,
  featureEvent,
  filterTableWithParams,
  tableData,
  loading,
  pageSize,
  pageNumber,
  setPageSize,
  setPageNumber,
  params,
  paramUrl,
  clearParams,
  setParamUrl,
  setTotalResultCount,
  totalResultCount
}) => {
  const columns = [
    {
      title: "Featured",
      dataIndex: "new",
      rowKey: "id",
      width: 80,
      render: (text, record) => (
        <Fragment>
          {record.status === "published" ? (
            <Tooltip placement="top" title="Tag as featured?">
              <Switch
                className="switch-new-trigger"
                checked={record.featured_at === "Yes"}
                onClick={() =>
                  handleToggleFeatured(record.id, record.featured_at)
                }
              />
            </Tooltip>
          ) : (
            <Tooltip placement="right" title="Publish the event to feature it">
              <Switch className="switch-new-trigger" disabled />
            </Tooltip>
          )}
        </Fragment>
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

  const [data, setData] = useState([]);

  useEffect(() => {
    filterTableWithParams({ per_page: 10 }, "/cme"); // fetch initial
    setParamUrl("/cme"); // set the url
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

  function handleToggleFeatured(id, isFeatured) {
    console.log("ID", id);
    console.log("Is it featured", isFeatured);

    if (isFeatured === "Yes") {
      featureEvent(id, { is_featured: 0 });
    } else {
      featureEvent(id, { is_featured: 1 });
    }
  }

  return (
    <Fragment>
      {/* breadcrumbs */}
      <PageBreadcrumb />

      <div className="cme-table-legend-info">
        <Tag color="#ffcccb">Event needs to be updated</Tag>
        <span>
          The event date has passed and it must be updated before it can be
          published in the site again
        </span>
      </div>

      {/* filters */}
      <WrappedCMETableFilter setStatePageSize={setStatePageSize} />

      <Table
        columns={columns}
        rowClassName={(record, index) =>
          record.row_color === "red"
            ? "table-row-color-red"
            : "table-row-color-default"
        }
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
    changeEventStatus,
    featureEvent,
    filterTableWithParams,
    setPageSize,
    setPageNumber,
    setParams,
    setParamUrl,
    clearParams,
    setTotalResultCount
  }
)(CMETable);
