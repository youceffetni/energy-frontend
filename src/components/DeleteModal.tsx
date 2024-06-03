
import {  Button, Dialog, DialogActions,DialogContent,DialogTitle } from '@mui/material';
import { ReactNode} from 'react';

interface IProps{
    children:ReactNode;
    title:string;
    action:()=>void;
    setOpen:(val:boolean)=>void
    open:boolean
}

export default function DeleteModel({children,title,action,open,setOpen}:IProps){



  return (
    
      
        <Dialog
            open={open}
            onClose={()=>setOpen(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
      
              
        <DialogTitle id="alert-dialog-title">
                {title}
        </DialogTitle>
      
        <DialogContent>
            {children}
        </DialogContent>
        
        
        <DialogActions>

          <Button  onClick={()=>{action()}} variant="contained" color="error" fullWidth >Supprimer</Button>
          <Button variant="outlined"  className="btn-cancel" fullWidth  onClick={()=>setOpen(false)}>Annuler</Button>

        </DialogActions>
        
        

        </Dialog>

     
 
  )

}