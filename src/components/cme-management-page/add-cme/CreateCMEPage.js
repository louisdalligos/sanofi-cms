import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import CreateCMEFormWrapper from "./CreateCMEForm";

const pageTitle = "Create a new CME";

// Component
const CreateCMEPage = ({ history, auth, postManagement, match, ...props }) => {
  const [data, setData] = useState({
    category_id: "",
    event_name: "",
    event_description: "",
    event_date: "",
    event_type: "",
    event_location: "",
    specializations: [],
    other_tags: [],
    event_body: "",
    page_title: "",
    slug: "",
    meta_description: "",
    meta_keywords: "",
    zinc_code1: "",
    zinc_code2: "",
    zinc_code3: "",
    zinc_code: "",
    featured: "",
    thumbnail: ""
  });

  return (
    <Fragment>
      <div className="box-layout-custom">
        <PageHeader title={pageTitle} />
        <div className="page-breadcrumb">
          <div>
            <Breadcrumb>
              <Breadcrumb.Item key="content">Content</Breadcrumb.Item>
              <Breadcrumb.Item key="cme">
                <Link to="/cme">CME</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item key="cme-create">Create CME</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <CreateCMEFormWrapper
          history={history}
          auth={auth}
          postManagement={postManagement}
          data={data}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    postManagement: state.postManagementReducer,
    notifs: state.notificationReducer
  };
};

export default connect(
  mapStateToProps,
  null
)(CreateCMEPage);
