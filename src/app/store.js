import { combineReducers, compose, createStore } from 'redux';
import userReducer from './features/auth/reducer';
import productReducer from './features/product/reducer';

const rootReducers = combineReducers({
    dataUser: userReducer,
    dataProducts: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducers, composeEnhancers());
export default store;