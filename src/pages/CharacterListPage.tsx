import { useEffect, useState } from "react"
import { CharacterType } from "../interface/Character"
import { getCharacters } from "../service/character-service"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";
import Pagination from "../components/Pagination";
import Heart from "react-animated-heart";
import { SingleCharacterType } from "../interface/SingleCharacter";

const CharacterListPage: React.FC = () => {
    const [characterDatas, setCharacterDatas] = useState<CharacterType[]>([])
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [isClickMap, setIsClickMap] = useState<ClickType>({});
    const dispatch = useDispatch();
   
    const loadData = async (pageNumber:number) => {
        try {
            const getAllCharacters = await getCharacters(pageNumber)
            console.log(getAllCharacters, "getAllCharacters")
            setCharacterDatas(getAllCharacters.results)
            setPageCount(getAllCharacters.info.pages);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadData(pageNumber);
    }, [pageNumber])

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value.toLowerCase())
    }
   
    const handlePageChange = (selectedPage: number) => {
        setPageNumber(selectedPage + 1);
    };

    const toggleHeart=(id:number,item:SingleCharacterType)=>{
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
        <section className="character-list">
            <select onChange={handleFilterChange} value={filterStatus}>
                <option value="dead">Dead</option>
                <option value="alive">Alive</option>
                <option value="unknown">Unknown</option>
                <option value="">All Characters</option>
            </select>
            <div className="character-cards">
                {
                    characterDatas.filter(
                        item => filterStatus === "" ||
                            item.status.toLowerCase() === filterStatus)
                        .map((item) => (
                            <div key={item.id} className="card">

                                <Link to={`/character/${item.id}`}>
                                    <img src={item.image} alt="img" />
                                    <ul>
                                        <li>{item.name}</li>
                                        <li><p>{item.status ? item.status : ""}</p></li>
                                    </ul>
                                </Link>
                             <Heart 
                             isClick={isClickMap[item.id]}
                             onClick={()=>toggleHeart(item.id,item)} />
                            </div>
                        ))
                }
            </div>
            <Pagination
                pageNumber={pageNumber}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
        </section>
    )
}

export default CharacterListPage

// const handleClick = (item: CharacterType) => {
//     dispatch(addToFavorite(item));
//     console.log(item, "item")  
// }