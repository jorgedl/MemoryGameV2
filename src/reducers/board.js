import { BASE_ELEMENTS as GameCards } from '../data/game-elements';

const initialState = {
    cardList: [],
    hasError: false,
    score: 0,
    cardsFlipped: true
};

const CARDS_QUANTITY = 6;

export function shuffleCards(cardList) {
    return cardList.sort(() => (Math.random() - 0.5));
}

export function pickCards(cardList) {
    return cardList.slice(0, CARDS_QUANTITY);
}

export function hasOneOfSameIdSelected(cardList, id) {
    return cardList.some(
        (
            { id: cardId, selected }
        ) => cardId === id && selected
    );
}

export function hasGameFinished(cardList) {
    return cardList.filter(({ correct }) => correct).length === CARDS_QUANTITY * 2;
}


export function getCards() {
    const cardList = [];
    pickCards(
        shuffleCards(GameCards)
    ).forEach((card) => {
        cardList.push(
            Object.assign(
                {},
                card,
                {
                    variant: 1
                },
            ),
            Object.assign(
                {},
                card,
                {
                    variant: 2
                }
            )
        );
    });
    return shuffleCards(cardList);
}

export function togleCardSelect(card) {
    return Object.assign(
        {},
        card,
        {
            selected: !card.selected
        }
    );
}

export function markCardsAsWrong(cardList, id, variant) {
    return cardList.map((card) => {
        if (
            card.selected
            || (
                id === card.id
                && variant === card.variant
            )
        ) {
            return Object.assign(
                {},
                card,
                {
                    error: true,
                    selected: false
                }
            );
        }
        return card;
    });
}

export function markCardsAsCorrect(cardList, id) {
    return cardList.map((card) => {
        if (id === card.id) {
            return Object.assign(
                {},
                card,
                {
                    correct: true,
                    selected: false
                }
            );
        }
        return card;
    });
}

export function getAllSelected(cardList) {
    return cardList.filter(({ selected }) => selected);
}

export function unmarkErrors(cardList) {
    return {
        cardList: cardList.map(card => Object.assign(
            {},
            card,
            {
                selected: false,
                error: false
            }
        )),
        hasError: false
    };
}

export function selectCardFromList(state, {
    id,
    variant,
    selected,
    correct
}) {
    const { cardList } = state;
    if (correct || selected) {
        return {
            cardList
        };
    }
    if (!selected
        && hasOneOfSameIdSelected(
            cardList,
            id
        )
    ) {
        const list = markCardsAsCorrect(cardList, id);
        if (hasGameFinished(list)) {
            return {
                cardList: markCardsAsCorrect(cardList, id),
                hasGameFinished: true
            };
        }
        return { cardList: markCardsAsCorrect(cardList, id) };
    }
    const selectedList = getAllSelected(cardList);
    if (selectedList.length >= 1
        && selectedList[0].id !== id
    ) {
        return {
            cardList: markCardsAsWrong(cardList, id, variant),
            hasError: true
        };
    }
    return {
        cardList: cardList.map((card) => {
            const {
                id: cardId,
                variant: cardVariant
            } = card;
            if (cardId === id
                && cardVariant === variant
            ) {
                return togleCardSelect(card);
            }
            return card;
        })
    };
}

export function flipCards(cardList) {
    return cardList.map(card => Object.assign(
        {},
        card,
        {
            flipped: true
        }
    ));
}

export function cards(state = initialState, action) {
    switch (action.type) {
    case 'PICK_CARD':
        if (state.cardsFlipped
            || state.hasError
        ) {
            return state;
        }
        return Object.assign(
            {},
            state,
            selectCardFromList(state, action),
        );
    case 'FLIP_ALL_CARDS':
        return Object.assign(
            {},
            state,
            {
                cardList: flipCards(state.cardList, action),
                cardsFlipped: false
            }
        );
    case 'UNMARK_CARD_ERRORS':
        return Object.assign(
            {},
            state,
            unmarkErrors(state.cardList, action)
        );
    case 'PREPARE_CARDS':
        return Object.assign(
            {},
            state,
            {
                cardList: getCards(),
                cardsFlipped: true,
                hasGameFinished: false
            }
        );
    default:
        return state;
    }
}

export default cards;
