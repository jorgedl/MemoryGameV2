import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';

function GameScore({
    score,
    prepareCards
}) {
    const {
        points,
        tries,
        hasStarted,
        userName
    } = score;
    return (
        <div className="game__score">
            { hasStarted && (
                <Fragment>
                    <div>
                        { userName }
                    </div>
                    <div>
                        {`You scored ${points} points in ${tries} tries`}
                    </div>
                    <Button
                        onClick={prepareCards}
                    >
                        Reset
                    </Button>
                </Fragment>
            ) }
        </div>
    );
}

GameScore.propTypes = {
    score: PropTypes.shape({}).isRequired,
    prepareCards: PropTypes.func.isRequired,
};

export default GameScore;
