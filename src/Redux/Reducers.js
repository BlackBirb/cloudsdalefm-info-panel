import { combineReducers } from 'redux';

import user from './userReducer'
import player from './playerReducer'

const Reducers = combineReducers({ user, player })

export default Reducers