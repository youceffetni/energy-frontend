import { axiosEnergy } from "@/config/axios.config";

import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthInterface{
    userAuth:{
        id:number;
        name:string;
        role:number;
        email:string;
        token:string;

    }|null;


    setUserAuth:(newUserAuth:AuthInterface["userAuth"])=>void
    
}

const AuthContext=createContext<AuthInterface>({
        userAuth:null,
        setUserAuth:()=>{}
    });



export  const useAuth=()=>{

    return useContext(AuthContext);
}



function AuthProvider({children}:{children:ReactNode}){
   
    const [userAuth,setUserAuth_]=useState<null|AuthInterface["userAuth"]>(JSON.parse(localStorage.getItem("userAuth") as string));
    const setUserAuth=(newUserAuth:null|AuthInterface["userAuth"])=>{
        setUserAuth_(newUserAuth);
    }
 
    useEffect(()=>{
        
        if(userAuth){
            
            axiosEnergy.defaults.headers.common["Authorization"]=`Bearer ${userAuth.token}`;
            localStorage.setItem("userAuth",JSON.stringify(userAuth));
        }
        else{
            
            delete  axiosEnergy.defaults.headers.common["Authorization"];
            localStorage.removeItem("userAuth");
        }

    },[userAuth]);

    const value=useMemo(()=>({userAuth,setUserAuth}),[userAuth]);

    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    
}




export default AuthProvider;