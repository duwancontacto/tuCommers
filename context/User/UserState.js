import React, { useReducer } from "react";
import UserContext from "./UserContext";
import UserReducer from "./UserReducer";
import { CHANGE_SIDEBAR, CHANGE_USER } from "../types";

export default function UserState(props) {

    const initialState = {
        menu: false,
        user: null,
    };

    const [state, dispatch] = useReducer(UserReducer, initialState);

    const changeMenu = (value) => {
        dispatch({ type: CHANGE_SIDEBAR, payload: value });
    };
    const changeUser = (value) => {
        dispatch({ type: CHANGE_USER, payload: value });
    };
    return (
        <UserContext.Provider
            value={{
                menu: state.menu,
                user: state.user,
                changeMenu,
                changeUser
            }}
        >
            {props.children}
        </UserContext.Provider>
    );
}
