import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './less/TextInput.less';

function Button({
    onChange,
    className,
    placeholder,
    onKeyUp
}) {
    const inputClasses = classNames('input', className);
    return (
        <input
            type="text"
            className={inputClasses}
            placeholder={placeholder}
            onChange={onChange}
            onKeyUp={onKeyUp}
        />
    );
}

Button.propTypes = {
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
    onKeyUp: PropTypes.func
};

Button.defaultProps = {
    className: '',
    placeholder: '',
    onKeyUp: () => {}
};

export default Button;
