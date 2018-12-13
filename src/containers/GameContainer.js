import { connect } from 'react-redux';
import {
    prepareCards,
    pickCard,
    unmarkErrors,
    flipAllCards
} from '../actions/boardActions';
import {
    postCardPick
} from '../actions/scoreActions';

import Game from '../components/game/Game';


function mapStateToProps({ board, score }) {
    return {
        board,
        score
    };
}

function mapDispatchToProps(dispatch) {
    return {
        prepareCards: () => dispatch(prepareCards()),
        pickCard: card => dispatch(pickCard(card)),
        unmarkErrors: () => dispatch(unmarkErrors()),
        flipAllCards: () => dispatch(flipAllCards()),
        postCardPick: (list, card) => dispatch(postCardPick(list, card))
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
