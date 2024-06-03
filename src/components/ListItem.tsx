import {  List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"

import {handleDrawerClose} from "../redux/features/drawerSlice";
import { useAppDispatch } from "../redux/store";
import { childItem, typeMenuItem } from "@/Interfaces";
import {  NavLink} from "react-router-dom";
interface IProps{
    item:typeMenuItem
}
const ListItem=({item}:IProps)=>{

    const dispatch=useAppDispatch();
    
  
 
   

   

  return (
    <div>
        <ListItemButton>
            <ListItemIcon>
                {item.icon}
            </ListItemIcon>
            <ListItemText  primary={<b>{item.label}</b>} />
     
       </ListItemButton>


            
          
        {item.children.map((child:childItem,index:number)=><div key={index}>
        <List  component="div" disablePadding onClick={()=> dispatch(handleDrawerClose())}>
                    
                        <NavLink to={child.path} className="nav-link" end>  

                                {child.label}

                        </NavLink>
                    
        </List>
        </div>)}
       
          
        
    </div>
  )
}

export default ListItem