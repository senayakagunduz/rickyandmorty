import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../interface/Cart";
import { CartItem } from "../interface/CartItem";

const initialState:Cart={
    cartItems:[],
    quantity:0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem= state.cartItems.find((item) => item.id === action.payload.id);
            if(existingItem){
                state.quantity++;
            }else{
                state.cartItems.push({...action.payload, quantity:1})
                state.quantity++;
            }
        },
        

     
    }
})

export const { addToCart} = cartSlice.actions;
export default cartSlice.reducer;

  