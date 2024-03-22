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
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";



const CharacterListPage: React.FC = () => {
    const [characterDatas, setCharacterDatas] = useState<CharacterType[]>([])
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(0);
    const [isClickMap, setIsClickMap] = useState<ClickType>({});

    const dispatch = useDispatch();
    const showModal = useSelector((state: any) => state.cart.showModal);

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
    const handleAddToCart = (item: SingleCharacterType) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            quantity: 1,
            image: item.image,
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
            <Row className="my-3">
                {
                    characterDatas.filter(
                        item => filterStatus === "" ||
                            item.status.toLowerCase() === filterStatus).map((item) => (
                                <Col key={item.id} xs={12} sm={6} lg={4} xl={3} className="mb-5">
                                    <Card className="card" style={{position:"relative"}} >
                                        <Link to={`/character/${item.id}`}>
                                            <Card.Img variant="top" src={item.image} alt="img" className="" />
                                            <Card.Body className="card-body">
                                                <Card.Title className="card-title text-center">{item.name}</Card.Title>
                                                <span className="bg-success text-white p-2 rounded fs-5" style={{position:"absolute", top:5, left:5}}>{item.status ? item.status : ""}</span>
                                            </Card.Body>
                                        </Link>
                                        <Heart
                                            isClick={isClickMap[item.id]}
                                            onClick={() => toggleHeart(item.id, item)}
                                            styles={{ position: "absolute", right: "0", top: "0", display: "flex" }} />
                                        <Button className="rounded-0 mt-3 bg-primary"
                                            onClick={() => handleAddToCart(item)}>Add to Cart</Button>
                                    </Card>

                                </Col>
                            ))}
            </Row>
            
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
