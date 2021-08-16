import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {fetchQuizes} from "../actions";



class QuizList extends Component {


    componentDidMount() {

        this.props.fetchQuizes()
    }



    render() {
        const {quizes, load} = this.props;


        const arrQuiz = quizes ?
            quizes.map((item, index) => {
                    return <li className={'list-group-item'} key={index}><Link to={`/quiz/${item.id}`}>{item.name}</Link></li>
                }) : <div className="alert alert-danger">
                        <p>Список созданных опросов пуст</p>
                        <p>Для создания опроса авторизируйтесь <Link to={'/auth'}>"перейти"</Link></p>

                     </div>

        return (
            <>
                {
                    load ?
                        <span>loading...</span> :

                        <ul className={'list-group'}>
                            {arrQuiz}
                        </ul>
                }
            </>

        );
    }
}
const mapStateToProps = (state) => {
    return {
        quizes: state.quizList.quizes,
        load: state.quizList.load
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizList);