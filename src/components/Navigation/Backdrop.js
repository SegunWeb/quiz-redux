import React from 'react';

const Backdrop = ({handleMenu, open}) => {

    const style = [
        'backdrop',
        open ? 'd-block' : 'd-none'
    ]


    return (
        <div className={style.join(' ')} onClick={handleMenu}>
            
        </div>
    );
};

export default Backdrop;