export const updateScore = score => ({
    type: 'UPDATE_SCORE',
    score
});

export const onChangeUserName = userName => (
    {
        type: 'CHANGE_USER_NAME',
        userName
    }
);

export const postCardPick = (list, card) => (
    {
        type: 'POST_CARD_PICK',
        list,
        card
    }
);


export const setUserName = userName => (
    {
        type: 'SET_USER_NAME',
        userName
    }
);
