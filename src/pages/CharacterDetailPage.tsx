import { useEffect, useState } from "react";
import { SingleCharacterType } from "../interface/SingleCharacter";
import { useParams } from "react-router-dom";
import { getSingleCharacterById } from "../service/single-character-service";;
import CardItem from "../components/Card";
import { useSelector } from "react-redux";
import { CharacterType } from "../interface/Character";


const CharacterDetailPage: React.FC = () => {
    const [characterData, setCharacterData] = useState<SingleCharacterType | null>(null);
    const { id } = useParams<{ id: string }>();

    const characterList = useSelector((state: { character: { characterList: CharacterType[] } }) => state.character.characterList);
   
    console.log(characterList, "characterList")
    const loadData = async () => {
        try {
            const resp = await getSingleCharacterById(Number(id))
            console.log(resp, "resp");
            setCharacterData(resp);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        loadData();
    }, [])

    if (!characterData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <CardItem item={characterData}/>
        </div>
    )
}

export default CharacterDetailPage