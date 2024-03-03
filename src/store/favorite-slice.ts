import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FavoriteItem } from "../interface";


const initialState = {
    favoriteItems: [] as FavoriteItem[],
    quantity: 0,
}

export const favoriteAmountSlice = createSlice({
    name: "favorite",
    initialState,
    reducers: {
        addToFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            const existingItem = state.favoriteItems.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.favoriteItems.push(action.payload);
                state.quantity++;
                console.log(state.favoriteItems, "favoriItems")
                localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
            }

        },
        removeFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            state.favoriteItems = state.favoriteItems.filter(item => item.id !== action.payload.id);
            localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
        }
    }
})

export const { addToFavorite, removeFavorite } = favoriteAmountSlice.actions;
export default favoriteAmountSlice.reducer;
