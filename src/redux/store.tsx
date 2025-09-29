import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./reducers/AuthReducer";
import { userReducer } from "./reducers/UserReducer";

const reducer = combineReducers({
    Auth: authReducer,
    User: userReducer,
});

const initialState = {
    Auth: {
        getauth: [],
    },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;
