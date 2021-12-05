import {createStore,applyMiddleware} from 'redux';
import thunk from "redux-thunk";
const middleware=[thunk];

import rootReducer from './reducer'

const initalState={};

const store=createStore(rootReducer,initalState,applyMiddleware(...middleware));

export default store;
