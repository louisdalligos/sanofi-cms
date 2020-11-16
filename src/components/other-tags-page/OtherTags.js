import React, { Fragment } from "react";
import { PageHeader } from "antd";

import { pageUnavailableText } from "../../utils/constant";

const OtherTags = props => {
    const pageTitle = "Other tags";

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />

                {pageUnavailableText}
            </div>
        </Fragment>
    );
};

export default OtherTags;
