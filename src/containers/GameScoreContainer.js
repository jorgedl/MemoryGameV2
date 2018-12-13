import { connect } from 'react-redux';
import {
    flipAllCards,
    prepareCards
} from '../actions/boardActions';

import GameScore from '../components/game/GameScore';


function mapStateToProps({ score }) {
    return {
        score
    };
}

function mapDispatchToProps(dispatch) {
    return {
        flipAllCards: () => dispatch(flipAllCards()),
        prepareCards: () => dispatch(prepareCards())
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GameScore);
