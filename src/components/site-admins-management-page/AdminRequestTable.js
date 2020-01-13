import React, { Fragment, useEffect, useState } from "react";
import { Table, Pagination } from "antd";
import { connect } from "react-redux";
import { fetchAdminRequest } from "../../redux/actions/admin-actions/superAdminActions";

import axios from "axios";
import { API } from "../../utils/api";

import { TableAction } from "../smart-table/TableAction";

const AdminRequestTable = ({
  fetchAdminRequest,
  superadmin,
  auth,
  ...props
}) => {
  const columns = [
    {
      title: "Full name",
      dataIndex: "fullname",
      rowKey: "id"
    },
    {
      title: "Department",
      dataIndex: "department",
      rowKey: "id"
    },
    {
      title: "Email",
      dataIndex: "email",
      rowKey: "id"
    },
    {
      title: "Action",
      rowKey: "id",
      render: (text, record) => (
        <TableAction
          title="Create admin"
          buttonType="primary"
          iconType={null}
          recordId={record.id}
          handleTableAction={populateFields}
          label="Create"
        />
      )
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    fetch(); // fetch initial
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/cms/request`,
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      },
      params: params
    })
      .then(response => {
        console.log("response: ", response);
        setTotal(response.data.info.result_count); // get total count from server and set to state
        setLoading(false);
        setData(response.data.results);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };

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
    console.log("Page: ", pageNumber);
    let obj = { page: pageNumber, per_page: pageSize };
    fetch({ ...obj });
  }

  function populateFields(id, e) {
    e.stopPropagation();

    console.log(id, "ID");
    console.log(data, "DATA");

    data.filter((item, index) => {
      if (item.id === id) {
        console.log("ITEM", item);
        props.getAdminRequesterData(item);
      }
    });
  }

  return (
    <Fragment>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={false}
        locale={{ emptyText: "No result found" }}
        size="small"
      />

      <Pagination
        total={total}
        showTotal={(total, range) =>
          `${range[0]}-${range[1]} of ${total} items`
        }
        pageSize={pageSize}
        defaultCurrent={1}
        itemRender={itemRender}
        onChange={onPagerChange}
        size="small"
        className="table-pagination-custom"
      />
    </Fragment>
  );
};

AdminRequestTable.propTypes = {};

const mapStateToProps = state => {
  return {
    superadmin: state.superadmin,
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { fetchAdminRequest }
)(AdminRequestTable);
