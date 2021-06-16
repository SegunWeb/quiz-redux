import React from 'react';
import Button from "./UI/Button";
import {Link} from "react-router-dom";

const IsFinished = ({results, quizLength, quiz, click}) => {

    const count = Object.keys(results).reduce((total, key) => {
        if(results[key] === 'success') {
            total++
        }
        return total
    }, 0);


    return (
        <div>
            <h1>Верные ответы -  {count} из {quizLength} </h1>

            <div>
                {
                    quiz.map((item, index) => {
                        const style = ['fa', results[item.id] === 'error' ? 'fa-times' : 'fa-check'];

                        return <p key={index}>{index} - {item.question} <i className={style.join(' ')}/></p>
                    })
                }
            </div>

            <div>
                <Button onClick={click} className={'btn btn-success'}>Back</Button>
                <Link to={'/'}><Button onClick={click} className={'btn btn-danger'}>Test list</Button></Link>
            </div>

        </div>
    );
};

export default IsFinished;