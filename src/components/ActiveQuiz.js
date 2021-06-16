import React from 'react';
import AnswersList from "./AnswersList";

const ActiveQuiz = ({currentQuiz, quizLength, answerList, handlerAnswer, activeQuiz, answerStatus}) => {
    return (
        <div className={'p-3'}>
            <h1>{currentQuiz}</h1>
            <div>
               <AnswersList
                   answerList={answerList}
                   handlerAnswer={handlerAnswer}
                   answerStatus={answerStatus}
               />
            </div>
            <p className={'my-2'}>{activeQuiz} из {quizLength}</p>
        </div>
    );
};

export default ActiveQuiz;