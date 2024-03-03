import {configureStore} from "@reduxjs/toolkit";
import favoriteSlice from "./favorite-slice";
import charactersSlice from "./characters-slice";
export const store=configureStore({
    reducer:{
        favorite:favoriteSlice,
        character:charactersSlice,
    }
})