import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import CreateCMEFormWrapper from "./CreateCMEForm";

import {
  fetchCategories,
  fetchSpecializations
} from "../../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Create a new Event";

// Component
const CreateCMEPage = ({
  auth,
  postManagement,
  match,
  fetchCategories,
  fetchSpecializations,
  notifs,
  ...props
}) => {
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
    zinc_code: "",
    featured: "",
    thumbnail: "",
    tag_all: ""
  });

  const [specializations, setSpecializations] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchSpecializations();
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    switch (notifs.id) {
      case "FETCH_SPECIALIZATIONS_SUCCESS":
        setSpecializations(postManagement.specializations);
        break;
      case "FETCH_CATEGORIES_SUCCESS":
        setCategories(postManagement.categories.results);
        break;
      default:
        return;
    }
    //eslint-disable-next-line
  }, [notifs.id, notifs.notifications]);

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
              <Breadcrumb.Item key="cme-create">
                Create New Event
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </div>

        <CreateCMEFormWrapper
          history={props.history}
          auth={auth}
          postManagement={postManagement}
          data={data}
          categories={categories}
          specializations={specializations}
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      fetchCategories: fetchCategories,
      fetchSpecializations: fetchSpecializations
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateCMEPage);
