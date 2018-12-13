import { connect } from 'react-redux';
import {
    prepareCards,
    pickCard,
    unmarkErrors,
    flipAllCards
} from '../actions/boardActions';
import {
    postCardPick,
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
        pickCard: card => dispatch(pickCard(card)),
        unmarkErrors: () => dispatch(unmarkErrors()),
        flipAllCards: () => dispatch(flipAllCards()),
        postCardPick: (list, card) => dispatch(postCardPick(list, card)),
        setUserName: userName => dispatch(setUserName(userName))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameBoard);
