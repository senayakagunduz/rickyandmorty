import axios, { AxiosResponse } from 'axios';
import { CharacterType } from '../interface/Character';

const api_url="https://rickandmortyapi.com/api"

export const getCharacters=async()=>{
    const response:AxiosResponse=await axios.get<CharacterType[]>((`${api_url}/character`));
    return response.data;
}

export const getCharacterByUrl=async(url:string)=>{
    const response:AxiosResponse=await axios.get<CharacterType[]>((`${url}`));
    return response;
}