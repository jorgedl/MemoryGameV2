import { connect } from 'react-redux';
import {
    startGame,
    prepareCards
} from '../actions/boardActions';

import {
    postScore,
} from '../actions/scoreActions';

import GameScore from '../components/game/GameScore';


function mapStateToProps({ score, board }) {
    const { hasGameFinished, hasGameStarted } = board;
    return {
        ...score,
        hasGameFinished,
        hasGameStarted
    };
}

function mapDispatchToProps(dispatch) {
    return {
        startGame: () => dispatch(startGame()),
        postScore: timestamp => dispatch(postScore(timestamp)),
        prepareCards: () => dispatch(prepareCards())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScore);
