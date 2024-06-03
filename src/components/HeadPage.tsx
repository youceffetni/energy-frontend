import PendingActionsIcon from '@mui/icons-material/PendingActions';
import {  Box, Stack } from "@mui/material"




const HeadPage=()=>{
  

    
  return (
    <Stack sx={{pb:4}} direction="row" justifyContent="space-between">
        <Box/>
        <Stack direction="row" alignItems="center" gap={1}>
            <PendingActionsIcon/> 
            <span></span>
        </Stack>
    </Stack>  
  )
}

export default HeadPage