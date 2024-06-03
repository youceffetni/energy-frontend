import { List } from '@mui/material';

import { LISTS_MENU } from '../data';
import ListItem from './ListItem';
import { useAuth } from '@/Providers/AuthProvider';


interface IProps{

}

const ListMenu=({}:IProps)=>{
    const {userAuth}=useAuth();
  return (
    <List
      sx={{ width: '100%', maxWidth: 360 ,color:"#fff"}}
      component="nav"
      aria-labelledby="nested-list-subheader"
     
     
    >
        {LISTS_MENU.map((item,index)=>{

        
          if(item.label=="Paramétres" && userAuth?.role !=1 )

          return null;
         
          return(<div key={index}>
              
              <ListItem item={item}/>
          </div>);
          }
        
        )}
      
      </List>
  )
}

export default ListMenu