import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Select } from "antd";

// redux actions import
import { fetchSpecializations } from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";
import { fetchCategories } from "../../redux/actions/product-management-actions/productManagementActions";

const { Option } = Select;
const Search = Input.Search;

const ProductsTableFilter = ({
  fetchSpecializations,
  //fetchCategories,
  postManagement,
  notifs,
  clearNotifications,
  ...props
}) => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Product Category One" },
    { id: 2, name: "Product Category Two" }
  ]);
  const [status, setStatus] = useState([
    "published",
    "unpublished",
    "archived"
  ]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    //fetchCategories();
    fetchSpecializations();
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        clearNotifications();
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        //setCategories(postManagement.categories.results);
        clearNotifications();
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id]);

  // search function
  function onSearch(e) {
    let obj = { search: e };
    props.filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
  }

  // filter category
  function onFilterCategory(e) {
    let obj = { categories: e };
    props.filterFetch({ ...obj });
  }

  // filter status
  function onFilterStatus(e) {
    let obj = { status: e };
    props.filterFetch({ ...obj });
  }

  // filter specialization
  function onFilterSpecialization(e) {
    let obj = { specializations: e };
    props.filterFetch({ ...obj });
  }

  // Reset function
  const handleResetFilters = () => {
    // let obj = { categories: "", status: "", specializations: "" };
    // filterFetch({ ...obj });

    onFilterCategory("");
  };

  return (
    <Fragment>
      <Row>
        <div className="filter-table-wrapper">
          <Form layout="inline">
            <Row gutter={24}>
              <Col xs={24} md={1}>
                <Form.Item label="Show" />
              </Col>
              <Col xs={24} md={4}>
                <Form.Item label="">
                  <Select
                    defaultValue="All status"
                    placeholder="Select a status"
                    onChange={onFilterStatus}
                  >
                    <Option value="">All status</Option>
                    {status
                      ? status.map(s => (
                          <Option key={s} value={s}>
                            {s}
                          </Option>
                        ))
                      : "No results found"}
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item label="">
                  <Select
                    defaultValue="All specializations"
                    placeholder="Select a specialization"
                    onChange={onFilterSpecialization}
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
              </Col>
              <Col xs={24} md={5}>
                <Form.Item label="">
                  <Select
                    defaultValue="All category"
                    placeholder="Select a category"
                    onChange={onFilterCategory}
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
              </Col>
              <Col xs={24} md={5}>
                <Form.Item>
                  <Search placeholder="title, tag..." onSearch={onSearch} />
                </Form.Item>
              </Col>
              <Col xs={24} md={4}>
                <Form.Item label="">
                  <Button
                    type="primary"
                    size="small"
                    onClick={handleResetFilters}
                  >
                    Reset
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    postManagement: state.postManagementReducer
  };
};

export default connect(
  mapStateToProps,
  {
    clearNotifications,
    fetchSpecializations
    //fetchCategories
  }
)(ProductsTableFilter);
