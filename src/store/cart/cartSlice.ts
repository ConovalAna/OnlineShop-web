import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    cartItems: any[];
    test: string;
}

const initialState: CartState = {
    cartItems: [],
    test: "",
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<any>) => {
            if (!state.cartItems.some((item: any) =>
                item.customId === action.payload.customId)) {
                state.cartItems.push(action.payload)
            }
            else {
                state.cartItems = state.cartItems.filter((item: any) =>
                    item.customId !== action.payload.customId
                );
            }
        },
        removeFromCart: (state, action: PayloadAction<any>) => {
            const index = state.cartItems.indexOf((item: any) =>
                item.customId === action.payload.customId
            );
            state.cartItems = state.cartItems.splice(index, 1);
        }

    },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
