import React, { Fragment, useContext, useEffect } from "react";
import { Table, Tag, Divider, Button } from "antd";
import TherapyItem from "./TherapyItem";

// context
import TherapyContext from "Context/therapy/therapyContext";

const columns = [
  {
    title: "Status",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "Title",
    dataIndex: "age",
    key: "title"
  },
  {
    title: "Description",
    dataIndex: "desccription",
    key: "description"
  },
  {
    title: "Date Created",
    dataIndex: "createdAt",
    key: "createdAt"
  },
  {
    title: "Action",
    key: "action",
    render: (text, record) => (
      <span>
        <Button type="primary">Edit</Button>
        <Divider type="vertical" />
        <a>Delete</a>
      </span>
    )
  }
];

const TherapyArticles = () => {
  const therapyContext = useContext(TherapyContext);
  const { articles, fetchArticles, loading } = therapyContext;

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
      <Table columns={columns} dataSource={articles} />
    </Fragment>
  );
};

export default TherapyArticles;
