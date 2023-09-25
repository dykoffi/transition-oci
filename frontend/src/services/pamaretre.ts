import { apiClient } from "../config/config";

export const getParametre = async ()=> {
    const parametre =  await apiClient.get('parametre');
    
    return parametre;
}

export const updateParametre = async (data:any)=> {
    const parametre = await apiClient.patch(`parametre/${data.id}`,data);
    return parametre;
}

export const createParametre = async (data:any)=> {
    const parametre = await apiClient.post(`parametre`,data);

    return parametre;
}