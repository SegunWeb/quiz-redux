import React from 'react';
import '../style.css'

const AnswerItem = ({item, onClick, answerStatus}) => {


    const style = [];
    if(answerStatus) {
        style.push(answerStatus)
    }

    return (
        <p className={style.join(' ')} onClick={onClick}>
            {item}
        </p>
    );
};

export default AnswerItem;