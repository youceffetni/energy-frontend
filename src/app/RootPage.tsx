
import { Outlet } from "react-router-dom"
import SideBar from "../components/SideBar"
import Box from '@mui/material/Box';
import Header from "../components/Header"
import { useSelector } from "react-redux";
import {selectDrawer} from "../redux/features/drawerSlice";
import {  Toolbar } from "@mui/material";

import { SnackbarProvider} from 'notistack';

const RootPage=()=>{
  
  
 

  const drawer=useSelector(selectDrawer)
  return (
  <SnackbarProvider anchorOrigin={{ vertical: "top", horizontal: "right" }} maxSnack={3}>
    <Box sx={{ display: 'flex',minHeight:"calc(100vh - 50px)" }} className="space-mono-regular">
   
      <Header/>

      <SideBar />

      {/* contnet */}
      <Box
        component="main"
        sx={{ flexGrow: 1, p: {xs:1,md:3}, width: { sm: `calc(100% - ${drawer.width}px)` } }}
        className="space-mono-regular"
      >
        
          <Toolbar />
          
          
                
                <Box sx={{p:"16px 12px",minHeight:"calc(100vh - 64px)"}}>
                    <Outlet />
                </Box>
              
              
        
      </Box>
    </Box>
  </SnackbarProvider>
  )
}

export default RootPage













