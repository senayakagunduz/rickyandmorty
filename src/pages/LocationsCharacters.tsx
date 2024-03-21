import { useEffect, useState } from 'react'
import { getLocationById } from '../service/location-service'
import { Link, useParams } from 'react-router-dom'
import { getCharacterByUrl } from '../service/character-service';
import { CharacterType } from '../interface/Character';
import { useDispatch } from 'react-redux';
import { addToFavorite, removeFavorite } from '../store/favorite-slice';
import { getCharacterList, setCharacterList } from '../store/characters-slice';
import Heart from 'react-animated-heart';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';


const LocationsCharacters = () => {
    const [characterDatas, setCharacterDatas] = useState<CharacterType[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filteredDatas] = useState<CharacterType[]>([]);


    const residents: (CharacterType)[] = [];
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();

    const loadData = async () => {
        try {
            const resp = await getLocationById(Number(id));
            console.log(resp);

            const residentsPromises = resp.residents.map((element: any) => getCharacterByUrl(element));
            const residentsData = await Promise.all(residentsPromises);
            console.log(residentsData, "residentsData");

            if (residents.length === 0) {
                residentsData.map((characterData: any) => {
                    residents.push(characterData.data);
                });
                setCharacterDatas(residents);
            }
            dispatch(setCharacterList()); // Reset the character list in Redux store
            const characterList = dispatch(getCharacterList({ character: residents })); // Redux'a veriyi gönder
            console.log(characterList, "characterList")

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        loadData()
    }, [])

    const handleAddToFavorite = (item: CharacterType) => {
        dispatch(addToFavorite(item))
    }

    const handleRemoveFromFavorite = (item: CharacterType) => {
        dispatch(removeFavorite(item))
    }

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilterStatus(e.target.value.toLowerCase())
    }
    if (!residents) {
        return <div>Loading...</div>
    }
    console.log(characterDatas, "characterdata")
    console.log(filteredDatas, "filteredDatas")
    return (
        <div className='character-list'>
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
                                    <Card className="card" style={{ position: "relative" }} >
                                        <Link to={`/character/${item.id}`}>
                                            <Card.Img variant="top" src={item.image} alt="img" className="" />
                                            <Card.Body className="card-body">
                                                <Card.Title className="card-title text-center">{item.name}</Card.Title>
                                                <span className="bg-success text-white p-2 rounded fs-5" style={{ position: "absolute", top: 5, left: 5 }}>{item.status ? item.status : ""}</span>
                                            </Card.Body>
                                        </Link>
                                        <div className='d-flex justify-content-between align-items-center gap-4 py-2 px-3 '>
                                            <Button
                                                className='btn btn-info text-white'
                                                onClick={() => handleAddToFavorite(item)}>
                                                add favorite</Button>
                                            <Button
                                                className='btn btn-info text-white'
                                                onClick={() => handleRemoveFromFavorite(item)}>
                                                remove favorite</Button>
                                        </div>

                                    </Card>

                                </Col>
                            ))}
            </Row>
        </div>
    )
}

export default LocationsCharacters
{/* <FaRegHeart className="heart" onClick={() => handleClick(item)} color="red"/> */ }

// const handleFilterCharacter = (status: string) => {
//     const filteredCharacters = characterDatas.filter((item) => item.status === status);
//     setFilteredDatas(filteredCharacters);
//     console.log(filteredCharacters, "filteredCharacters");
// }
// console.log(filteredDatas, "filteredDatas")

// const [isFavorite, setIsFavorite] = useState<boolean>(false);
// const [favoriteStatusList, setFavoriteStatusList] = useState<boolean[]>(Array(characterDatas.length).fill(false));