import React, { useReducer } from "react";

import uuid from "uuid";
import TherapyContext from "./therapyContext";
import therapyReducer from "./therapyReducer";

import {
  ADD_THERAPY,
  DELETE_THERAPY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_THERAPY
} from "./types";

const TherapyState = props => {
  const initialState = {
    articles: [
      {
        id: 1,
        title: "Article one title goes here xx",
        description: "Lorem ipsum",
        status: "draft"
      },
      {
        id: 2,
        title: "Article two title goes here 33",
        description: "Lorem ipsum",
        status: "published"
      },
      {
        id: 3,
        title: "Article one title goes here 22",
        description: "Lorem ipsum",
        status: "archived"
      }
    ]
  };

  const [state, dispatch] = useReducer(therapyReducer, initialState);

  // Add therapy article
  const addArticle = article => {
    article.id = uuid.v4();
    dispatch({ type: ADD_THERAPY, payload: article });
  };

  // Delete therapy article
  const deleteArticle = id => {
    dispatch({ type: DELETE_THERAPY, payload: id });
  };
  // Set current therapy article

  // Clear current therapy article

  // Update therapy article

  return (
    <TherapyContext.Provider
      value={{
        articles: state.articles,
        addArticle,
        deleteArticle
      }}
    >
      {props.children}
    </TherapyContext.Provider>
  );
};

export default TherapyState;
