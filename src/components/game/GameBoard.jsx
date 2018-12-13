import React from 'react';
import PropTypes from 'prop-types';
import Button from '../button/Button';
import TextInput from '../input/TextInput';
import Card from './cards/Card';

import './less/Game.less';

const GAME_TIP_ONE = 'The cards gonna show for 1 second. Try to memorize them.';
const GAME_TIP_TWO = 'Using your visual memory, make pairs of similar cards.';
const GAME_TIP_THREE = 'Have fun.';

let timer;

function GameBoard({
    board,
    prepareCards,
    pickCard,
    postCardPick,
    unmarkErrors,
    flipAllCards,
    setUserName
}) {
    const {
        cardList,
        hasError,
        cardsFlipped,
        hasGameFinished
    } = board;

    if (hasGameFinished) {
        return (
            <div className="game__board--empty finished">
                Congratulations, you won!
                <Button
                    onClick={prepareCards}
                    className="welcome__button"
                >
                    Play again
                </Button>
            </div>
        );
    }

    if (cardList === undefined
        || cardList.length === 0
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
                <TextInput
                    placeholder="Your name"
                    onChange={({ target: { value } }) => setUserName(value)}
                    onKeyUp={({ key }) => key === 'Enter' && prepareCards()}
                />
                <Button
                    onClick={prepareCards}
                    className="welcome__button"
                >
                    Start Game
                </Button>
            </div>
        );
    }

    if (hasError) {
        setTimeout(() => {
            unmarkErrors();
        }, 500);
    }
    if (cardList.length > 0 && cardsFlipped) {
        clearTimeout(timer);
        timer = setTimeout(flipAllCards, 1000);
    }

    return (
        <div className="game__board">
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
        </div>
    );
}

GameBoard.propTypes = {
    board: PropTypes.shape({
        cardList: PropTypes.arrayOf(
            PropTypes.shape({})
        ),
        hasError: PropTypes.bool,
        cardsFlipped: PropTypes.bool
    }).isRequired,
    prepareCards: PropTypes.func.isRequired,
    pickCard: PropTypes.func.isRequired,
    unmarkErrors: PropTypes.func.isRequired,
    postCardPick: PropTypes.func.isRequired,
    flipAllCards: PropTypes.func.isRequired,
    setUserName: PropTypes.func.isRequired
};

export default GameBoard;
