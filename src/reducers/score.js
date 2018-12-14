const initialState = {
    userName: undefined,
    points: 0,
    tries: 0,
    elapsedTime: 0,
    ranking: []
};

function postScoreOnRanking({
    ranking,
    userName,
    tries
}, { timestamp }) {
    const newRanking = [
        ...ranking,
        {
            userName,
            tries,
            timeElapsed: timestamp / 1000
        }
    ];
    return newRanking.sort((a, b) => a.timeElapsed - b.timeElapsed);
}

function handleCardSelection(state, {
    cardList,
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
    const selectedCard = cardList.find(
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
    case 'POST_SCORE':
        return {
            ...state,
            ranking: postScoreOnRanking(state, action)
        };
    case 'PICK_CARD':
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
    default:
        return state;
    }
}

export default score;
