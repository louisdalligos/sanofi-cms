import React, { Fragment } from "react";
import { PageHeader } from "antd";

import { pageUnavailableText } from "../../utils/constant";

const Academy = props => {
    const pageTitle = "Academy Management";

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />

                {pageUnavailableText}
            </div>
        </Fragment>
    );
};

export default Academy;
