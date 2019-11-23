import React, { Fragment } from "react";
import { PageHeader } from "antd";

import CMETable from "./CMETable";

const CMEManagement = props => {
  const pageTitle = "CME Management";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        <CMETable />
      </div>
    </Fragment>
  );
};

export default CMEManagement;
