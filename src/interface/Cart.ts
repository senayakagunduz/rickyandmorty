import { CartItem } from "./CartItem";

export interface Cart{
    cartItems:CartItem[],
    quantity:number, //array kaç elemanlı olduğunu gösterir.
}
//CartItem ı da Cart a yazdım, Cart CartItems tipindeki arraylerden oluşacak.