import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../interface/Cart";
import { CartItem } from "../interface/CartItem";
import { toast } from "react-toastify"

//tipi Cart olan initialState tanımladım
const initialState: Cart = {
    cartItems: [],
    quantity: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        //addToCart diyince herbir karater cartını payload olarak göndereceğiz, tipide <CartItem>
        //Eğer bu karakter varsa sayısını artır, yoksa  yeni bir item ekle sonra sayısını artır
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find((item) => item.id === action.payload.id);
            if (existingItem) {
                state.quantity++;
                toast.info("increased character quantity", { position: "bottom-left" })

            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
                state.quantity++;
                toast.success("added a new character to cart", { position: "bottom-left" })
            }
        },
        removeFromCart: (state, action: PayloadAction<CartItem>) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
            state.quantity--;
            toast.warning("character removed from the cart", { position: "bottom-left" })
        },
        increaseAmount:(state,action: PayloadAction<CartItem>)=>{
            const cartItem=state.cartItems.find((item)=>item.id===action.payload.id);
            if(cartItem){
                state.quantity++;
                cartItem.quantity++;
            }
        },
        decreaseAmount:(state,action: PayloadAction<CartItem>)=>{
            const cartItem=state.cartItems.find((item)=>item.id===action.payload.id);
            if(cartItem && cartItem.quantity>1){
                state.quantity--;
                cartItem.quantity--;
            }
            
        }

    }
})

export const { addToCart,removeFromCart,increaseAmount, decreaseAmount} = cartSlice.actions;
export default cartSlice.reducer;

