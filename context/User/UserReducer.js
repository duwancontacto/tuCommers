//ACCIONES QUE SE EJECUTAN CON UN DISPATCH

import { CHANGE_SIDEBAR, CHANGE_USER } from "../types";

const UserReducer = (state, action) => {
    switch (action.type) {
        case CHANGE_SIDEBAR:
            return { ...state, menu: action.payload };
        case CHANGE_USER:
            return { ...state, user: action.payload };
        default:
            return state;
    }
};

export default UserReducer;
