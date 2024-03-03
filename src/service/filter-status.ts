import axios, { AxiosResponse } from 'axios';
import { LocationType } from '../interface/Location';
const api_url="https://rickandmortyapi.com/api"
// https://rickandmortyapi.com/api/character/?name=rick&status=alive

export const filterByStatus=async(status:string)=>{
    const response: AxiosResponse=await axios.get<LocationType[]>(`${api_url}/character?${status}`);
    return response.data;
}