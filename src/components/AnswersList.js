import React from 'react';
import AnswerItem from "./AnswerItem";

const AnswersList = ({answerList, handlerAnswer, answerStatus}) => {
    return (
        <div>
            <ul className={'list-group'}>
                {
                    answerList.map((item, index) => {
                        return <li key={index} className={'list-group-item'}>
                            <AnswerItem
                                item={item.text}
                                onClick={() => handlerAnswer(item.id)}
                                answerStatus={answerStatus ? answerStatus[item.id] : null}
                            />
                        </li>
                    })
                }
            </ul>
        </div>
    );
};

export default AnswersList;