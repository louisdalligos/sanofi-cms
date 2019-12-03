import React, { Fragment, useState } from "react";
import { Row, Col, Form, Input, Button, Select } from "antd";

const { Option } = Select;
const Search = Input.Search;

const AdminsTableFilter = ({ setStatePageSize, ...props }) => {
    const [status, setStatus] = useState([
        "active",
        "pending",
        "locked",
        "deleted"
    ]);

    const { getFieldDecorator } = props.form;

    // search function
    function onSearch(e) {
        let obj = { search: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
    }

    // filter accessed
    function onFilterAccessed(e) {
        let obj = { accessed: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj });
    }

    function onSelectAccessed(e) {
        console.log(e);
    }

    // filter status
    function onFilterStatus(e) {
        let obj = { status: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj });
    }

    // Reset function
    const handleResetFilters = () => {
        let obj = { per_page: 10 };
        props.fetch({ ...obj });
        props.form.resetFields();
    };

    return (
        <Form layout="inline">
            <Row>
                <div className="filter-table-wrapper">
                    <Row gutter={24}>
                        <Col xs={24} md={1}>
                            <Form.Item label="Show" />
                        </Col>
                        <Col xs={24} md={7}>
                            <Form.Item label="">
                                {getFieldDecorator("filter_status", {})(
                                    <Select
                                        placeholder="Select a status"
                                        onChange={onFilterStatus}
                                    >
                                        {status
                                            ? status.map(s => (
                                                  <Option key={s} value={s}>
                                                      {s}
                                                  </Option>
                                              ))
                                            : "No results found"}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={7}>
                            <Form.Item label="">
                                {getFieldDecorator("filter_lastAccessed", {})(
                                    <Select
                                        placeholder="Select last accessed"
                                        onChange={onFilterAccessed}
                                        onSelect={onSelectAccessed}
                                    >
                                        <Option value="anytime">Anytime</Option>
                                        <Option value="today">Today</Option>
                                        <Option value="within_seven_days">
                                            Within 7 days
                                        </Option>
                                        <Option value="within_thirty_days">
                                            Within 30 days
                                        </Option>
                                        <Option value="not_within_365_days">
                                            Not within 365 days
                                        </Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={4}>
                            <Form.Item label="">
                                <Button
                                    type="primary"
                                    onClick={handleResetFilters}
                                >
                                    Reset
                                </Button>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={5}>
                            <Form.Item>
                                <Search
                                    placeholder="name, email..."
                                    onSearch={onSearch}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </div>
            </Row>
        </Form>
    );
};

const WrappedAdminsTableFilter = Form.create({ name: "admin_filter" })(
    AdminsTableFilter
);

export default WrappedAdminsTableFilter;
