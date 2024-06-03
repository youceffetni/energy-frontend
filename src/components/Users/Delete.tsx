
import { handleDialogClose, selectDialog} from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';

import {  Button, Dialog, DialogActions,DialogContent,DialogTitle } from '@mui/material';


import { useSelector } from 'react-redux';
import { useDeleteUser } from '@/hooks/UsersHooks';
import { UserInterface } from '@/Interfaces/UsersInterfaces';
import { MRT_Row } from 'material-react-table';


interface IProps{
  users:MRT_Row<UserInterface>[];
}



export default function Delete({users}:IProps){
  const dispatch=useAppDispatch()


  const dialogState=useSelector(selectDialog);

  const {mutate}=useDeleteUser();
  const handleDelete=(users:MRT_Row<UserInterface>[]  )=>{

    for(let i=0;i<users.length;i++)
       mutate(users[i]?.original.id) 
     
      
      
  }
  return (
    
      
        <Dialog
            open={dialogState["userDelete"]}
            onClose={()=>dispatch(handleDialogClose("userDelete"))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
      
              
        <DialogTitle id="alert-dialog-title">
                Êtes-vous sûr de supprimer ces utlisatuers : 
        </DialogTitle>
      
        <DialogContent>
      
          <div>
            {users?.map(({original})=>(<div key={original.id}><b>-{original.name}</b></div>))}
          </div>
        </DialogContent>
        
        
        <DialogActions>

          <Button  onClick={()=>handleDelete(users)} variant="contained" color="error" fullWidth >Supprimer</Button>
          <Button variant="outlined"  className="btn-cancel" fullWidth  onClick={()=>dispatch(handleDialogClose("userDelete"))}>Annuler</Button>

        </DialogActions>
        
        

        </Dialog>

     
 
  )

}