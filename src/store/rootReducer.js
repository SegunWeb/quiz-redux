import {combineReducers} from "redux";
import quizListReducer from "./reducers/reducerQuizList";
import createTestReducer from "./reducers/reducerCreateTest";
import quizReducer from "./reducers/reducerQuiz";
import authReducer from "./reducers/reducerAuth";

export default combineReducers({
    quizList: quizListReducer,
    createTest: createTestReducer,
    quiz: quizReducer,
    Auth: authReducer
})