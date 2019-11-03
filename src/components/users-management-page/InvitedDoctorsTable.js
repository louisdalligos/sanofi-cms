import React, { Fragment, useEffect, useState } from "react";
import { Button, Table, Pagination, message, Form, Input } from "antd";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchInvitedSiteUsers } from "../../redux/actions/admin-actions/superAdminActions";

import axios from "axios";
import { API } from "../../utils/api";

const InvitedDoctorsTable = ({ fetchInvitedSiteUsers, superadmin, auth }) => {
  const columns = [
    {
      title: "First Name",
      dataIndex: "firstname",
      rowKey: "id"
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      rowKey: "id"
    },
    {
      title: "PRC Number",
      dataIndex: "prc_number",
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
        <Form onSubmit={resendInvitation}>
          <input type="hidden" value={record.id} />
          <Button
            id={record.id}
            htmlType="submit"
            type="primary"
            disabled={record.button === "disabled" ? true : false}
          >
            Resend invitation
          </Button>
        </Form>
      )
    }
  ];

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    fetch(); // fetch initial
  }, []);

  const fetch = (params = {}) => {
    setLoading(true);
    axios({
      url: `${API}/users/invite-list`,
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
        console.log(err);
      });
  };

  const resendInvitation = e => {
    e.preventDefault();
    const id = e.target[0].value;
    const button = e.target.children[1];

    axios({
      url: `${API}/users/resend-invitation/${id}`,
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${auth.access_token}`
      }
    })
      .then(response => {
        console.log("response: ", response);
        message.success(response.data.success, 3);
        button.setAttribute("disabled", true);
      })
      .catch(err => {
        console.log(err);
        message.error("There was an error processing your request", 1);
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

  return (
    <Fragment>
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={data}
        loading={loading}
        pagination={false}
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

InvitedDoctorsTable.propTypes = {};

const mapStateToProps = state => {
  return {
    superadmin: state.superadmin,
    auth: state.authReducer
  };
};

export default connect(
  mapStateToProps,
  { fetchInvitedSiteUsers }
)(InvitedDoctorsTable);
