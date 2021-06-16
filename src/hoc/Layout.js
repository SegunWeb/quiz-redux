import React, {Component} from 'react';
import Menu from "../components/Navigation/Menu";
import {connect} from "react-redux";



class Layout extends Component {


    state = {
        openMenu: false
    };

    handleMenu = () => {
        this.setState(({openMenu}) => {
            return {
                openMenu: !openMenu
            }
        })
    }


    render() {
        return (
            <div>
                <Menu
                    open={this.state.openMenu}
                    handleMenu={this.handleMenu}
                    isAuth={this.props.isAuth}
                />

                <main className={'container'}>
                    {this.props.children}
                </main>

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        isAuth: !!state.Auth.token
    }
};

export default connect(mapStateToProps)(Layout);