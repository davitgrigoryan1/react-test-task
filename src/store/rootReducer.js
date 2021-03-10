import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import appReducer from "./appReducer";


const reducers = combineReducers({app: appReducer})

const store = createStore(reducers, applyMiddleware(thunk))

export default store