import { combineReducers, createStore } from "redux";
import userReducer from "./reducers/user-reducer";

const allReducers = combineReducers({
  user: userReducer
});
const store = createStore(allReducers, {
  user: null
}, window.devToolsExtension && window.devToolsExtension());

export default store;
