import axios, { AxiosResponse } from 'axios';
import { LocationType } from '../interface/Location';
const api_url="https://rickandmortyapi.com/api"

export const getLocations=async()=>{
    const response: AxiosResponse=await axios.get<LocationType[]>(`${api_url}/location`);
    return response.data;
}

export const getLocationById=async(id:number)=>{
    const response: AxiosResponse=await axios.get<LocationType[]>(`${api_url}/location/${id}`);
    return response.data;
}
