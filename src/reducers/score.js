const initialState = {
    userName: undefined,
    points: 0,
    tries: 0,
    elapsedTime: 0
};

function handleCardSelection(state, {
    list,
    card: {
        id,
        selected: isSelected,
        correct
    }
}) {
    let {
        points,
        tries
    } = state;
    const selectedCard = list.find(
        ({ selected }) => selected
    );
    if (
        selectedCard !== undefined
        && !isSelected && !correct
    ) {
        if (selectedCard.id === id) {
            points += 1;
        }
        tries += 1;
    }
    return {
        points,
        tries
    };
}

function score(state = initialState, action) {
    switch (action.type) {
    case 'POST_CARD_PICK':
        return {
            ...state,
            ...handleCardSelection(state, action)
        };
    case 'SET_USER_NAME':
        return {
            ...state,
            userName: action.userName
        };
    case 'PREPARE_CARDS':
        return {
            ...state,
            hasStarted: false,
            tries: 0,
            points: 0
        };
    case 'FLIP_ALL_CARDS':
        return {
            ...state,
            hasStarted: true
        };
    default:
        return state;
    }
}

export default score;
