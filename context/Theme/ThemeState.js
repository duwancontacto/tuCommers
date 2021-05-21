import React, {useReducer} from "react";
import ThemeContext from "./ThemeContext";
import ThemeReducer from "./ThemeReducer";
import {CHANGE_THEME} from "../types";

export default function ThemeState(props) {
  //Estados globales actuales
  const initialState = {
    theme: "default",
  };

  const [state, dispatch] = useReducer(ThemeReducer, initialState);

  const changeTheme = (value) => {
    document.body.className = value;
    dispatch({type: CHANGE_THEME, payload: value});
  };

  //EXPORTAMOS TODO ESTO,ASI EN CUALQUIER ARCHIVO DEL PROYECTO PODREMOS OBTENER ESTA INFORMACION GLOBAL
  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        changeTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}
