import React, { useReducer } from "react";
import axios from "axios";

import TherapyContext from "./therapyContext";
import therapyReducer from "./therapyReducer";

import {
  ADD_THERAPY,
  DELETE_THERAPY,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_THERAPY,
  FETCH_THERAPIES,
  THERAPY_ERROR,
  CLEAR_ARTICLES
} from "./types";

const TherapyState = props => {
  const initialState = {
    articles: [],
    current: null,
    error: null,
    loading: false
  };

  const [state, dispatch] = useReducer(therapyReducer, initialState);

  // Fetch articles from database
  const fetchArticles = async () => {
    try {
      const res = await axios.get("api/therapies");
      dispatch({
        type: FETCH_THERAPIES,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: THERAPY_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Clear all articles on the state
  const clearArticles = () => {
    dispatch({
      type: CLEAR_ARTICLES
    });
  };

  // Add therapy article
  const addArticle = async article => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    try {
      const res = await axios.post("/api/therapies", article, config);

      dispatch({
        type: ADD_THERAPY,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: THERAPY_ERROR,
        payload: error.response.msg
      });
    }
  };

  // Delete therapy article
  const deleteArticle = id => {
    dispatch({ type: DELETE_THERAPY, payload: id });
  };

  // Set current therapy article
  const setCurrentArticle = article => {
    dispatch({ type: SET_CURRENT, payload: article });
  };

  // Clear current therapy article
  const clearCurrentArticle = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update therapy article
  const updateArticle = async article => {
    try {
      const res = await axios.post("/api/therapies", article);

      dispatch({
        type: UPDATE_THERAPY,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: THERAPY_ERROR,
        payload: error.response.msg
      });
    }
  };

  return (
    <TherapyContext.Provider
      value={{
        articles: state.articles,
        current: state.current,
        error: state.error,
        fetchArticles,
        clearArticles,
        addArticle,
        deleteArticle,
        setCurrentArticle,
        clearCurrentArticle,
        updateArticle
      }}
    >
      {props.children}
    </TherapyContext.Provider>
  );
};

export default TherapyState;
