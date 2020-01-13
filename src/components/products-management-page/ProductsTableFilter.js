import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Select } from "antd";

// redux actions import
import { fetchSpecializations } from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";
import { fetchCategories } from "../../redux/actions/post-management-actions/postManagementActions";

import {
  filterTableWithParams,
  setParams,
  setPageSize
} from "../../redux/actions/table-actions/tableActions";

import { capitalizeFirstChar } from "../../utils/helper";

const { Option } = Select;
const Search = Input.Search;

const ProductsTableFilter = ({
  fetchSpecializations,
  fetchCategories,
  postManagement,
  notifs,
  clearNotifications,
  setStatePageSize,
  filterTableWithParams,
  setParams,
  params,
  paramUrl,
  setPageSize,
  ...props
}) => {
  const { getFieldDecorator } = props.form;

  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([
    "published",
    "unpublished",
    "archived"
  ]);
  const [specializations, setSpecializations] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
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

  // search function
  function onSearch(e) {
    let obj = { search: e, per_page: setStatePageSize() };

    filterTableWithParams({ ...params, ...obj }, paramUrl);
    setParams({ ...params, ...obj }); // set our multiple param state to redux
  }

  // filter category
  function onFilterCategory(e) {
    let obj = { categories: e, per_page: setStatePageSize() };

    filterTableWithParams({ ...params, ...obj }, paramUrl);
    setParams({ ...params, ...obj }); // set our multiple param state to redux
  }

  // filter status
  function onFilterStatus(e) {
    let obj = { status: e, per_page: setStatePageSize() };

    filterTableWithParams({ ...params, ...obj }, paramUrl);
    setParams({ ...params, ...obj }); // set our multiple param state to redux
  }

  // filter specialization
  function onFilterSpecialization(e) {
    let obj = { specializations: e, per_page: setStatePageSize() };

    filterTableWithParams({ ...params, ...obj }, paramUrl);
    setParams({ ...params, ...obj }); // set our multiple param state to redux
  }

  // Reset function
  const handleResetFilters = () => {
    filterTableWithParams(null, paramUrl);
    props.form.resetFields();
    setPageSize(10);
    setParams({}); // set params to default
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
                  {getFieldDecorator("filter_status", {})(
                    <Select
                      placeholder="Select a status"
                      onChange={onFilterStatus}
                    >
                      <Option value="">All Status</Option>
                      {status
                        ? status.map(s => (
                            <Option key={s} value={s}>
                              {capitalizeFirstChar(s)}
                            </Option>
                          ))
                        : "No results found"}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item label="">
                  {getFieldDecorator("filter_specialization", {})(
                    <Select
                      placeholder="Select a specialization"
                      onChange={onFilterSpecialization}
                    >
                      <Option value="">All Specializations</Option>
                      {specializations
                        ? specializations.map(c => (
                            <Option key={c.id} value={c.id}>
                              {c.title}
                            </Option>
                          ))
                        : "No results found"}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item label="">
                  {getFieldDecorator("filter_subCategory", {})(
                    <Select
                      placeholder="Select a category"
                      onChange={onFilterCategory}
                    >
                      <Option value="">All Category</Option>
                      {categories
                        ? categories.map(c => (
                            <Option key={c.id} value={c.id}>
                              {c.name}
                            </Option>
                          ))
                        : "No results found"}
                    </Select>
                  )}
                </Form.Item>
              </Col>
              <Col xs={24} md={4}>
                <Form.Item label="">
                  <Button type="primary" onClick={handleResetFilters}>
                    Reset
                  </Button>
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item>
                  <Search placeholder="title" onSearch={onSearch} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Row>
    </Fragment>
  );
};

const WrappedProductsTableFilter = Form.create({ name: "products_filter" })(
  ProductsTableFilter
);

const mapStateToProps = state => {
  return {
    notifs: state.notificationReducer,
    postManagement: state.postManagementReducer,
    params: state.tableReducer.params,
    paramUrl: state.tableReducer.param_url
  };
};

export default connect(
  mapStateToProps,
  {
    clearNotifications,
    fetchSpecializations,
    fetchCategories,
    filterTableWithParams,
    setParams,
    setPageSize
  }
)(WrappedProductsTableFilter);
