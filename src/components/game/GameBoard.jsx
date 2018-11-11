import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';

import './less/Game.less';

const GAME_TIP_ONE = 'The cards gonna show for 1 second. Try to memorize them.';
const GAME_TIP_TWO = 'Using your visual memory, make pairs of similar cards.';
const GAME_TIP_THREE = 'Have fun.';

function GameBoardWrapper({ children, onClick, hasGameFinished }) {
    if (hasGameFinished) {
        return (
            <div className="game__board--empty finished">
                Congratulations, you won!
                <Button
                    onClick={onClick}
                    className="welcome__button"
                >
                    Play again
                </Button>
            </div>
        );
    }
    if (children === undefined
        || children.length === 0
    ) {
        return (
            <div className="game__board--empty welcome">
                <h3 className="welcome__title">
                    Memory Game
                </h3>
                <p className="welcome__instructions">
                    Instructions:
                    <br />
                    {`1. ${GAME_TIP_ONE}`}
                    <br />
                    {`2. ${GAME_TIP_TWO}`}
                    <br />
                    {`3. ${GAME_TIP_THREE}`}
                </p>
                <Button
                    onClick={onClick}
                    className="welcome__button"
                >
                    Start Game
                </Button>
            </div>
        );
    }
    return (
        <div className="game__board">
            {children}
        </div>
    );
}

GameBoardWrapper.propTypes = {
    children: PropTypes.node,
    onClick: PropTypes.func.isRequired,
    hasGameFinished: PropTypes.bool
};

GameBoardWrapper.defaultProps = {
    children: undefined,
    hasGameFinished: false
};

export default GameBoardWrapper;
