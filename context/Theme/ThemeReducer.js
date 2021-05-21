//ACCIONES QUE SE EJECUTAN CON UN DISPATCH

import {CHANGE_THEME} from "../types";

const ThemeReducer = (state, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return {...state, theme: action.payload};
    default:
      return state;
  }
};

export default ThemeReducer;
