import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './less/Button.less';

function Button({
    onClick,
    children,
    className
}) {
    const buttonClasses = classNames('button', className);
    return (
        <button
            onClick={onClick}
            type="button"
            className={buttonClasses}
        >
            {children}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string
};

Button.defaultProps = {
    children: undefined,
    className: ''
};

export default Button;
