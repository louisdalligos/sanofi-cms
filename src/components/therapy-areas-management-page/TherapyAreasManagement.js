import React, { Fragment } from "react";
import { PageHeader } from "antd";
import TherapyAreasTable from "./TherapyAreasTable";

const TherapyAreasManagement = props => {
    const pageTitle = "Therapy Areas";

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />
                <TherapyAreasTable />
            </div>
        </Fragment>
    );
};

export default TherapyAreasManagement;
