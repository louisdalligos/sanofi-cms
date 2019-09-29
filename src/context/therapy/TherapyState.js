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
    therapies: [
      {
        id: 1,
        title: "Article one title goes here",
        description: "Lorem ipsum",
        status: "draft"
      },
      {
        id: 2,
        title: "Article two title goes here",
        description: "Lorem ipsum",
        status: "published"
      },
      {
        id: 3,
        title: "Article one title goes here",
        description: "Lorem ipsum",
        status: "archived"
      }
    ]
  };

  const [state, dispatch] = useReducer(therapyReducer, initialState);

  // Add therapy article

  // Delete therapy article

  // Set current therapy article

  // Clear current therapy article

  // Update therapy article

  return (
    <TherapyContext.Provider
      value={{
        therapies: state.therapies
      }}
    >
      {props.children}
    </TherapyContext.Provider>
  );
};

export default TherapyState;
