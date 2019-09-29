import React, { useContext, useEffect } from "react";
import AuthContext from "Context/auth/authContext";

import TherapyArticles from "Components/TherapyArticles/TherapyArticles";
import ArticleForm from "Components/TherapyArticles/ArticleForm";

const Dashboard = props => {
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  const onLogout = () => {
    logout();
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Hello, welcome {user && user.name}</p>
      <button onClick={onLogout}>Logout</button>

      <div>
        <TherapyArticles />
      </div>

      <ArticleForm />
    </div>
  );
};

export default Dashboard;
