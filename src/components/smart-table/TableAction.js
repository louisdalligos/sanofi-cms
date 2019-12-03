import React from "react";
import { Tooltip, Button, Icon } from "antd";

export const TableAction = ({
    title,
    recordId,
    iconType,
    buttonType,
    buttonDisabled,
    ...props
}) => {
    return (
        <Tooltip placement="right" title={title}>
            <Button
                type={buttonType ? buttonType : "danger"}
                onClick={e => props.handleTableAction(recordId, e)}
                disabled={buttonDisabled}
            >
                <Icon type={iconType} />
            </Button>
        </Tooltip>
    );
};
