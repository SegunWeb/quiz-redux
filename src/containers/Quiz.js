import React, {Component} from 'react';
import ActiveQuiz from "../components/ActiveQuiz";
import IsFinished from "../components/IsFinished";

import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, quizResetTest} from "../actions";


class Quiz extends Component {

    // state = {
    //     questions: [],
    //     activeQuiz: 0,
    //     isFinish: false,
    //     answerStatus: null,
    //     results: {},
    //     load: true
    // };


    async componentDidMount() {


        this.props.fetchQuizById(this.props.match.params.id);

        // try {
        //     const res = await axios.get(`/quizes/${this.props.match.params.id}.json`)
        //
        //     const questions = res.data;
        //
        //     this.setState({
        //         questions,
        //         load: false
        //     })
        //
        //
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }

    componentWillUnmount() {
        this.props.quizResetTest()
    }


    handlerAnswer = (id) => {

        this.props.quizAnswerClick(id)


        // const {activeQuiz, questions, answerStatus, results} = this.props;
        //
        // if(answerStatus) {
        //     const key = Object.keys(answerStatus)[0];
        //         if(answerStatus[key] === 'success') {return}
        // }
        //
        // if(id === questions[activeQuiz].rightAnswerId) {
        //
        //     if(!results[questions[activeQuiz].id]) {
        //         results[questions[activeQuiz].id] = 'success'
        //     }
        //
        //     this.setState({
        //         answerStatus: {[id]: 'success'},
        //         results
        //     });
        //
        //     const timer = window.setTimeout(() => {
        //
        //         if(questions.length === activeQuiz + 1) {
        //             this.setState({
        //                 isFinish: true
        //             })
        //         }
        //
        //         else {
        //             this.setState({
        //                 activeQuiz: activeQuiz + 1,
        //                 answerStatus: null
        //             });
        //         }
        //
        //         window.clearTimeout(timer)
        //     }, 1000)
        // }
        //
        // else {
        //
        //     results[questions[activeQuiz].id] = 'error';
        //
        //     this.setState({
        //         answerStatus: {[id]: 'error'},
        //         results
        //     })
        // }

    };

    resetQuiz = () => {

        this.props.quizResetTest()


        // this.setState({
        //     activeQuiz: 0,
        //     isFinish: false,
        //     answerStatus: null,
        //     results: {},
        // })
    }


    render() {
        const {activeQuiz, questions, isFinish, answerStatus, results, load} = this.props;

        return (
            <div className={'container'}>

                {
                    load || !questions ? <span>loading...</span> :

                        isFinish ? <IsFinished
                            results={results}
                            quizLength={questions.length}
                            quiz={questions}
                            click={this.resetQuiz}
                        /> :
                            <ActiveQuiz
                                currentQuiz={questions[activeQuiz].question}
                                quizLength={questions.length}
                                answerList={questions[activeQuiz].answers}
                                handlerAnswer={this.handlerAnswer}
                                activeQuiz={activeQuiz + 1}
                                answerStatus={answerStatus}
                            />
                }



            </div>
        );
    }
}

const mapStateToProps = (state) => {

    const { questions, activeQuiz, isFinish, answerStatus, results, load } = state.quiz;

    return {
        questions, activeQuiz, isFinish, answerStatus, results, load
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        quizResetTest: () => dispatch(quizResetTest())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz);