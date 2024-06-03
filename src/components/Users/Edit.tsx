
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, Grid, MenuItem } from '@mui/material';
import { SubmitHandler } from 'react-hook-form';


import { useAppDispatch } from '@/redux/store';
import { handleDialogClose,  selectDialog } from '@/redux/features/dialogSlice';
import { useSelector } from 'react-redux';
import { useUpdateUser } from '@/hooks/UsersHooks';
import { UserInterface } from '@/Interfaces/UsersInterfaces';
import { RegisterValidation } from '@/data/Validations/UserValidation';



interface IProps{
  user:UserInterface;
}
export default function Edit({user}:IProps) {

const dispatch=useAppDispatch();
const {userUpdate}=useSelector(selectDialog)
const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
    mutate,
    isLoading,
    responseErrors,setResponseErrors}=useUpdateUser(user);


const clientSubmit:SubmitHandler<UserInterface> =(data:UserInterface) =>{
    mutate(data);
}

  

  return (
    <Dialog
      open={userUpdate}
      onClose={()=>dispatch(handleDialogClose("userUpdate"))}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(clientSubmit),
      }}
      sx={{
          "& form.MuiPaper-root":{
            minWidth:{lg:"700px"}
          },
         
      }}
    >
      
      
       
      
      <DialogTitle sx={{background:"#E0E7FF"}}><b>{user.name}</b></DialogTitle>
      <DialogContent sx={{my:"8px"}}>
                {responseErrors&&  <Alert severity="error" variant='outlined'>
                    {responseErrors}
                </Alert> }
            
                <Grid container spacing={2} sx={{my:2}}>
                    <Grid item xs={12}>
                        <TextField 
                                fullWidth 
                                label="Nom d'utilisateur" 
                                variant="outlined"
                                {...register("name",RegisterValidation.name)}
                                helperText={errors.name?.message}
                                error={errors.name!=undefined}
                               
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                                fullWidth
                                label="Email" 
                                variant="outlined"
                                {...register("email",RegisterValidation.email)}
                                helperText={errors.email?.message}
                                error={errors.email!=undefined}
                                
                               
                        />  
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        fullWidth
                        select
                        label="Rôle"
                        defaultValue={user.role}
                        
                        {...register("role")}
                    >
                        <MenuItem value={1} >Super Admin</MenuItem>
                        <MenuItem value={2} >Admin</MenuItem>
                    </TextField>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField 
                             
                                fullWidth
                                 
                                label="Mot de passe" 
                                variant="outlined"
                                type="password"
                                {...register("password")}
                              
                               
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                             
                                fullWidth
                               
                                label="Confirmation mot de passe" 
                                variant="outlined"
                                type="password"
                                {...register("password_confirmation")}
                         
                               
                        />  
                    </Grid>
                
                
                   

                </Grid>
            
                
                
                
            
                
      </DialogContent>


      <DialogActions>
        <Button  type="submit" variant='contained' color="success" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Sauvgarder</Button>
        <Button  variant='contained' className='btn-cancel' onClick={()=>{
            dispatch(handleDialogClose("userUpdate"))
            reset()
            setResponseErrors(null);
          
          }}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}