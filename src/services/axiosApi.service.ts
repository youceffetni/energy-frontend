import { axiosEnergy } from "@/config/axios.config";
import { onlyDirtyFields } from "@/helpers";


export async function fetchAxios(endpoint:string){
 
       const data= await axiosEnergy.get(endpoint);

       return data?.data;
     
}

export async function postAxios(data:{endpoint:string,data:any}){

  return  await axiosEnergy.post(data.endpoint,onlyDirtyFields(data.data)) 
     
}

export async function deleteAxios(endpoint:string){
  return await axiosEnergy.delete(endpoint);
}


export async function putAxios(data:{endpoint:string,data:any}){
       
    
  return  await axiosEnergy.put(data.endpoint,onlyDirtyFields(data.data)) 
     
}