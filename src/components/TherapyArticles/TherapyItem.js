import React from "react";
import PropTypes from "prop-types";

const TherapyItem = ({ article }) => {
  const { id, title, description, status } = article;

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status}</span>
    </div>
  );
};

TherapyItem.propTypes = {
  article: PropTypes.object.isRequired
};

export default TherapyItem;
