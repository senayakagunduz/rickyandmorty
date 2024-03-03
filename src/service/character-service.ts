import axios, { AxiosResponse } from 'axios';
import { CharacterType } from '../interface/Character';

const api_url="https://rickandmortyapi.com/api"

export const getCharacters = async (pageNumber: number) => {
    const response: AxiosResponse = await axios.get<CharacterType[]>(`${api_url}/character?page=${pageNumber}`);
    return response.data;
}

export const getCharacterByUrl=async(url:string)=>{
    const response:AxiosResponse=await axios.get<CharacterType[]>((`${url}`));
    return response;
}