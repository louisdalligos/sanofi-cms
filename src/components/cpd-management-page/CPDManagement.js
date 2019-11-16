import React, { Fragment } from "react";
import { PageHeader } from "antd";

import { pageUnavailableText } from "../../utils/constant";

const CPDManagement = props => {
  const pageTitle = "CPD Management";

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />

        {pageUnavailableText}
      </div>
    </Fragment>
  );
};

export default CPDManagement;
