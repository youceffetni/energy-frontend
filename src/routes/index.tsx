import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Dashboard from "../app/Dashboard";
import RootPage from "../app/RootPage";
import Login from "../app/login/Views/Login";
import Articles from "../app/articles/index";
import Clients from "../app/clients/index";
import Users from "../app/users/index";
import Ventes from "../app/ventes/index";
import Factures from "../app/factures/index";
import Create from "@/app/ventes/Create";
import Edit from "@/app/ventes/Edit";
import Profile from "@/app/profile/index"
import { ProtectedRoutes } from "./ProtectedRoutes";
import { useAuth } from "@/Providers/AuthProvider";
import VenteRoot from "@/app/ventes/VenteRoot";






function index(){


    const {userAuth}=useAuth();
    const notAuthenticatedRoutes=[
        {
            path:"/login",
            element:<Login/>
        }
    ];
    
    
    const authenticatedRoutes=[
        {
            path:"/",
            element:<ProtectedRoutes/>,
            children:[
                {
                    path:"/",
                    element:<RootPage/>,
                    children:[
            
                        {
                            index:true,
                            element:<Articles/>
                        },
                        {
                            path:"articles",
                            element:<Articles/>
                        },
                        {
                            path:"clients",
                            element:<Clients/>
                        },
                        { 

                            path:"ventes",
                            element:<VenteRoot/>,
                            children:[
                                {
                                    index:"true",
                                    element:<Ventes/>,
                                },
                                {
                                    path:"ajouter",
                                    element:<Create/>
                                },
                                {
                                    path:"modifier/:venteId",
                                    element:<Edit/>
                                },
                            ]

                        },
                        {
                            path:"/users",
                            element:userAuth?.role==1 ? <Users/> :<Dashboard/>
                        },{
                            path:"/profile",
                            element:<Profile/>
                        },
                        {
                            path:"/factures",
                            element:<Factures/>
                        }
                        
                    ]
                }
            ]
        }
        
    ]
    
    const router=createBrowserRouter([
    
        ...authenticatedRoutes,
        ...(!userAuth?.token ? notAuthenticatedRoutes :[])
     
         
     ]);
     

    return <RouterProvider router={router}/>
}

export default index