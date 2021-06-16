import {TOKEN, TOKEN_LOGOUT} from "../actions/actionsType";

const initialState = {
    token: null
};


export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case TOKEN:
            return {
                ...state,
                token: action.token
            };
        case TOKEN_LOGOUT:
            return {
                ...state,
                token: null
            };

        default:
            return state
    }
}