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
  Pagination,
  Tag
} from "antd";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { API } from "../../utils/api";

// redux actions import
import {
  fetchSpecializations,
  fetchCategories,
  fetchSubCategories,
  archiveArticle,
  changeArticleStatus
} from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { confirm } = Modal;
const { Option } = Select;
const Search = Input.Search;

const TherapyAreasTable = ({
  notifs,
  clearNotifications,
  postManagement,
  fetchSpecializations,
  fetchCategories,
  fetchSubCategories,
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
        <img src={record.thumbnail_image} alt="" />
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
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetch(); // fetch initial
    fetchCategories(); // fetch categories
    fetchSubCategories();
    fetchSpecializations();
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

        if (response.data.success == "No results found") {
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
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        clearNotifications();
        break;
      case "FETCH_SUBCATEGORIES_SUCCESS":
        setSubCategories(postManagement.subCategories.results);
        clearNotifications();
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
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

  function onSearch(e) {
    let obj = { search: e };
    filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
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

  function onFilterCategory(e) {
    let obj = { categories: e };
    filterFetch({ ...obj });
  }

  function onFilterSubCategory(e) {
    let obj = { sub_categories: e };
    filterFetch({ ...obj });
  }

  function onFilterSpecialization(e) {
    let obj = { specializations: e };
    filterFetch({ ...obj });
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
      <div className="page-breadcrumb">
        <div>
          <Breadcrumb>
            <Breadcrumb.Item key="content">Content</Breadcrumb.Item>
            <Breadcrumb.Item key="therapy-areas">
              <Link to="/therapy-areas">Therapy Areas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div>
          {/* <Button type="primary" style={{ marginRight: 10 }}>
                        <Link to="/">Order Features</Link>
                    </Button> */}
          <Button type="primary">
            <Link to="/therapy-areas/create">New Article</Link>
          </Button>
        </div>
      </div>
      <Row>
        <div className="filter-table-wrapper">
          <Form layout="inline">
            <h4>Show</h4>
            {/* <Form.Item label="">
                            <Select
                                defaultValue="All states"
                                style={{ width: 100 }}
                            >
                                <Option value="featured">Featured</Option>
                            </Select>
                        </Form.Item> */}

            <Form.Item label="">
              <Select
                defaultValue="All specializations"
                placeholder="Select a specialization"
                onChange={onFilterSpecialization}
                style={{ width: 150 }}
              >
                <Option value="">All specializations</Option>
                {specializations
                  ? specializations.map(c => (
                      <Option key={c.id} value={c.title}>
                        {c.title}
                      </Option>
                    ))
                  : "No results found"}
              </Select>
            </Form.Item>

            <Form.Item label="">
              <Select
                defaultValue="All category"
                placeholder="Select a category"
                onChange={onFilterCategory}
                style={{ width: 190 }}
              >
                <Option value="">All category</Option>
                {categories
                  ? categories.map(c => (
                      <Option key={c.id} value={c.id}>
                        {c.name}
                      </Option>
                    ))
                  : "No results found"}
              </Select>
            </Form.Item>

            <Form.Item label="">
              <Select
                defaultValue="All subcategory"
                placeholder="Select a subcategory"
                onChange={onFilterSubCategory}
                style={{ width: 190 }}
              >
                <Option value="">All subcategory</Option>
                {subCategories
                  ? subCategories.map(c => (
                      <Option key={c.id} value={c.id}>
                        {c.name}
                      </Option>
                    ))
                  : "No results found"}
              </Select>
            </Form.Item>

            <Form.Item>
              <Search
                placeholder="title, tag..."
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
          loading={loading}
          pagination={false}
          onChange={handleTableChange}
          size="small"
          locale={{ emptyText: "No result found" }}
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
      </Row>
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
    fetchSpecializations,
    fetchSubCategories,
    fetchCategories,
    archiveArticle,
    changeArticleStatus
  }
)(TherapyAreasTable);
