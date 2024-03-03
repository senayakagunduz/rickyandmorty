import axios from 'axios';
import { SingleCharacterType } from '../interface/SingleCharacter';
const api_url="https://rickandmortyapi.com/api"

export const getSingleCharacterById = async (id: number): Promise<SingleCharacterType> => {
    const response = await axios.get<SingleCharacterType>(`${api_url}/character/${id}`);
    return response.data;
}