import React, {Component} from 'react';
import Layout from "./hoc/Layout";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import ItemAuth from "./containers/ItemAuth";
import Quiz from "./containers/Quiz";
import QuizList from "./containers/QuizList";
import QuizCreator from "./containers/QuizCreator";
import {connect} from "react-redux";
import Logout from "./components/Logout";
import {autoLog} from "./actions";



class App extends Component {


    componentDidMount() {
        this.props.autoLog()
    }


    render() {

        let routs = (
            <Switch>
                <Route path={'/'} exact component={QuizList}/>
                <Route path={'/auth'} component={ItemAuth}/>
                <Route path={'/quiz/:id'} component={Quiz}/>

                <Redirect to={'/'} />
            </Switch>
        );

        if(this.props.isAuth) {
            routs = (
                <Switch>

                    <Route path={'/'} exact component={QuizList}/>
                    <Route path={'/creator'} component={QuizCreator}/>
                    <Route path={'/quiz/:id'} component={Quiz}/>
                    <Route path={'/logout'} component={Logout}/>

                    <Redirect to={'/'} />
                </Switch>
            )
        }

        return (
            <div>
                <Layout>
                    {routs}
                </Layout>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: !!state.Auth.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        autoLog: () => dispatch(autoLog())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));