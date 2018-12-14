import { connect } from 'react-redux';
import {
    prepareCards,
    pickCard,
    unmarkErrors,
    startGame
} from '../actions/boardActions';
import {
    setUserName
} from '../actions/scoreActions';

import GameBoard from '../components/game/GameBoard';


function mapStateToProps({ board }) {
    return {
        board
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prepareCards: () => dispatch(prepareCards()),
        pickCard: (card, list) => dispatch(pickCard(card, list)),
        unmarkErrors: () => dispatch(unmarkErrors()),
        startGame: () => dispatch(startGame()),
        setUserName: userName => dispatch(setUserName(userName))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBoard);
