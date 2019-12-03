import React, { Fragment } from "react";
import { PageHeader } from "antd";

import AdminsTable from "./AdminsTable";

const SiteAdminManagement = props => {
    const pageTitle = "Administrator";

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />
                <AdminsTable />
            </div>
        </Fragment>
    );
};

export default SiteAdminManagement;
