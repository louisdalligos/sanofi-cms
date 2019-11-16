import React, { Fragment } from "react";
import { Tag } from "antd";

export const RecordStatus = ({ status, id, label }) => {
  return (
    <Fragment>
      {status ? (
        <Tag
          color={
            status === "active"
              ? "green"
              : status === "deleted"
              ? "volcano"
              : status === "pending"
              ? "geekblue"
              : "black"
          }
          key={id}
        >
          {label}
        </Tag>
      ) : null}
    </Fragment>
  );
};
