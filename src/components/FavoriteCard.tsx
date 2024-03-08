import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";

const FavoriteCardItem = (props: { item: any, removeFromFavorites: any}) => {
    const { item } = props;
    const dispatch = useDispatch();

    const handleRemoveFromFavorite = () => {
        dispatch(removeFavorite(item));
        removeFavorite(item);
    };

    return (
        <div className="container">
            <div className="character-detail px-5">
                <div className="image__container">
                    <img src={item?.image} alt="Character Image" />
                </div>
                <div className="container">
                    <h1>Name:{item.name}</h1>
                    <p>Status: {item?.status}</p>
                    <p>Species: {item?.species}</p>
                    <p>Type: {item?.type}</p>
                    <p>Gender: {item?.gender}</p>
                    <p>Origin.Name: {item?.origin.name}</p>
                    <p>Origin.Url: {item?.origin?.url}</p>
                    <button className="d-inline" onClick={handleRemoveFromFavorite}>Remove from Favorites</button>
                </div>
            </div>
        </div>
    )
}

export default FavoriteCardItem