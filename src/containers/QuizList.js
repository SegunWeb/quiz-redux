import React, {Component} from 'react';
import {Link} from "react-router-dom";

import {connect} from "react-redux";
import {fetchQuizes} from "../actions";



class QuizList extends Component {


    componentDidMount() {

        this.props.fetchQuizes()

        // try {
        //     const res = await axios.get('/quizes.json')
        //
        //     const quizes = [];
        //     Object.keys(res.data).forEach((key, index) => {
        //         quizes.push({
        //             id: key,
        //             name: `test N${index + 1}`
        //         })
        //     })
        //
        //     this.setState({
        //         quizes,
        //         load: false
        //     })
        //
        //
        // }
        // catch (e) {
        //     console.log(e)
        // }
    }

    render() {
        const {quizes, load} = this.props;

        return (
            <>
                {
                    load ?
                        <span>loading...</span> :

                        <ul className={'list-group'}>
                            {quizes.map((item, index) => {
                                return <li className={'list-group-item'} key={index}><Link to={`/quiz/${item.id}`}>{item.name}</Link></li>
                            })}
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