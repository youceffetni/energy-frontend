import { Toolbar, Typography } from "@mui/material"

import logo from "../../../public/logo.svg" ;
const Logo=()=>{

 

  
  

  return (
    <Toolbar sx={{justifyContent:"center", alignItems:"center",p:"14px 5px !important"}}>
        <img 

        src={logo} 
   
        width={"60px"} 
        height={"60px"}
        />

        <Typography variant="h5" sx={{fontWeight:"bold",color:"#fff"}}>Ewrt<br/> Administration</Typography>
    </Toolbar>
  )
}

export default Logo