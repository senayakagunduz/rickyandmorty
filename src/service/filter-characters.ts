import axios, { AxiosResponse } from 'axios';
import { CharacterType } from '../interface/Character';

const api_url="https://rickandmortyapi.com/api"

export const filterCharacters=async(status:string)=>{
    const response:AxiosResponse=await axios.get<CharacterType[]>((`${api_url}/character/?status=${status}`));
    return response.data;
}