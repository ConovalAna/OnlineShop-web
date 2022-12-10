import { combineReducers } from 'redux';
import counterReducer from './counter/counterSlice';
import cartReducer from './cart/cartSlice';

export default combineReducers({
    counter: counterReducer,
    cart: cartReducer,
});
