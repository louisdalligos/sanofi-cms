import React, { useContext } from "react";
import PropTypes from "prop-types";
import TherapyContext from "Context/therapy/therapyContext";

const TherapyItem = ({ article }) => {
  const therapyContext = useContext(TherapyContext);
  const {
    deleteArticle,
    setCurrentArticle,
    clearCurrentArticle
  } = therapyContext;

  const { id, title, description, status } = article;

  const handleDelete = () => {
    deleteArticle(id);
    clearCurrentArticle(); // remove the current article on state
  };

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>

      <div>
        <button onClick={() => setCurrentArticle(article)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

TherapyItem.propTypes = {
  article: PropTypes.object.isRequired
};

export default TherapyItem;
