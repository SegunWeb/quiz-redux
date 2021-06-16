import React from 'react';


const Select = (props) => {
    const itemName = props.name || 'Options';
    const itemId = `${Math.random()}-${itemName}`;

    return (
        <div className={'pt-2'}>
            <label htmlFor={itemId}>{itemName}</label>
            <select
                name={itemName}
                id={itemId}
                onChange={props.onChange}
                value={props.value}
                className={props.className || 'custom-select'}
            >
                { props.options.map((item, index) => {
                        return (
                            <option
                                key={index}
                                value={item.value}
                            >{item.text}</option>
                        )
                    })
                }
            </select>
        </div>
    );
};

export default Select;