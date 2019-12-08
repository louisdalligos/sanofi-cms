import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import UpdateCMEFormWrapper from "./UpdateCMEForm";
import { clearNotifications } from "../../../redux/actions/notification-actions/notificationActions";

const pageTitle = "Update CME";

// Component
const UpdateCMEPage = ({ history, auth, match, postManagement, ...props }) => {
  const [data, setData] = useState({
    id: "",
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
    thumbnail: "",
    tag_all: ""
  });

  const getData = data => {
    const str = data.zinc_code.split("|"); // split our zinc code
    const tags = data.other_tags.split(",");
    const momentDate = moment(data.event_date).format("YYYY/MM/DD");
    const allStatus = data.tag_all ? true : false;

    let formatData = {
      id: data.id,
      status: data.status,
      category_id: data.category_id,
      event_name: data.event_name,
      event_description: data.event_description,
      event_date: momentDate,
      event_type: data.event_type,
      event_location: data.event_location,
      specializations:
        typeof data.specializations === "string"
          ? data.specializations.split(",").map(item => {
              return parseInt(item, 10);
            })
          : data.specializations,
      other_tags: tags,
      event_body: data.event_body,
      page_title: data.page_title,
      slug: data.slug,
      meta_description: data.meta_description,
      meta_keywords: data.meta_keywords,
      zinc_code: data.zinc_code,
      zinc_code1: str[0].trim(),
      zinc_code2: str[1].trim(),
      zinc_code3: str[2].trim(),
      featured: data.featured_image,
      thumbnail: data.thumbnail_image,
      tag_all: allStatus
    };

    setData(formatData); // set our formated obj to formik values
  };

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
              <Breadcrumb.Item key="cme-create">Update CME</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <UpdateCMEFormWrapper
          history={history}
          auth={auth}
          postManagement={postManagement}
          data={data}
          getData={getData}
          match={match}
        />
      </div>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.authReducer,
    postManagement: state.postManagementReducer,
    notifs: state.notificationReducer,
    currentEvent: state.cmeReducer.currentProduct
  };
};

export default connect(
  mapStateToProps,
  null
)(UpdateCMEPage);
