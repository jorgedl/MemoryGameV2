const initialState = {
    userName: undefined,
    points: 0,
    elapsedTime: 0
};

function setUserName(state, { userName }) {
    return Object.assign(
        {},
        state,
        {
            userName
        }
    );
}

function score(state = initialState, action) {
    switch (action.type) {
    case 'SET_USER_NAME':
        return setUserName(state, action);
    default:
        return state;
    }
}

export default score;
