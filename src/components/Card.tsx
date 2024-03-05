import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";
import Heart from "react-animated-heart";
import { useState } from "react";
import { CharacterType } from "../interface";

const CardItem = (props: { item: any, removeFromFavorites: any }) => {
    const[isClickMap, setIsClickMap]=useState<ClickType>({});
    const { item } = props;
    const dispatch = useDispatch();

    const toggleHeart=(id:number,item:CharacterType)=>{
        setIsClickMap((prevState)=>({
            ...prevState,
            [id]:!prevState[id]
        }))
        if(!isClickMap[id]){
            dispatch(addToFavorite(item))
        }else{
            dispatch(removeFavorite(item))
        }
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
                    <Heart
                        isClick={isClickMap[item.id]}
                        onClick={() =>
                            toggleHeart(item.id, item)}
                    />
                </div>
            </div>
        </div>
    )
}

export default CardItem