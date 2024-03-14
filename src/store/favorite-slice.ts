import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FavoriteItem } from "../interface";
import { toast } from "react-toastify";


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
                toast.success("character added to favorite",{position:"bottom-left"})
            }

        },
        removeFavorite: (state, action: PayloadAction<FavoriteItem>) => {
            state.favoriteItems = state.favoriteItems.filter(item => item.id !== action.payload.id);
            state.quantity--;
            localStorage.setItem("favoriteItems", JSON.stringify(state.favoriteItems));
            toast.success("added a new character to cart",{position:"bottom-left"})
        }
    }
})

export const { addToFavorite, removeFavorite } = favoriteAmountSlice.actions;
export default favoriteAmountSlice.reducer;
