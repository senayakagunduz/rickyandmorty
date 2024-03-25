import {  useDispatch, useSelector } from "react-redux"
import { Favorite } from "../interface";
import { Link } from "react-router-dom";
import { removeFavorite } from "../store/favorite-slice";
import FavoriteCardItem from "../components/FavoriteCard";
import CardItem from "../components/Card";
const FavoritesPage:React.FC = () => {
  const favorite=useSelector((state:{favorite:Favorite})=>state.favorite);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = (item:any) => {
    dispatch(removeFavorite(item));
  };
  return (
    <div className="favorite-container">
      <h2 style={{textAlign:"center",fontSize:"30px"}}>Favorite Items</h2>
      <h3 style={{textAlign:"center"}}>You have {favorite.favoriteItems.length} favorite items </h3>
        {favorite.favoriteItems.length===0 ? (
          <div className="favorite-emty">
            <h2>Your cart is currently empty</h2>
            <div className="start-favorite">
              <Link to="/character">
                <span>Start Shopping Now!</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="cartItems">
            {
             favorite.favoriteItems.map((item, id)=>(
              <FavoriteCardItem key={id} 
              item={item} removeFromFavorites={handleRemoveFromFavorites}/>
  
             ))
            }
          </div>
        )}
    </div>
  )
}

export default FavoritesPage