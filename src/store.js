import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./reducers/user-reducer";
import loadingReducer from "./reducers/loading-reducer";
import loggedReducer from "./reducers/logged-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import gameReducer from './reducers/game-reducer';
import errorReducer from './reducers/error-reducer';

const allReducers = combineReducers({
  user: userReducer,
  loading: loadingReducer,
  logged: loggedReducer,
  games: gameReducer,
  error: errorReducer
});

const middleWares = [thunk];
const middlewareEnhancer = applyMiddleware(...middleWares);

const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const store = createStore(allReducers, composedEnhancers);

export default store;
