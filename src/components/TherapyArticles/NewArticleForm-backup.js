import React, { useState, useContext, useEffect } from "react";
import TherapyContext from "Context/therapy/therapyContext";

const NewArticleForm = () => {
  const therapyContext = useContext(TherapyContext);
  const {
    addArticle,
    updateArticle,
    current,
    clearCurrentArticle
  } = therapyContext;

  const [article, setArticle] = useState({
    title: "",
    description: "",
    status: "draft"
  });

  useEffect(() => {
    if (current !== null) {
      setArticle(current);
    } else {
      setArticle({
        title: "",
        description: "",
        status: "draft"
      });
    }
  }, [therapyContext, current]);

  const { title, description, status } = article;

  const handleChange = e =>
    setArticle({ ...article, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    if (current === null) {
      addArticle(article); // call addArticle function
    } else {
      // call update article action
      updateArticle(article);
    }

    clearCurrentArticle(); // reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{current ? "Edit" : "Add"} Article</h2>
      <input
        type="text"
        placeholder="Enter your article title"
        name="title"
        onChange={handleChange}
        value={title}
      />

      <textarea
        type="text"
        placeholder="Enter your article description"
        name="description"
        onChange={handleChange}
        value={description}
      />

      <button type="submit">Save draft</button>
    </form>
  );
};

export default NewArticleForm;
