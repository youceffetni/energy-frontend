import {  Box, Divider, Drawer} from "@mui/material"


import ListMenu from "./ListMenu";
import {handleDrawerTransitionEnd,handleDrawerClose, selectDrawer} from "../redux/features/drawerSlice";
import { useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import Logo from "./Ui/Logo";


 const SideBar =() =>{
  
  const dispatch=useAppDispatch();
  const drawer=useSelector(selectDrawer)

  const content = (
    <div >
      <Logo/>
      <Divider className="MuiDivider-light"/>
      <ListMenu/>
      
    </div>
  );

 
       
    return (
     <Box
        component="nav"
        sx={{ width: { sm: drawer.width }, flexShrink: { sm: 0 },}}
        aria-label="mailbox folders"
      >
        
        <Drawer
          variant="temporary"
          open={drawer.mobileOpen}
          onTransitionEnd={()=>dispatch(handleDrawerTransitionEnd())}
          onClose={()=>dispatch(handleDrawerClose())}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawer.width,
              background:"#191E38", 
              color:"#fff",boxShadow:1,border:"none"
             
            },
                       
          }}
        >
          
             {content}
       
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawer.width,
              background:"#191E38",
              color:"#fff",
              boxShadow:1,border:"none"
            },
           
          }}
          open
        >
          {content}
        </Drawer>
      </Box>
    )
  }

export default SideBar