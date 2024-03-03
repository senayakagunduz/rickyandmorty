import { useEffect, useState } from 'react'
import { getLocationById } from '../service/location-service'
import { Link, useParams } from 'react-router-dom'
import { getCharacterByUrl } from '../service/character-service';
import { CharacterType } from '../interface/Character';
import { useDispatch } from 'react-redux';
import { addToFavorite, removeFavorite } from '../store/favorite-slice';
import { getCharacterList, setCharacterList } from '../store/characters-slice';


const LocationsCharacters = () => {
    const [characterDatas, setCharacterDatas] = useState<CharacterType[]>([]);
    const [filterStatus, setFilterStatus] = useState<string>("");
    const [filteredDatas, setFilteredDatas] = useState<CharacterType[]>([]);


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
            <div className="character-cards">
                {
                    characterDatas.filter(
                        item => filterStatus === "" ||
                            item.status.toLowerCase() === filterStatus).map((item) => (
                                <div key={item.id} className="card">
                                    <img src={item.image} alt="img" className='location-character-img'/>
                                    <ul>
                                        <li>
                                            <Link to={`/character/${item.id}`}>{item.name}</Link>
                                        </li>
                                        <li>
                                            <p>{item.status ? item.status : ""}</p>
                                        </li>
                                    </ul>
                                    <div className="button-container">
                                        <button
                                            onClick={() => handleAddToFavorite(item)}>
                                            add favorite</button>
                                        <button
                                            onClick={() => handleRemoveFromFavorite(item)}>
                                            remove favorite</button>
                                    </div>
                                </div>
                            ))
                }
            </div>
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