import axios from "./axios";
import {
    ADD_ITEM_QUESTION,
    FINISH_QUIZ,
    LOAD_CURRENT_QUIZ, NEXT_QUIZ,
    QUIZ_LIST_ERROR,
    QUIZ_LIST_LOADING,
    QUIZ_LIST_SUCCESS, QUIZ_SET_STATE, RESET_INPUTS, RESET_TEST, TOKEN, TOKEN_LOGOUT
} from "./store/actions/actionsType";

// quiz list
export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await axios.get('/quizes');
            const res = response.json()
            const quizes = [];

            Object.keys(res.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `test ${ index + 1}`
                })
            });
             dispatch(fetchQuizesSuccess(quizes))
        }

        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
};
export const fetchQuizesStart = () => {
    return {
        type: QUIZ_LIST_LOADING,
    }
};
export const fetchQuizesSuccess = (quizes) => {
    return {
        type: QUIZ_LIST_SUCCESS,
        payload: quizes
    }
};
export const fetchQuizesError = (error) => {
    return {
        type: QUIZ_LIST_ERROR,
        payload: error
    }
};
export const fetchQuizById = (id) => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const res = await axios.get(`/quizes/${id}.json`);

            const questions = res.data;

            dispatch(fetchGetCurrentQuiz(questions))

        }
        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
};
export const fetchGetCurrentQuiz = (questions) => {
    return {
        type: LOAD_CURRENT_QUIZ,
        payload: questions
    }
};

// quiz
export const stateQuiz = (answerState, results) => {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
};
export const finishQuiz = () => {
    return {
        type: FINISH_QUIZ
    }
};
export const nextQuiz = (activeQuiz) => {
    return {
        type: NEXT_QUIZ,
        activeQuiz
    }
};
export const quizAnswerClick = (id) => {
    return (dispatch, getState) => {
        const state = getState().quiz;
        const {activeQuiz, questions, answerStatus, results} = state;

        if(answerStatus) {
            const key = Object.keys(answerStatus)[0];
            if(answerStatus[key] === 'success') {return}
        }

        if(id === questions[activeQuiz].rightAnswerId) {

            if(!results[questions[activeQuiz].id]) {
                results[questions[activeQuiz].id] = 'success'
            }


            dispatch(stateQuiz({[id]: 'success'}, results));

            // this.setState({
            //     answerStatus: {[id]: 'success'},
            //     results
            // });

            const timer = window.setTimeout(() => {

                if(questions.length === activeQuiz + 1) {

                    dispatch(finishQuiz())

                    // this.setState({
                    //     isFinish: true
                    // })
                }

                else {

                    dispatch(nextQuiz(activeQuiz + 1))


                    // this.setState({
                    //     activeQuiz: activeQuiz + 1,
                    //     answerStatus: null
                    // });
                }

                window.clearTimeout(timer)
            }, 1000)
        }

        else {

            results[questions[activeQuiz].id] = 'error';

            dispatch(stateQuiz( {[id]: 'error'}, results));

            // this.setState({
            //     answerStatus: {[id]: 'error'},
            //     results
            // })
        }
    }
};
export const quizResetTest = () => {
    return {
        type: RESET_TEST
    }
};

// create quiz
export const createQuiz = (item) => {
    return {
        type: ADD_ITEM_QUESTION,
        item
    }
};
export const resetInputs = () => {
    return {
        type: RESET_INPUTS
    }
};
export const finishCreateQuiz = () => {
    return async (dispatch, getState) => {
        const state = getState().createTest.quiz;
        await   axios.post('/quizes.json', state);

        dispatch(resetInputs())
    }
};

//auth
export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        };

        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrsORF0M6BZvGq2imXblHly4qqaRJr5Js';
        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrsORF0M6BZvGq2imXblHly4qqaRJr5Js'
        }
        const res = await axios.post(url, authData);
        const data = res.data;

        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken))
        dispatch(authLogout(data.expiresIn))
    }
};
export const authSuccess = (token) => {
    return {
        type: TOKEN,
        token
    }
};
export const logout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: TOKEN_LOGOUT,
    }
};
export const authLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
};

export const autoLog = () => {
    return async dispatch => {
        const token = localStorage.getItem('token')

        if(!token) {
            dispatch(logout())
        }
        else {
           const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()) {
                dispatch(logout())
            }
            else {
                dispatch(authSuccess(token))
                dispatch(authLogout((expirationDate.getTime() - new Date().getTime()) / 1000))
            }
        }
    }
};

