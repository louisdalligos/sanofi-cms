import React from "react";
import { Popconfirm, message, Button, Icon, Modal, Tooltip } from "antd";
const { confirm } = Modal;

var callbackFns = {
  trigger: function() {}
};
function callbacks(cb) {
  callbackFns.trigger = cb;
}

function setup() {
  return [
    {
      title: "User Id",
      dataIndex: "user_id",
      rowKey: "user_id"
    },
    {
      title: "Status",
      dataIndex: "status",
      rowKey: "user_id"
    },
    {
      title: "Time stamp",
      dataIndex: "timestamp",
      rowKey: "user_id"
    },
    {
      title: "Action",
      dataIndex: "action",
      rowKey: "user_id",
      render: function(text, record, idx) {
        console.log(text, record, idx);
        return (
          <Tooltip placement="top" title={"Permanently delete user"}>
            <Button
              type="danger"
              onClick={() => {
                confirm({
                  title:
                    "Are you sure you want to permanently delete this user?",
                  okText: "Yes",
                  okType: "primary",
                  cancelText: "No",
                  onOk() {
                    callbackFns.trigger(["DELETE", record.user_id]);
                  },
                  onCancel() {}
                });
              }}
            >
              <Icon type={"delete"} />
            </Button>
          </Tooltip>
        );
      }
    }
  ];
}

const TableColumns = {
  setup,
  callbacks
};

export default TableColumns;
