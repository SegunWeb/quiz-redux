import React from 'react';

const Drawer = ({handleMenu, open}) => {

    const style = [
        'fa',
        open ? 'fa-times' : 'fa-bars'
    ];

    return (
        <div onClick={handleMenu}>
            <i className={style.join(' ')}/>
        </div>
    );
};

export default Drawer;