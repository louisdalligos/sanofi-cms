import React, { Fragment, useState } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";

const { Option } = Select;
const Search = Input.Search;

const AdminsTableFilter = ({ ...props }) => {
  const [status, setStatus] = useState([
    "active",
    "pending",
    "locked",
    "deleted"
  ]);

  // search function
  function onSearch(e) {
    let obj = { search: e };
    props.filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
  }

  // filter accessed
  function onFilterAccessed(e) {
    let obj = { accessed: e };
    props.filterFetch({ ...obj });
  }

  // filter status
  function onFilterStatus(e) {
    let obj = { status: e };
    props.filterFetch({ ...obj });
  }

  // Reset function
  const handleResetFilters = () => {
    // let obj = { categories: "", status: "", specializations: "" };
    // filterFetch({ ...obj });
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
              <Col xs={24} md={7}>
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
              <Col xs={24} md={7}>
                <Form.Item label="">
                  <Select defaultValue="anytime" onChange={onFilterAccessed}>
                    <Option value="anytime">Anytime</Option>
                    <Option value="today">Today</Option>
                    <Option value="within_seven_days">Within 7 days</Option>
                    <Option value="within_thirty_days">Within 30 days</Option>
                    <Option value="not_within_365_days">
                      Not within 365 days
                    </Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24} md={5}>
                <Form.Item>
                  <Search placeholder="name, email..." onSearch={onSearch} />
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

export default AdminsTableFilter;