/* import HomeIcon from '@mui/icons-material/Home'; */
import InventoryIcon from '@mui/icons-material/Inventory'; 
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import { typeMenuItem } from '@/Interfaces';



export const LISTS_MENU :typeMenuItem[] =[
       /*  {
                label:"Acceuil",
                icon:<HomeIcon sx={{color:"#fff"}}/>,
                path:"/",
                children:[]
        }, */
        {
                label:"Inventaire",
                path:"",
                icon:<InventoryIcon sx={{color:"#fff"}}/>,
                children:[{label:"Articles",path:"/articles"}]
        },
        {
                label:"Ventes",
                path:"",
                icon:<ShoppingCartIcon sx={{color:"#fff"}}/>,
                children:[
                        {label:"Nouvelle vente",path:"/ventes/ajouter"},
                        {label:"Liste ventes",path:"/ventes"},
                        
                       {label:"Liste factures",path:"/factures"}  /*,
                        {label:"Bons de livraison",path:"/bl"}, */
                ]
        },
        {
                label:"Clients",
                path:"",
                icon:<GroupIcon sx={{color:"#fff"}}/>,
                children:[
                        {label:"liste clients",
                        path:"/clients"
                        }
                ]
        
        },
        {
                label:"Paramétres",
                path:"",
                icon:<SettingsIcon sx={{color:"#fff"}}/>,
                children:[{label:"Utilisatuers",path:"/users"}]
        },
]



export const LIST_UNITE_ARTICLE= [
        {text:"Unité", value:"U"},
        {text:"Litre", value:"L"},
        {text:"Kg",    value:"Kg"},
        {text:"kit",   value:"kit"}
];