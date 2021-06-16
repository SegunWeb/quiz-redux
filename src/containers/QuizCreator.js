import React, {Component} from 'react';
import Button from "../components/UI/Button";
import {createValidator, validate, validateForm} from '../components/form/FormFrame'
import Input from "../components/UI/Input";
import Select from "../components/UI/Select";
import Fragment from "../hoc/Fragment";
import {connect} from "react-redux";
import {createQuiz, finishCreateQuiz} from "../actions";

function inputCreator(number) {
    return createValidator({
        name: `Option ${number}`,
        errorMessage: "Error place should not be empty",
        id: number
    }, {required: true})
}
function createFormControls() {
    return {
        question: createValidator({
            name: 'Enter quiz',
            errorMessage: 'Error place should not be empty'
        }, {required: true}),
        option1: inputCreator(1),
        option2: inputCreator(2),
        option3: inputCreator(3),
        option4: inputCreator(4),
    }
}

class QuizCreator extends Component {

    state = {
        rightAnswerId: 1,
        formControl: createFormControls(),
        isValid: false
    };

    changeValue = (value, item) => {
        const {formControl} = this.state;
        const controls = {...formControl[item]};

        controls.touched = true;
        controls.value = value;
        controls.valid = validate(controls.value, controls.validation);

        formControl[item] = controls;

        this.setState({
            formControl,
            isValid: validateForm(formControl)
        })
    };

    renderInputs = () => {
        const {formControl} = this.state;
        return Object.keys(formControl).map((item, index) => {
            const controls = formControl[item];
            const { name,  value, touched, valid, errorMessage, validation} = controls;

            return <Fragment key={index+name}>
            <Input
                name={name}
                value={value}
                touched={touched}
                valid={valid}
                shouldValidate={!!validation}
                errorMessage={errorMessage}
                onChange={e => this.changeValue(e.target.value, item)}
            />
            {index === 0 ? <hr/> : null}
            </Fragment>
        })
    };

    selectChange = (e) => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    };

    addQuestionHandler = (e) => {
        e.preventDefault();
        const {formControl, rightAnswerId} = this.state;

        // const quizArr = quiz.concat();

        const questionItem = {
            question: formControl.question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: rightAnswerId,
            answers: [
                {text: formControl.option1.value, id: formControl.option1.id},
                {text: formControl.option2.value, id: formControl.option2.id},
                {text: formControl.option3.value, id: formControl.option3.id},
                {text: formControl.option4.value, id: formControl.option4.id}
            ]
        };
        // quizArr.push(questionItem);

        this.props.createQuiz(questionItem)

        this.setState({

            rightAnswerId: 1,
            formControl: createFormControls(),
            isValid: false
        })

    };

    quizCreator = e => {
        e.preventDefault();
            this.setState({
                rightAnswerId: 1,
                formControl: createFormControls(),
                isValid: false
            })
        this.props.finishCreateQuiz();

        // axios.post('https://quiztest-89aaf-default-rtdb.firebaseio.com/quizes.json', quiz)
        //     .then(res => console.log(res))
        //     .catch(error => console.log(error))


    };

    render() {
        const {rightAnswerId} = this.state;

        return (
            <div>
                <h1>Creator quiz</h1>

                <form className={'my-2'} onSubmit={e => e.preventDefault()}>

                    {this.renderInputs()}

                    <Select
                        name={'Please choice true answer'}
                        value={rightAnswerId}
                        onChange={this.selectChange}
                        options={[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4},

                        ]}
                    />

                    <div className={'btn-group mt-4'}>
                        <Button disabled={!this.state.isValid} onClick={this.addQuestionHandler} className={'btn btn-primary'}>Add quiz</Button>
                        <Button disabled={this.props.quiz.length === 0} onClick={this.quizCreator} className={'btn btn-success'}>Create test</Button>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {

    return {
        quiz: state.createTest.quiz
    }
};

const mapDispatchToProps = (dispacth) => {
    return {
        finishCreateQuiz: () => dispacth(finishCreateQuiz()),
        createQuiz: (item) => dispacth(createQuiz(item))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);