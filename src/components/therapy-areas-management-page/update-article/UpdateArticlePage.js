import React, { Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import { PageHeader, Breadcrumb } from "antd";
import { Link } from "react-router-dom";

import UpdateArticleForm from "./UpdateArticleForm";

// redux actions
import { fetchCurrentArticle } from "../../../redux/actions/post-management-actions/postManagementActions";

const pageTitle = "Update article";

// Component
const UpdateArticlePage = ({
    fetchCurrentArticle,
    currentArticle,
    postManagement,
    notifs,
    history,
    match,
    ...props
}) => {
    return (
        <Fragment>
            <div className="box-layout-custom">
                <PageHeader title={pageTitle} />
                <div className="page-breadcrumb">
                    <div>
                        <Breadcrumb>
                            <Breadcrumb.Item key="content">
                                Content
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="therapy-areas">
                                <Link to="/therapy-areas">Therapy Areas</Link>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item key="therapy-ares-create">
                                Update Article
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>

                <UpdateArticleForm history={history} match={match} />
            </div>
        </Fragment>
    );
};

const mapStateToProps = state => {
    return {
        postManagement: state.postManagementReducer,
        categoryData: state.postManagementReducer.categories,
        subCategoryData: state.postManagementReducer.subCategories,
        currentArticle: state.postManagementReducer.currentArticle,
        notifs: state.notificationReducer
    };
};

export default connect(
    mapStateToProps,
    { fetchCurrentArticle }
)(UpdateArticlePage);
