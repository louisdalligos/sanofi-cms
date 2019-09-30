import React, { Fragment, useContext } from "react";
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

const data = [
  {
    key: "1",
    title: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"]
  }
];

const TherapyArticles = () => {
  const therapyContext = useContext(TherapyContext);

  const { articles } = therapyContext;

  console.log(therapyContext.articles);
  return (
    // <Fragment>
    //   {articles.map(article => (
    //     <TherapyItem key={article.id} article={article} />
    //   ))}
    // </Fragment>
    <Table columns={columns} dataSource={articles} />
  );
};

export default TherapyArticles;
