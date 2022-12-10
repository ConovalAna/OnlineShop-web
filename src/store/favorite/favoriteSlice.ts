import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addToFavoriteAsync, deleteFromFavoriteAsync } from '../../api/StoreApi';

export interface FavoriteState {
    favoriteItems: any[];
}

const initialState: FavoriteState = {
    favoriteItems: [],
};

export const favoriteSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {

        addToFavorite: (state, action: PayloadAction<any>) => {
            if (!state.favoriteItems.some((item: any) =>
                item.customId === action.payload.customId)) {
                state.favoriteItems.push(action.payload);
                addToFavoriteAsync(11, 1);
            }
            else {
                state.favoriteItems = state.favoriteItems.filter((item: any) =>
                    item.customId !== action.payload.customId
                );
                deleteFromFavoriteAsync(11, 1);
            }
        },
        removeFromFavorite: (state, action: PayloadAction<any>) => {
            const index = state.favoriteItems.indexOf((item: any) =>
                item.customId === action.payload.customId
            );
            deleteFromFavoriteAsync(11, 1);
            state.favoriteItems = state.favoriteItems.splice(index, 1);
        }

    },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;

export default favoriteSlice.reducer;
