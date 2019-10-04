import * as types from "./index";
import axios from "axios";

export const fetchArticles = () => async dispatch => {
  try {
    setLoading(); // loading state

    // @todo - refactor to be an API SERVICE
    const res = await axios.get("api/therapies");

    // Dispatch to article reducer so it can change the our app state
    dispatch({
      type: types.FETCH_ARTICLES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: types.ARTICLE_ERROR,
      payload: error.response
    });
  }
};

export const clearArticles = () => {
  return {
    type: types.CLEAR_ARTICLES
  };
};

export const setLoading = () => {
  return {
    type: types.SET_LOADING
  };
};
