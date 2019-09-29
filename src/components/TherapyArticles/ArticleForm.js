import React, { useState, useContext } from "react";
import TherapyContext from "Context/therapy/therapyContext";

const ArticleForm = () => {
  const therapyContext = useContext(TherapyContext);

  const [article, setArticle] = useState({
    title: "",
    description: "",
    status: "draft"
  });

  const { title, description, status } = article;

  const handleChange = e =>
    setArticle({ ...article, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();

    therapyContext.addArticle(article);

    setArticle({
      title: "",
      description: "",
      status: "draft"
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Article</h2>
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

      <button type="submit">Add article</button>
    </form>
  );
};

export default ArticleForm;
