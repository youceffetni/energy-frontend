import { useAuth } from "@/Providers/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";


export function ProtectedRoutes(){


    const {userAuth}=useAuth();
    if(!userAuth?.token)
        return <Navigate to="/login"/>
    

    return <Outlet/>
}
