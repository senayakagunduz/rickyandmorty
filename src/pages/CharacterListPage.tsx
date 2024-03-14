import { useEffect, useState } from "react"
import { CharacterType } from "../interface/Character"
import { getCharacters } from "../service/character-service"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addToFavorite, removeFavorite } from "../store/favorite-slice";
import Pagination from "../components/Pagination";
import Heart from "react-animated-heart";
import { SingleCharacterType } from "../interface/SingleCharacter";
import Button from "react-bootstrap/esm/Button";
import { addToCart } from "../store/cart-slice";
import MyVerticallyCenteredModal from "../components/Modal";



const CharacterListPage: React.FC = () => {
    const [characterDatas, setCharacterDatas] = useState<CharacterType[]>([])
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [isClickMap, setIsClickMap] = useState<ClickType>({});

    const dispatch = useDispatch();
    const showModal=useSelector((state:any)=>state.cart.showModal);
   
    

    const loadData = async (pageNumber: number) => {
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

    const toggleHeart = (id: number, item: SingleCharacterType) => {
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
    //handleAddToCart dan itemı karşıladım, item:SingleCharacterType tipinde
    //dispatch metodu ile slicedaki addToCart metoduyla verileri gönderiyorum , yani redux a (id,name,quantity,image) verilerini yazıcam, sonra modal dan gönderdiğim verileri çekicem
    const handleAddToCart=(item:SingleCharacterType)=>{
       dispatch(addToCart({
        id:item.id,
        name:item.name,
        quantity:1,
        image:item.image,
       }));
    }

    const closeModalHandler = () => {
      
    }
    return (
        <section className="character-list">
            <select onChange={handleFilterChange} value={filterStatus}>
                <option value="dead">Dead</option>
                <option value="alive">Alive</option>
                <option value="unknown">Unknown</option>
                <option value="">All Characters</option>
            </select>
            <div className="character-cards posiyion-relative">
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
                                        onClick={() => toggleHeart(item.id, item)}
                                        styles={{position:"absolute",right:"0",top:"0"}} />
                                        {/*Butondan onClick de handleAddToCart fonksiyonuna itemı yolladım , item yukarıdan geliyor, her bir karakter Kartı yani*/}
                                    <Button className="rounded-0 mt-3 bg-primary" 
                                    onClick={()=>handleAddToCart(item)}>Add to Cart</Button>
                            </div>
                        ))
                }
            </div>
            <Pagination
                pageNumber={pageNumber}
                pageCount={pageCount}
                onPageChange={handlePageChange}
            />
            <MyVerticallyCenteredModal
                show={showModal}
                onHide={closeModalHandler}
                />
        </section>
    )
}

export default CharacterListPage
