import { AppBar, Box, IconButton, Toolbar} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';

import AccountMenu from "./Ui/Header/AccountMenu";
import {handleDrawerToggle, selectDrawer} from "../redux/features/drawerSlice";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";




export const Header=()=>{
  
  const dispatch=useAppDispatch();
  const drawer=useSelector(selectDrawer)


  return (

    <AppBar
        position="fixed"
        elevation={2}
        sx={{
          width: { sm: `calc(100% - ${drawer.width}px)` },
          ml: { sm: `${drawer.width}px` },
          backgroundColor:"#191E38"
          
          
          
       }}
       
       
       
    >
      <Toolbar sx={{alignItems:"center" ,minHeight:"80px",px:3}}>
            <IconButton
              color="default"
              aria-label="open drawer"
              edge="start"
              onClick={()=>dispatch(handleDrawerToggle())}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuIcon fontSize="large" style={{color:"#fff"}} />
            </IconButton>
           
            <Box sx={{flexGrow:1}}/>
        
            <AccountMenu/>
          
      </Toolbar>
    </AppBar>
  )
}

export default Header
