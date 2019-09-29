import React, { Fragment, useContext } from "react";
import TherapyItem from "./TherapyItem";

import TherapyContext from "Context/therapy/therapyContext";

const TherapyArticles = () => {
  const therapyContext = useContext(TherapyContext);

  const { articles } = therapyContext;

  return (
    <Fragment>
      {articles.map(article => (
        <TherapyItem key={article.id} article={article} />
      ))}
    </Fragment>
  );
};

export default TherapyArticles;
