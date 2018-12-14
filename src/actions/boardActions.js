export const prepareCards = () => ({
    type: 'PREPARE_CARDS'
});

export const pickCard = (card, cardList) => ({
    type: 'PICK_CARD',
    card,
    cardList
});

export const unpickCard = id => ({
    type: 'UNPICK_CARD',
    id
});

export const unmarkErrors = () => ({
    type: 'UNMARK_CARD_ERRORS'
});

export const startGame = () => ({
    type: 'START_GAME'
});
