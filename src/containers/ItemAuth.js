import React, {Component} from 'react';
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import is from 'is_js'

import {connect} from "react-redux";
import {auth} from "../actions";




class ItemAuth extends Component {


    state = {
        formControl: {
            email : {
                type: "email",
                name: "Email",
                placeholder: 'Enter email',
                value: '',
                touched: false,
                valid: false,
                errorMessage: 'Error email',
                validation: {
                    required: true,
                    email: true
                }
            },
            password : {
                type: "password",
                name: "Password",
                placeholder: 'Enter password',
                value: '',
                touched: false,
                valid: false,
                errorMessage: 'Error password',
                validation: {
                    required: true,
                    minLength: 6
                }
            },
        },
        isValid: false
    };


    validateControl = (value, validation) => {
        if(!validation) {
            return true
        }

        let isValid = true;

        if(validation.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.email) {
            isValid = is.email(value) && isValid;
        }
        if(validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return  isValid

    };

    changeValue = (e, item) => {
        const {formControl} = this.state;
        const controls = {...formControl[item]};

        controls.value = e.target.value;
        controls.touched = true;
        controls.valid = this.validateControl(controls.value, controls.validation);

        formControl[item] = controls;

        let isFormValid = true;

        Object.keys(formControl).forEach(name => {
            isFormValid = formControl[name].valid && isFormValid
        });

        this.setState({
            formControl,
            isValid: isFormValid
        })
    };

    renderInput = () => {
        const {formControl} = this.state;
        return Object.keys(formControl).map((item, index) => {
            const control = formControl[item];
            const {type, name, placeholder, value, touched, valid, errorMessage, validation} = control;

            return <Input
                    key={index+type}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    touched={touched}
                    valid={valid}
                    errorMessage={errorMessage}
                    shouldValidate={!!validation}
                    onChange={e => this.changeValue(e, item)}
            />
        })
    };


    loginHandler = () => {
        const {formControl} = this.state;
        this.props.auth(formControl.email.value, formControl.password.value, true);



        // const authData = {
        //     email: formControl.email.value,
        //     password: formControl.password.value,
        //     returnSecureToken: true
        // };

        // try {
        //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCrsORF0M6BZvGq2imXblHly4qqaRJr5Js', authData)
        //     console.log(res.data)
        // }
        // catch (e) {
        //     console.log(e)
        // }
    };


    registerHandler = () => {
        const {formControl} = this.state;
        this.props.auth(formControl.email.value, formControl.password.value, false);

        // const authData = {
        //     email: formControl.email.value,
        //     password: formControl.password.value,
        //     returnSecureToken: true
        // };

        // try {
        //     const res = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCrsORF0M6BZvGq2imXblHly4qqaRJr5Js', authData)
        //     console.log(res.data)
        // }
        // catch (e) {
        //     console.log(e)
        // }
    };

    render() {
        return (
            <div>
                <form onSubmit={e => e.preventDefault()}>

                    {this.renderInput()}

                    <div className={'btn-group mt-4'}>
                        <Button disabled={!this.state.isValid} onClick={this.loginHandler} className={'btn btn-primary'}>Sign In</Button>
                        <Button disabled={!this.state.isValid} onClick={this.registerHandler} className={'btn btn-success'}>Registration</Button>
                    </div>
                </form>


            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
    }
};


export default connect(null, mapDispatchToProps)(ItemAuth);