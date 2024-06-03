import { useAuth } from "@/Providers/AuthProvider";
import { useForm } from "react-hook-form";

export interface ProfileInterface{
    username:string|undefined;
    password?:string;
    password_confirmation?:string;
}



export default function useProfile(){

    const {userAuth}=useAuth();
    const form=useForm<ProfileInterface>({values:{
        username:userAuth?.name
    }});


    return {...form}
  
}
