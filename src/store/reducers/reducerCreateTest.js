import {ADD_ITEM_QUESTION, RESET_INPUTS} from "../actions/actionsType";

const initialState = {
    quiz: [],
};


export default function createTestReducer(state = initialState, action) {
    switch (action.type) {

        case ADD_ITEM_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            };
        case RESET_INPUTS:
            return {
                ...state,
                quiz: []
            };

        default:
            return state
    }
}