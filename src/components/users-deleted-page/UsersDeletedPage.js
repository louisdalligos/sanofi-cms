import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { PageHeader, Button, Table, Pagination, message } from "antd";

import {
    fetchAllDeletedUsers,
    // filters
    deletedUserOnChangePage,
    deletedUserOnChangePerPage,
    deletedUserOnChangeTableColumn,
    setTableFilters,
    deletedUsersDeletePermanently
} from "../../redux/actions/users-deleted-actions/usersDeletedActions";

import TableColumns from "./tableColumns";

class UsersDeletedPage extends Component {
    constructor(props) {
        super(props);
        this.itemRender = this.itemRender.bind(this);
        this.showTotal = this.showTotal.bind(this);
        this.paginationOnChange = this.paginationOnChange.bind(this);
        this.paginationOnShowSizeChange = this.paginationOnShowSizeChange.bind(
            this
        );
    }

    componentDidMount() {
        this.props.fetchAllDeletedUsers();
        this.addTableSetup();
    }

    addTableSetup() {
        this.columns = TableColumns.setup();

        TableColumns.callbacks(arg => {
            const action = arg[0];
            const userId = arg[1];

            switch (action) {
                case "DELETE":
                    this.props.deletedUsersDeletePermanently(userId);
                    break;
            }
        });
    }

    itemRender(current, type, originalElement) {
        if (type === "prev") return <a>Previous</a>;
        if (type === "next") return <a>Next</a>;
        return originalElement;
    }

    showTotal(total, range) {
        return `${range[0]}-${range[1]} of ${total} items`;
    }

    paginationOnChange(page, pageSize) {
        const tableFilters = this.props.tableFilters;
        this.props.deletedUserOnChangePage(page, pageSize, tableFilters);
    }

    paginationOnShowSizeChange(current, size) {
        const tableFilters = this.props.tableFilters;
        this.props.deletedUserOnChangePerPage(current, size, tableFilters);
    }

    render() {
        const { isLoading, users, info, toastr } = this.props;

        return (
            <div className="box-layout-custom">
                <PageHeader title={"Deleted Users"} />

                {toastr &&
                    (() => {
                        toastr.type === "error"
                            ? message.error(toastr.message)
                            : message.success(toastr.message);
                        return "";
                    })()}

                <div className="content-proper">
                    <Table
                        columns={this.columns}
                        rowKey={record => record.id}
                        dataSource={users}
                        pagination={false}
                        loading={isLoading}
                        onChange={(pagination, filters, sorter) => {
                            // table
                            this.props.setTableFilters({
                                pagination,
                                filters,
                                sorter
                            });
                            // table + pagination
                            this.props.deletedUserOnChangeTableColumn(
                                { pagination, filters, sorter },
                                this.props.info
                            );
                        }}
                        size="small"
                        locale={{ emptyText: "No results found" }}
                    />

                    <div className="pagination-wrapper">
                        {info && (
                            <Pagination
                                showQuickJumper
                                showSizeChanger
                                pageSizeOptions={["10", "25", "50", "100"]}
                                total={+info.total_count}
                                pageSize={+info.per_page}
                                defaultCurrent={+info.page}
                                // view read-only
                                showTotal={this.showTotal}
                                itemRender={this.itemRender}
                                // when page number was clicked
                                onChange={this.paginationOnChange}
                                // when page size was clicked
                                onShowSizeChange={
                                    this.paginationOnShowSizeChange
                                }
                                size="small"
                                className="table-pagination-custom"
                            />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.userDeletedReducer.users,
    info: state.userDeletedReducer.info,
    isLoading: state.userDeletedReducer.isLoading,
    tableFilters: state.userDeletedReducer.tableFilters,
    toastr: state.userDeletedReducer.toastr
});

export default connect(
    mapStateToProps,
    {
        fetchAllDeletedUsers,
        // filters
        deletedUserOnChangePage,
        deletedUserOnChangePerPage,
        deletedUserOnChangeTableColumn,
        setTableFilters,
        deletedUsersDeletePermanently
    }
)(UsersDeletedPage);
