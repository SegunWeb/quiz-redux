import React from 'react';
import Drawer from "./Drawer";
import Backdrop from "./Backdrop";
import {NavLink} from "react-router-dom";

const Menu = ({open, handleMenu, isAuth}) => {

    const menu = [
        {to: '/', label: "list", exact: true},
    ];

    if(isAuth) {
        menu.push({to: '/creator', label: "creator", exact: false})
        menu.push({to: '/logout', label: "exit", exact: false})
    } else {
        menu.push({to: '/auth', label: "auth", exact: false})
    }

    const style = [
        open ? 'd-block' : 'd-none'
    ];


    return (
        <div className={'p-4'}>
            <Backdrop handleMenu={handleMenu}  open={open}/>
            <div className={ 'navi px-4'}>
                <Drawer open={open} handleMenu={handleMenu}/>
                <ul className={style.join(' ')}>
                    {
                        menu.map((item, index) => {
                            return <li className={''} key={index}><NavLink onClick={handleMenu} to={item.to} exact={item.exact}>{item.label}</NavLink></li>
                        })
                    }
                </ul>
            </div>


        </div>
    );
};


export default Menu;