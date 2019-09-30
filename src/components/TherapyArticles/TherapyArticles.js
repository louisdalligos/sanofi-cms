import React, { Fragment, useContext, useState, useEffect } from "react";
import { Table, Tag, Divider, Button } from "antd";
//import TherapyItem from "./TherapyItem";

// context
import TherapyContext from "Context/therapy/therapyContext";

const TherapyArticles = () => {
  const therapyContext = useContext(TherapyContext);

  const {
    articles,
    fetchArticles,
    setCurrentArticle,
    deleteArticle,
    clearCurrentArticle,
    loading
  } = therapyContext;

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
      <Table columns={columns} dataSource={articles} />
    </Fragment>
  );
};

export default TherapyArticles;
