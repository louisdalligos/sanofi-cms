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
  changeProductStatus,
  newProduct
} from "../../redux/actions/product-management-actions/productManagementActions";

import {
  filterTableWithParams,
  setPageSize,
  setPageNumber,
  setParams,
  clearParams,
  setParamUrl,
  setTotalResultCount
} from "../../redux/actions/table-actions/tableActions";

import { capitalizeFirstChar } from "../../utils/helper";

// Table components
import WrappedProductsTableFilter from "./ProductsTableFilter";
import PageBreadcrumb from "./PageBreadcrumb";
import { TableAction } from "../smart-table/TableAction";

// Import our table config settings
import { COLUMN_ITEM_LINK, COLUMN_ITEM_SHORT_DESC } from "../../utils/config";

const { confirm } = Modal;

const ProductsTable = ({
  changeProductStatus,
  newProduct,
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
      title: "New",
      dataIndex: "new",
      rowKey: "id",
      width: 70,
      render: (text, record) => (
        <Fragment>
          {record.status === "published" ? (
            <Tooltip placement="top" title="Set new product?">
              <Switch
                className="switch-new-trigger"
                checked={record.is_new === "Yes"}
                onClick={() => handleToggleNew(record.id, record.is_new)}
              />
            </Tooltip>
          ) : (
            <Tooltip
              placement="right"
              title="Publish the product to set as new"
            >
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
      width: 90,
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
        <Tooltip placement="top" title="Edit product">
          <Button type="link">
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
            <Button type="link">
              <Link to={`/products/${record.id}`} title={text}>
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
        <Fragment>
          {record.status === "archived" ? (
            <TableAction
              title="Unarchive the product?"
              buttonType="primary"
              iconType="undo"
              recordId={record.id}
              handleTableAction={showUnArchiveConfirm}
            />
          ) : (
            <TableAction
              title="Archive the product?"
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
    filterTableWithParams(null, "/products"); // fetch initial
    setParamUrl("/products"); // set the url
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
      title: "Are you sure you want to archive this product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        changeProductStatus(id, values);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  function showUnArchiveConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to unarchive this product?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        const values = {
          status: "unarchived"
        };

        changeProductStatus(id, values);
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

  // handle set to featured switch
  function handleToggleNew(id, isNew) {
    if (isNew === "Yes") {
      newProduct(id, { is_new: 0 });
    } else {
      newProduct(id, { is_new: 1 });
    }
  }

  return (
    <Fragment>
      {/* breadcrumbs */}
      <PageBreadcrumb />

      {/* filters */}
      <WrappedProductsTableFilter setStatePageSize={setStatePageSize} />

      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading ? true : false}
        pagination={false}
        onChange={handleTableChange}
        size="small"
        locale={{ emptyText: "No results found" }}
        scroll={{ x: 1300 }}
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
    changeProductStatus,
    newProduct,
    filterTableWithParams,
    setPageSize,
    setPageNumber,
    setParams,
    setParamUrl,
    clearParams,
    setTotalResultCount
  }
)(ProductsTable);
