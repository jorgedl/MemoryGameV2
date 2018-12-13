import React from 'react';

import GameBoardContainer from '../../containers/GameBoardContainer';
import GameScoreContainer from '../../containers/GameScoreContainer';

import './less/Game.less';

function Game() {
    return (
        <div className="game">
            <GameScoreContainer />
            <GameBoardContainer />
        </div>
    );
}

Game.propTypes = {
};

export default Game;
