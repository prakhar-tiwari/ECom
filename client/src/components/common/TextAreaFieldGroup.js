import React from 'react';
import classnames from 'classnames';

const TextAreaFieldGroup = ({
    placeholder,
    name,
    value,
    change,
    error
}) => {
    return (
        <div className="input-group form-group">
            <textarea
                className={classnames("form-control form-control-lg", {
                    'is-invalid': error
                })}
                name={name}
                value={value}
                onChange={change}
                placeholder={placeholder}>
            </textarea>
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
}

export default TextAreaFieldGroup;