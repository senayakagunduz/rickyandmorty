import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";
import Heart from "react-animated-heart";
import { useState } from "react";
import { CharacterType } from "../interface";

interface IProps{
    item:CharacterType,
}
const CardItem:React.FC<IProps> = ({item}) => {
    const[isClickMap, setIsClickMap]=useState<ClickType>({});
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
            <div className="character-detail px-5 py-5" >
                <div className="image__container flex justify-content-center align-center">
                    <img src={item?.image} alt="Character Image" className="img-fluid" />
                </div>
                <div className="container" style={{position:"relative"}}>
                    <h1>Name:{item.name}</h1>
                    <p>Status: {item?.status}</p>
                    <p>Species: {item?.species}</p>
                    <p> {item.type ? `Type:${item.type}` : ""}</p>
                    <p>Gender: {item?.gender}</p>
                    <p> {item.origin.url ? `Origin.Url:${item.origin.url}` : ""}</p>
                    
                    <Heart
                        isClick={isClickMap[item.id]}
                        onClick={() =>
                            toggleHeart(item.id, item)}
                        styles={{position:"absolute", top:"0", right:"0", paddingRight:"10px"}}
                    />    
                </div>
            </div>
        </div>
    )
}

export default CardItem