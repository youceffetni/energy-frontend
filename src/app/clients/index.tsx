import {  Button} from '@mui/material';
import { Create } from '@/components/Clients/Create';
import Delete from '@/components/Clients/Delete';
import Edit from '@/components/Clients/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import MaterialTable from '@/components/MaterialTable';
import { handleDialogOpen } from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';
import useTable from '@/hooks/clients';
import { useEffect } from 'react';




export default function index(){

      const data=useTable();
      const {clientToEdit}=data
      const selectedRows=data.table.getSelectedRowModel().rows;
      const dispatch=useAppDispatch();
      useEffect(()=>{
        document.title="Clients"
      },[]);
  return (
    <div>
        
        <h1 className="text-xl md:text-3xl my-4 font-extrabold">Clients</h1>
                 
               
    
        <Create/>
        <Delete clients={selectedRows}/>
        <Edit client={clientToEdit}/>


  
        <MaterialTable data={data} >
            {selectedRows.length > 0 ?
                                        <Button
                                            color="error"
                                            variant="contained"
                                            startIcon={<DeleteIcon/>}
                                            onClick={() => dispatch(handleDialogOpen("clientDelete")) }
                                         >
                                            Supprimer
                                        </Button> 
                                        :
                                        <Button  startIcon={<AddIcon />}  variant="contained" onClick={()=>dispatch(handleDialogOpen("clientCreate"))}>
                                            Client
                                        </Button>}
        </MaterialTable>

    </div>
  )
}
