import React from 'react';
import PropTypes from 'prop-types';

import Card from './cards/Card';
import GameBoard from './GameBoard';

import './less/Game.less';

let timer;
let clearingErrors = false;

function Game({
    board,
    score,
    prepareCards,
    pickCard,
    postCardPick,
    unmarkErrors,
    flipAllCards
}) {
    const {
        cardList,
        hasError,
        cardsFlipped,
        hasGameFinished
    } = board;

    const {
        points,
        tries
    } = score;
    if (hasError && !clearingErrors) {
        clearingErrors = true;
        setTimeout(() => {
            unmarkErrors();
            clearingErrors = false;
        }, 500);
    }
    if (cardList.length > 0 && cardsFlipped) {
        clearTimeout(timer);
        timer = setTimeout(flipAllCards, 1000);
    }
    return (
        <div className="game">
            <div className="game__score">
                { !cardsFlipped && (
                    <button
                        type="button"
                        className="button"
                        onClick={() => {
                            prepareCards();
                        }}
                    >
                        Reset
                    </button>
                ) }
                <div>
                    {`You scored ${points} points in ${tries} tries`}
                </div>
            </div>
            <GameBoard
                onClick={prepareCards}
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
                            onSelect={() => {
                                const card = {
                                    id,
                                    variant,
                                    selected,
                                    correct
                                };
                                pickCard(card);
                                postCardPick(cardList, card);
                            }}
                        />
                    ))
                }
            </GameBoard>
        </div>
    );
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
    postCardPick: PropTypes.func.isRequired,
    flipAllCards: PropTypes.func.isRequired
};

export default Game;
