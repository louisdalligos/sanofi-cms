import React, { Fragment } from "react";
import { PageHeader } from "antd";

import { pageUnavailableText } from "../../utils/constant";

const DoctorSpecialization = props => {
    const pageTitle = "Doctor Specialization";

    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />

                {pageUnavailableText}
            </div>
        </Fragment>
    );
};

export default DoctorSpecialization;
