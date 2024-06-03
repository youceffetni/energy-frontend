import { axiosEnergy } from "@/config/axios.config";
import { useAuth } from "@/Providers/AuthProvider";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export type credentialsType ={
    name:string;
    password:string;
}
export function useLogin(){
    const [responseError,setResponseError]=useState();
    const {setUserAuth}=useAuth(); 
    const navigate=useNavigate();
    const {register,handleSubmit,formState:{errors}}=useForm<credentialsType>();

   const LoginMutation=useMutation(async (credentials:{name:string,password:string})=>{

    const response=await axiosEnergy.post("/login",credentials);
      return response;
  },{
    onSuccess:(response)=>{
      if(response.status==200){
        const {data}=response;
        setUserAuth({
          id:data.user.id,
          name:data.user.name,
          email:data.user.email,
          role:data.user.role,
          token:data.token
        });
        
         navigate("/"); 
        
      }
    },
    onError:({response})=>{
     
      if(response?.status==422)
        setResponseError(response.data.message); 
     
    }
  })


    return {
      ...LoginMutation ,
      responseError,
      register,
      handleSubmit,
      errors
    };
} 