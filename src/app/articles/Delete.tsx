

import { articleType } from '@/Interfaces';
import {handleDialogClose, selectDialog} from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';

import { Button, Dialog, DialogActions,DialogContent,DialogTitle,Stack } from '@mui/material';
import { MRT_Row } from 'material-react-table';

import { deleteArticle } from './articles-api';
import { useSelector } from 'react-redux';

interface IProps{
  articles:MRT_Row<articleType>[];
}




export default function Delete({articles}:IProps){
  const dispatch=useAppDispatch()


  const {mutate}=deleteArticle();
  const handleDelete=(articles:MRT_Row<articleType>[]  )=>{


    for(let i=0;i<articles.length;i++)
       mutate(`articles/${articles[i]?.original.ref}`)
      
  }

  const dialogState=useSelector(selectDialog);
     
  return (
   

       
        <Dialog
          open={dialogState["articleDelete"]}
          onClose={()=>dispatch(handleDialogClose("articleDelete"))}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
             Êtes-vous sûr de supprimer ces articles : 
          </DialogTitle>
          <DialogContent>
            <Stack>
                {articles?.map(({original})=>(<div key={original.ref}><b>-{original.nom}</b></div>))}
            </Stack>
          </DialogContent>

          <DialogActions>

          <Button onClick={()=>handleDelete(articles)}variant="contained" color="error" fullWidth >Supprimer</Button>
          <Button variant="outlined"  className="btn-cancel" fullWidth  onClick={()=>dispatch(handleDialogClose("articleDelete"))}>Annuler</Button>

          </DialogActions>
          
        </Dialog>
      
  )
}











