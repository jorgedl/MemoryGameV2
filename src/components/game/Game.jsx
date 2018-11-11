import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    prepareCards,
    pickCard,
    unmarkErrors,
    flipAllCards
} from '../../actions/boardActions';

import Card from './cards/Card';
import GameBoard from './GameBoard';

import './less/Game.less';

let timer;

function Game({
    board,
    prepareCards: prepareCardsFunc,
    pickCard: pickCardFunc,
    unmarkErrors: unmarkErrorsFunc,
    flipAllCards: flipAllCardsFunc
}) {
    const {
        cardList,
        hasError,
        cardsFlipped,
        hasGameFinished
    } = board;
    if (hasError) {
        setTimeout(unmarkErrorsFunc, 500);
    }
    if (cardList.length > 0 && cardsFlipped) {
        clearTimeout(timer);
        timer = setTimeout(flipAllCardsFunc, 1000);
    }
    return (
        <div className="game">
            <div className="game__score">
                { !cardsFlipped && (
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            prepareCardsFunc();
                        }}
                    >
                        Reset
                    </button>
                ) }
            </div>
            <GameBoard
                onClick={prepareCardsFunc}
                hasGameFinished={hasGameFinished}
            >
                {
                    cardList.map(({
                        id,
                        icon,
                        variant,
                        selected,
                        correct,
                        error,
                    }) => (
                        <Card
                            key={`${id}${variant}`}
                            icon={icon}
                            variant={variant}
                            selected={selected}
                            correct={correct}
                            error={error}
                            flipped={cardsFlipped}
                            onSelect={() => pickCardFunc({
                                id,
                                variant,
                                selected,
                                correct
                            })}
                        />
                    ))
                }
            </GameBoard>
        </div>
    );
}

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
    };
}

Game.propTypes = {
    board: PropTypes.shape({
        cardList: PropTypes.arrayOf(
            PropTypes.shape({})
        ),
        hasError: PropTypes.bool,
        cardsFlipped: PropTypes.bool
    }).isRequired,
    score: PropTypes.shape({}).isRequired,
    prepareCards: PropTypes.func.isRequired,
    pickCard: PropTypes.func.isRequired,
    unmarkErrors: PropTypes.func.isRequired,
    flipAllCards: PropTypes.func.isRequired
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game);
