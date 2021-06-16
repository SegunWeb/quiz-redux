import React from 'react';

function isValid({valid, touched, shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const itemType = props.type || 'text';
    const itemId = `${Math.random()}-${itemType}`;
    const itemName = props.name || itemType;
    const placeholder = props.placeholder || `Enter ${itemType}`;

    return (
        <div className={'mt-3'}>
            <label htmlFor={itemId}>{itemName}</label>

            <input type={itemType}
                   name={itemName}
                   id={itemId}
                   placeholder={placeholder}
                   onChange={props.onChange}
                   value={props.value}
                   className={props.className || 'form-control'}
            />

            {
                isValid(props) ?  <p className={'pt-2 text-danger'}>{props.errorMessage || `Error ${itemType}`}</p> : null
            }

        </div>
    );
};

export default Input;