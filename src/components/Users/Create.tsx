

import { handleDialogClose, selectDialog } from '@/redux/features/dialogSlice';

import {  Alert, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, MenuItem, TextField } from '@mui/material';

import { useSelector } from 'react-redux';
import { useCreateUser } from '@/hooks/UsersHooks';
import { useAppDispatch } from '@/redux/store';
import { UserInterface } from '@/Interfaces/UsersInterfaces';
import { RegisterValidation } from  '@/data/Validations/UserValidation';
function Create(){
    const {userCreate}=useSelector(selectDialog);
    const dispatch =useAppDispatch();

    const {
            register,
            handleSubmit,
            formState:{errors},
            reset,
            responseErrors,
            mutate,
            isLoading
    }=useCreateUser();

  


    

return (


        <Dialog
            open={userCreate}
            onClose={()=>dispatch(handleDialogClose("userCreate"))}
            PaperProps={{
            component: 'form',
            onSubmit:handleSubmit((data:UserInterface)=>{
                mutate(data)
            })
            }}
            sx={{
                "& form.MuiPaper-root":{
                minWidth:{lg:"700px"}
                },
            
            }}
        >


        

            <DialogTitle sx={{background:"#E0E7FF"}}><b>Ajouter un nouvel utilisateur </b></DialogTitle>
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
                        defaultValue="2"
                        
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
                                {...register("password",RegisterValidation.password)}
                                helperText={errors.password?.message}
                                error={errors.password!=undefined}
                               
                        />  
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                             
                                fullWidth
                               
                                label="Confirmation mot de passe" 
                                variant="outlined"
                                type="password"
                                {...register("password_confirmation",RegisterValidation.password_confirmation)}
                                helperText={errors.password_confirmation?.message}
                                error={errors.password_confirmation!=undefined}
                               
                        />  
                    </Grid>
                
                
                   

                </Grid>
            
                
                
                
            
                
            </DialogContent>


            <DialogActions>
            <Button  type="submit" variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Ajouter</Button>
            <Button  variant='contained' className='btn-cancel' onClick={()=>{
                dispatch(handleDialogClose("userCreate"));
                reset(); /*
                setResponseErrors(null); */
                
                }}>Annuler</Button>
            </DialogActions>
        </Dialog>
  )
}


export default Create
