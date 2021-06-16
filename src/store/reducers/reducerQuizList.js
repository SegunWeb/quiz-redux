import {QUIZ_LIST_ERROR, QUIZ_LIST_LOADING, QUIZ_LIST_SUCCESS} from "../actions/actionsType";

const initialState = {
    quizes: [],
    load: false,
    error: null
};

export default function quizListReducer(state= initialState, action) {
    switch (action.type) {
        case QUIZ_LIST_LOADING:
            return {
                ...state,
                load: true
            };
        case QUIZ_LIST_SUCCESS:
            return {
                ...state,
                quizes: action.payload,
                load: false
            };
        case QUIZ_LIST_ERROR:
            return {
                error: action.payload,
                load: false
            };
        default:
            return state
    }
}