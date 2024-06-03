import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, Grid } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { clientInterface } from '@/Interfaces/clients'; 
import { clientValidation } from '@/data/validation';
import { useAppDispatch } from '@/redux/store';
import { handleDialogClose, selectDialog } from '@/redux/features/dialogSlice';
import { useSelector } from 'react-redux';
import { useUpdateClient } from '@/hooks/clients';



interface IProps{
  client:clientInterface;
}
export default function Edit({client}:IProps) {

const dispatch=useAppDispatch();
const {clientUpdate}=useSelector(selectDialog)


const [responseErrors,setResponseErrors]=React.useState(null);

const {register,handleSubmit,reset,formState:{errors}}=useForm<clientInterface>({values:client});

const {mutate,isLoading}=useUpdateClient();
const clientSubmit:SubmitHandler<clientInterface> =(data:clientInterface) =>{

      delete data["created_at" as keyof clientInterface];
      delete data["updated_at" as keyof clientInterface];
   
     mutate({endpoint:`clients/${client.id}`,data});
      
}

  

  return (
    <Dialog
      open={clientUpdate}
      onClose={()=>dispatch(handleDialogClose("clientUpdate"))}
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
      
      
       
      
      <DialogTitle sx={{background:"#E0E7FF"}}><b>{client.nom}</b></DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Les champs marqués d'une * sont obligatoires,
          le reste sont des champs facultatifs.
        </DialogContentText>
       

        
         
          {responseErrors&&  <Alert severity="error" variant='filled'>
              {responseErrors}
          </Alert> }
          

        
          <Grid container spacing={1} sx={{my:2}}>
                <Grid item xs={12}>
                    <TextField 
                            error={errors.nom!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Nom *" 
                            variant="outlined"
                            {...register("nom",clientValidation.nom)}
                            helperText={errors.nom ? errors.nom.message :"Le nom du client ."}
                    />  
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                            error={errors.adresse!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Adresse" 
                            variant="outlined"
                            {...register("adresse",clientValidation.adresse)}
                            helperText={errors.adresse ? errors.adresse.message :"l'adresse du client ."}
                    />  
                </Grid>
                
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.tel1!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Numéro de téléphone 1" 
                            variant="outlined"
                            type='number'
                            {...register("tel1",clientValidation.tel1)}
                            helperText={errors.tel1?.message}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.tel2!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Numéro de téléphone 2" 
                            variant="outlined"
                            type='number'
                            {...register("tel2",clientValidation.tel2)}
                            helperText={errors.tel2?.message}
                    />  
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                            error={errors.email!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Email" 
                            variant="outlined"
                            {...register("email",clientValidation.email)}
                            helperText={errors.email ? errors.email.message :"l'email du client ."}
                    />  
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                            error={errors.web_site!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Site web" 
                            variant="outlined"
                            {...register("web_site",clientValidation.web_site)}
                            helperText={errors.web_site ? errors.web_site.message :"Site web de client ."}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.NRC!=null}
                            fullWidth
                            id="filled-basic" 
                            label="N°.R.C" 
                            variant="outlined"
                            {...register("NRC",clientValidation.NRC)}
                            helperText={errors.NRC ? errors.NRC.message :"Numéro du registre commerce ."}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.NIF!=null}
                            fullWidth
                            id="filled-basic" 
                            label="N°.I.F" 
                            variant="outlined"
                            {...register("NIF",clientValidation.RIB)}
                            helperText={errors.NIF ? errors.NIF.message :"Numéro d'identification fiscale ."}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.NIS!=null}
                            fullWidth
                            id="filled-basic" 
                            label="N°.I.S" 
                            variant="outlined"
                            {...register("NIS",clientValidation.NIS)}
                            helperText={errors.NIS ? errors.NIS.message :"Numéro d'identification statistique ."}
                    />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField 
                            error={errors.NAI!=null}
                            fullWidth
                            id="filled-basic" 
                            label="N°.A.I" 
                            variant="outlined"
                            {...register("NAI",clientValidation.NAI)}
                            helperText={errors.NAI ? errors.NAI.message :"Numéro article d'imposition ."}
                    />  
                </Grid>
                <Grid item xs={12} >
                    <TextField 
                            error={errors.RIB!=null}
                            fullWidth
                            id="filled-basic" 
                            label="RIB" 
                            variant="outlined"
                     
                            {...register("RIB",clientValidation.RIB)}
                            helperText={errors.RIB ? errors.RIB.message :"Le relevé d'identité bancaire ."}
                    />  
                </Grid>
                <Grid item xs={12} >
                    <TextField 
                            error={errors.activite!=null}
                            fullWidth
                            id="filled-basic" 
                            label="Activité" 
                            variant="outlined"
                            {...register("activite",clientValidation.activite)}
                            helperText={errors.activite ? errors.activite.message :""}
                    />  
                </Grid>

          </Grid>
       
          
          
          
         
          
      </DialogContent>

      <DialogActions>
        <Button  type="submit" variant='contained' color="success" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Sauvgarder</Button>
        <Button  variant='contained' className='btn-cancel' onClick={()=>{
          dispatch(handleDialogClose("clientUpdate"))
          reset()
          setResponseErrors(null);
          
          }}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}