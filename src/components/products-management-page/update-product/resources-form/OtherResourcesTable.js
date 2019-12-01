import React from "react";
import { Table, Tooltip, Button, Icon, Modal, message } from "antd";

import axios from "axios";
import { API } from "../../../../utils/api";

const { confirm } = Modal;

const OtherResourcesTable = props => {
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      rowKey: "id"
    },
    {
      title: "Type",
      dataIndex: "filename",
      rowKey: "id"
    },
    {
      title: "Actions",
      rowKey: "id",
      render: (text, record) => (
        <Tooltip placement="right" title="Delete this resource">
          <Button type="danger" onClick={e => showDeleteConfirm(record.id, e)}>
            <Icon type="delete" />
          </Button>
        </Tooltip>
      )
    }
  ];

  // table actions
  function showDeleteConfirm(id, e) {
    e.stopPropagation();

    confirm({
      title: "Are you sure you want to delete this resource?",
      okText: "Yes",
      okType: "primary",
      cancelText: "No",
      onOk() {
        console.log(id);

        axios({
          url: `${API}/products/file/delete/${id}`,
          method: "delete",
          headers: {
            Authorization: `Bearer ${props.auth.access_token}`
          }
        })
          .then(res => {
            message.success(
              res.data.success
                ? res.data.success
                : "Deleted resource successfully"
            );
            props.history.push("/products");
          })
          .catch(err => {
            message.error(
              err.response
                ? err.response.data.error
                : "Oops! Something went wrong!"
            );
          });
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  }

  return (
    <Table
      columns={columns}
      rowKey={record => record.id}
      dataSource={props.resourcesData}
      pagination={false}
      size="small"
      locale={{ emptyText: "No results found" }}
    />
  );
};

export default OtherResourcesTable;
