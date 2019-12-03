import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { Row, Col, Form, Input, Button, Select } from "antd";

// redux actions import
import { fetchSpecializations } from "../../redux/actions/post-management-actions/postManagementActions";
import { clearNotifications } from "../../redux/actions/notification-actions/notificationActions";

const { Option } = Select;
const Search = Input.Search;

const UsersTableFilter = ({
    fetchSpecializations,
    postManagement,
    notifs,
    clearNotifications,
    setStatePageSize,
    ...props
}) => {
    const [status, setStatus] = useState([
        "active",
        "pending",
        "blocked",
        "deleted"
    ]);
    const [specializations, setSpecializations] = useState([]);

    const { getFieldDecorator } = props.form;

    useEffect(() => {
        fetchSpecializations();
        console.log(props.resetFields);
        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        switch (notifs.id) {
            case "FETCH_SPECIALIZATIONS_SUCCESS":
                setSpecializations(postManagement.specializations);
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
        props.filterFetch({ ...obj }); // call filter fetch method for diff set of total result count
    }

    // filter accessed
    function onFilterAccessed(e) {
        let obj = { accessed: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj });
    }

    // filter status
    function onFilterStatus(e) {
        let obj = { status: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj });
    }

    // filter specialization
    function onFilterSpecialization(e) {
        let obj = { specializations: e, per_page: setStatePageSize() };
        props.filterFetch({ ...obj });
    }

    // Reset function
    const handleResetFilters = () => {
        let obj = { per_page: 10 };
        props.fetch({ ...obj });
        props.form.resetFields();
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
                            <Col xs={24} md={5}>
                                <Form.Item label="">
                                    {getFieldDecorator(
                                        "filter_specialization",
                                        {}
                                    )(
                                        <Select
                                            placeholder="Select a specialization"
                                            onChange={onFilterSpecialization}
                                        >
                                            <Option value="">
                                                All specializations
                                            </Option>
                                            {specializations
                                                ? specializations.map(c => (
                                                      <Option
                                                          key={c.id}
                                                          value={c.id}
                                                      >
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
                                    {getFieldDecorator(
                                        "filter_lastAccessed",
                                        {}
                                    )(
                                        <Select
                                            placeholder="Select last accessed"
                                            onChange={onFilterAccessed}
                                        >
                                            <Option value="anytime">
                                                Anytime
                                            </Option>
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
                    </Form>
                </div>
            </Row>
        </Fragment>
    );
};

const WrappedUsersTableFilter = Form.create({ name: "user_filter" })(
    UsersTableFilter
);

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
    }
)(WrappedUsersTableFilter);
