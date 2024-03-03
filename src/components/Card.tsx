import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";

const CardItem = (props: { item: any, removeFromFavorites: any}) => {
    const { item } = props;
    const dispatch = useDispatch();

    const handleRemoveFromFavorite = () => {
        dispatch(removeFavorite(item));
        removeFavorite(item);
    };

    const handleAddToFavorite = () => {
        dispatch(addToFavorite(item));
        addToFavorite(item);
    }

    return (
        <div className="container">
            <div className="character-detail">
                <div className="image__container">
                    <img src={item?.image} alt="Character Image" />
                </div>
                <div className="container">
                    <h1>Name:{item.name}</h1>
                    <p>Status: {item?.status}</p>
                    <p>Species: {item?.species}</p>
                    <p>Type: {item?.type}</p>
                    <p>Gender: {item?.gender}</p>
                    {/* <p>Origin.Name: {item?.origin.name}</p> */}
                    <p>Origin.Url: {item?.origin?.url}</p>
                    <button onClick={handleRemoveFromFavorite}>Remove from Favorites</button>
                    <button onClick={handleAddToFavorite}>Add to Favorites</button>
                </div>
            </div>
        </div>
    )
}

export default CardItem