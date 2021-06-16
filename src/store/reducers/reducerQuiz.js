import {
    FINISH_QUIZ,
    LOAD_CURRENT_QUIZ, NEXT_QUIZ,
    QUIZ_LIST_ERROR,
    QUIZ_LIST_LOADING,
    QUIZ_SET_STATE, RESET_TEST
} from "../actions/actionsType";

const initialState = {
    questions: null,
    activeQuiz: 0,
    isFinish: false,
    answerStatus: null,
    results: {},
    load: false,
    error: null
};

export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case QUIZ_LIST_LOADING:
            return {
                ...state,
                load: true
            };
        case LOAD_CURRENT_QUIZ:
            return {
                ...state,
                questions: action.payload,
                load: false
            };
        case QUIZ_LIST_ERROR:
            return {
                ...state,
                error: action.payload,
                load: false
            };
        case QUIZ_SET_STATE: {
            return {
                ...state,
                answerStatus: action.answerState,
                results: action.results,
            }
        }
        case FINISH_QUIZ: {
            return {
                ...state,
                isFinish: true
            }
        }
        case NEXT_QUIZ: {
            return {
                ...state,
                answerStatus: null,
                activeQuiz: action.activeQuiz
            }
        }
        case RESET_TEST: {
            return {
                ...state,
                activeQuiz: 0,
                isFinish: false,
                answerStatus: null,
                results: {},
            }
        }

        default:
            return state
    }
}