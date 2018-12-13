export const prepareCards = () => ({
    type: 'PREPARE_CARDS'
});

export const pickCard = params => ({
    type: 'PICK_CARD',
    ...params
});

export const unpickCard = id => ({
    type: 'UNPICK_CARD',
    id
});

export const unmarkErrors = () => ({
    type: 'UNMARK_CARD_ERRORS'
});

export const flipAllCards = () => ({
    type: 'FLIP_ALL_CARDS'
});
