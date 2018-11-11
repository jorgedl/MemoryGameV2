import { combineReducers } from 'redux';
import board from './board';
import score from './score';

export default combineReducers({
    board,
    score
});
