

import DeleteIcon from '@mui/icons-material/Delete';
import { MRT_TablePagination,MRT_TableContainer,MRT_GlobalFilterTextField, MRT_TableInstance} from 'material-react-table';

import {  Box, Button,  Stack } from "@mui/material";

import AddIcon from '@mui/icons-material/Add';

/* Redux */
import {handleDialogOpen} from "@/redux/features/dialogSlice";
import { useAppDispatch } from "@/redux/store";
import { articleType } from '@/Interfaces';



interface IProps{
  table:MRT_TableInstance<articleType>
}
export default function index({table}:IProps){
  

  

  const dispatch=useAppDispatch();




  return (
  
          <div>
              <Stack sx={{mb:3,flexDirection:{xs:"column-reverse",md:"row"},gap:2}} >
                  <Box sx={{flexGrow:1}}>
                      {table.getSelectedRowModel().rows.length > 0 ?
              
                        <Button
                            color="error"
                            variant="contained"
                            onClick={() => dispatch(handleDialogOpen("articleDelete"))} >
                            <DeleteIcon/> Supprimer
                        </Button>
                        :
                        <Button  startIcon={<AddIcon/>} onClick={()=>dispatch(handleDialogOpen("articleCreate"))} variant="contained">
                          Article
                        </Button>

                      }
                  </Box>

                <MRT_GlobalFilterTextField  table={table} />
              </Stack>

              <MRT_TableContainer table={table} />
              <Stack direction="row" justifyContent="center">
                <MRT_TablePagination table={table} />
              </Stack>

          </div>
                      
                      


  
    

  )
}

