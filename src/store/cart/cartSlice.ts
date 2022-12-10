import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartState {
    cartItems: any[];
    amount: number;
}

const initialState: CartState = {
    cartItems: [],
    amount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            if (
                !state.cartItems.some(
                    (item: any) => item.customId === action.payload.customId
                )
            ) {
                state.cartItems.push(action.payload);
            } else {
                state.cartItems = state.cartItems.filter(
                    (item: any) => item.customId !== action.payload.customId
                );
            }
            let sum = 0;
            state.cartItems.forEach((cartItem) => (sum += cartItem.price));
            state.amount = sum;
        },
        removeFromCart: (state, action: PayloadAction<any>) => {
            const index = state.cartItems.indexOf(
                (item: any) => item.customId === action.payload.customId
            );
            state.cartItems = state.cartItems.splice(index, 1);

            let sum = 0;
            state.cartItems.forEach((cartItem) => (sum += cartItem.price));
            state.amount = sum;
        },
    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
