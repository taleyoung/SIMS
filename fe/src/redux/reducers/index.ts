import {combineReducers} from 'redux';

import counter from './counter';
import user from './user'

let reducers = combineReducers({counter, user});
export default reducers;
