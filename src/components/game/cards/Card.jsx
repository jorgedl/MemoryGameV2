import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';

import './less/Card.less';

function Card({
    icon,
    onSelect,
    selected,
    correct,
    error,
    flipped
}) {
    const cardClasses = classNames('card', {
        'card--selected': selected && !correct,
        'card--correct': correct,
        'card--wrong': error,
    });
    return (
        <button
            className={cardClasses}
            type="button"
            onClick={onSelect}
        >
            { (
                flipped
                || selected
                || error
                || correct
            ) ? (<i className="card__icon material-icons">{icon}</i>) : '' }
        </button>
    );
}

Card.propTypes = {
    icon: PropTypes.string.isRequired,
    selected: PropTypes.bool,
    correct: PropTypes.bool,
    error: PropTypes.bool,
    flipped: PropTypes.bool,
    onSelect: PropTypes.func.isRequired
};

Card.defaultProps = {
    selected: false,
    correct: false,
    error: false,
    flipped: false
};

export default connect()(Card);
