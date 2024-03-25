import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";
import Heart from "react-animated-heart";
import { useState } from "react";
import { CharacterType } from "../interface";

interface IProps {
    item: CharacterType,
}
const CardItem: React.FC<IProps> = ({ item }) => {
    const [isClickMap, setIsClickMap] = useState<ClickType>({});
    const dispatch = useDispatch();

    const toggleHeart = (id: number, item: CharacterType) => {
        setIsClickMap((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }))
        if (!isClickMap[id]) {
            dispatch(addToFavorite(item))
        } else {
            dispatch(removeFavorite(item))
        }
    }

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
                    </div>
                    <Heart
                        isClick={isClickMap[item.id]}
                        onClick={() =>
                            toggleHeart(item.id, item)}
                        styles={{ position: "absolute", top: "0", right: "0", paddingRight: "10px" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardItem