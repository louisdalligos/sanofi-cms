import React, { Fragment, useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Table, Divider, Button, Spin } from "antd";
//import TherapyItem from "./TherapyItem";

// redux actions import
import { fetchArticles } from "Services/redux/actions/articleActions";

const TherapyArticles = ({ article: { articles, loading }, fetchArticles }) => {
  const [columns, setColumns] = useState([
    {
      title: "Status",
      dataIndex: "status",
      sorter: true
    },
    {
      title: "Title",
      dataIndex: "title"
    },
    {
      title: "Description",
      dataIndex: "description"
    },
    {
      title: "Date Created",
      dataIndex: "createdAt"
    },
    {
      title: "Action",
      render: (text, record) => (
        <span>
          <Button type="primary">Edit</Button>
          <Divider type="vertical" />
          <Button type="danger">Delete</Button>
        </span>
      )
    }
  ]);

  useEffect(() => {
    fetchArticles();
    //eslint-disable-next-line
  }, []);

  return (
    // <Fragment>
    //   {articles.map(article => (
    //     <TherapyItem key={article.id} article={article} />
    //   ))}
    // </Fragment>
    <Fragment>
      <Button type="primary" style={{ float: "right" }}>
        New Article
      </Button>
      {loading ? <Spin /> : <Table columns={columns} dataSource={articles} />}
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    article: state.articleState
  };
};

TherapyArticles.protoTypes = {
  article: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { fetchArticles }
)(TherapyArticles);
