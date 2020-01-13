import React from "react";
import { Tooltip, Button, Icon } from "antd";

export const TableAction = ({
  title,
  recordId,
  iconType,
  buttonType,
  buttonDisabled,
  label,
  ...props
}) => {
  return (
    <Tooltip placement="top" title={title}>
      <Button
        type={buttonType ? buttonType : "danger"}
        onClick={e => props.handleTableAction(recordId, e)}
        disabled={buttonDisabled}
      >
        <Icon type={iconType} />
        {label ? label : null}
      </Button>
    </Tooltip>
  );
};
