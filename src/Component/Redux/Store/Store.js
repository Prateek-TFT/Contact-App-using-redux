import { combineReducers, createStore } from "redux";
import contactReducer from "../Reducer/contactReducer";
const RootReducer = combineReducers({ contactReducer: contactReducer });
const store = createStore(RootReducer);
export default store;
