
import { handleDialogClose, selectDialog} from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';
import {  Button, Dialog, DialogActions,DialogContent,DialogTitle,Stack } from '@mui/material';
import { MRT_Row } from 'material-react-table';
import { useSelector } from 'react-redux';
import { clientInterface } from '@/Interfaces/clients';
import { useDeleteClient } from '@/hooks/clients';


interface IProps{
  clients:MRT_Row<clientInterface>[];
}




export default function Delete({clients}:IProps){
  const dispatch=useAppDispatch()


  const {mutate}=useDeleteClient();

  const handleDelete=(clients:MRT_Row<clientInterface>[]  )=>{


    for(let i=0;i<clients.length;i++)
       mutate(clients[i]?.original.id)
      
  }
     

  const dialogState=useSelector(selectDialog);
  return (
    
      
        <Dialog
      open={dialogState["clientDelete"]}
      onClose={()=>dispatch(handleDialogClose("clientDelete"))}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
  >
      
              
        <DialogTitle id="alert-dialog-title">
                Êtes-vous sûr de supprimer ces clients : 
        </DialogTitle>
      
        <DialogContent>
      
          <Stack>
            {clients?.map(({original})=>(<div key={original.id}><b>-{original.nom}</b></div>))}
          </Stack>
      
        </DialogContent>
        
        
        <DialogActions>

          <Button onClick={()=>handleDelete(clients)} variant="contained" color="error" fullWidth >Supprimer</Button>
          <Button variant="outlined"  className="btn-cancel" fullWidth  onClick={()=>dispatch(handleDialogClose("clientDelete"))}>Annuler</Button>

        </DialogActions>
        
        

        </Dialog>

     
 
  )
}
