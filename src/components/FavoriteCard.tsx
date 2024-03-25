import { useDispatch } from "react-redux";
import { removeFavorite } from "../store/favorite-slice";
import Button from "react-bootstrap/esm/Button";

const FavoriteCardItem = (props: { item: any, removeFromFavorites: any }) => {
    const { item } = props;
    const dispatch = useDispatch();

    const handleRemoveFromFavorite = () => {
        dispatch(removeFavorite(item));
        removeFavorite(item);
    };

    return (
        <div className="carditem-container">
            <div className="card_container">
                <div className="car_data">
                    <img src={item?.image} alt="Character Image" className="img-fluid" />
                    <div className="pro_content">
                        <h2>{item.name}</h2>
                        <p>Status: {item?.status}</p>
                        <p>Species: {item?.species}</p>
                        <p> {item.type ? `Type:${item.type}` : ""}</p>
                        <p>Gender: {item?.gender}</p>
                        <p>Origin.Name: {item?.origin.name}</p>
                        <p>Origin.Url: {item?.origin?.url}</p>
                        <Button className="d-inline" onClick={handleRemoveFromFavorite}>Remove from Favorites</Button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default FavoriteCardItem

