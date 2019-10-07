import React from 'react';
import classnames from 'classnames';
import classes from '../auth/auth.module.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const TextFieldGroup = ({
    name,
    change,
    type,
    placeholder,
    error,
    faIcon
}) => {
    return (
        <div className="input-group form-group">
            <div className={classes.Prepend}>
                <span className="input-group-text"><FontAwesomeIcon icon={faIcon}></FontAwesomeIcon></span>
            </div>
            <input 
            className={classnames("form-control", {
                'is-invalid': error
            })} 
            name={name} 
            onChange={change} 
            type={type} 
            placeholder={placeholder} />
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

export default TextFieldGroup;