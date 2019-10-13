import axios from "axios";

import {
  FETCH_ARTICLES,
  ARTICLE_ERROR,
  CLEAR_ARTICLES,
  SET_LOADING_ARTICLES
} from "./types";
import { ARTICLES_ENDPOINT } from "../endpoint";

export const fetchArticles = () => async dispatch => {
  try {
    setLoading(); // loading state

    // @todo - refactor to be an API SERVICE
    const res = await axios.get(ARTICLES_ENDPOINT);

    // Dispatch to article reducer so it can change the our app state
    dispatch({
      type: FETCH_ARTICLES,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ARTICLE_ERROR,
      payload: error.response
    });
  }
};

export const clearArticles = () => {
  return {
    type: CLEAR_ARTICLES
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING_ARTICLES
  };
};
