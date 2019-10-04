import React, { Fragment, useContext, useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { Table, Button, Spin, Icon, Modal } from "antd";
//import TherapyItem from "./TherapyItem";

// import our form
import NewArticleForm from "Components/TherapyArticles/NewArticleForm";

// redux actions import
import { fetchArticles } from "Actions/articleActions";

const customIconLoading = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const TherapyArticles = ({ article: { article, loading }, fetchArticles }) => {
  const [columns, setColumns] = useState([
    {
      title: "Status",
      dataIndex: "status",
      sorter: true
    },
    {
      title: "Edit",
      render: (text, record) => (
        <Button type="link">
          <Icon type="edit" />
        </Button>
      )
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
      title: "Archive",
      render: (text, record) => (
        <Button type="link">
          <Icon type="delete" />
        </Button>
      )
    }
  ]);

  useEffect(() => {
    fetchArticles();

    console.log(article);
    //eslint-disable-next-line
  }, []);

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  if (loading || article === null) {
    return (
      <div className="loading-container">
        <Spin indicator={customIconLoading} />
      </div>
    );
  }

  const handleOk = () => {
    setConfirmLoading(true);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setVisible(false);
  };

  const showModal = () => {
    console.log(showModal);
    setVisible(true);
  };

  return (
    // <Fragment>
    //   {articles.map(article => (
    //     <TherapyItem key={article.id} article={article} />
    //   ))}
    // </Fragment>
    <Fragment>
      <Button
        type="primary"
        onClick={showModal}
        style={{ float: "right", zIndex: 500 }}
      >
        New Article
      </Button>
      <Table
        rowKey={record => record._id}
        columns={columns}
        dataSource={article}
      />
      <Modal
        title="Add new therapy"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <NewArticleForm />
      </Modal>
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
