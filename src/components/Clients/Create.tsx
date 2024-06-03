import * as React from 'react';
import { clientValidation } from "@/data/validation";
import { clientInterface } from '@/Interfaces/clients'; 
import { handleDialogClose, handleRefetch, selectDialog } from "@/redux/features/dialogSlice";
import { useAppDispatch } from "@/redux/store";
import { Alert, Button, CircularProgress, DialogActions, DialogContentText,Grid,TextField} from "@mui/material";
import { useForm,SubmitHandler} from "react-hook-form"
import { useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';




import { useMutation } from 'react-query';
import {  postAxios} from '@/services/axiosApi.service';
import { enqueueSnackbar } from 'notistack';


export function Create(){
const dispatch=useAppDispatch();
const {clientCreate}=useSelector(selectDialog)
const [responseErrors,setResponseErrors]=React.useState(null);
const {register,handleSubmit,reset,formState:{errors}}=useForm<clientInterface>();

/* Handlers */
const { mutate, isLoading } = useMutation(postAxios, {
  onSuccess: ({data}) => {
     if(data.status===201){
        dispatch(handleDialogClose("clientCreate"));
        dispatch(handleRefetch());
        enqueueSnackbar("le client a ajouté avec succès",{variant:"success",autoHideDuration:3000});
        setResponseErrors(null);
        reset(); 
    }
    

  },
    onError: ({response}) => {
      
      
      if(response.status===422){
        const {data:{message}}=response;
        setResponseErrors(message)
    
      }
      else{
    
        console.log(response)
      }
     
    
  },
    /* onSettled: () => {
        queryClient.invalidateQueries('create')
  } */
});


const clientSubmit:SubmitHandler<clientInterface> =(data:clientInterface) =>{
  
  mutate({data,endpoint:"clients"});
 
}
 
  return (
   
    <Dialog
      open={clientCreate}
      onClose={()=>dispatch(handleDialogClose("clientCreate"))}
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
      
      
       
      
      <DialogTitle sx={{background:"#E0E7FF"}}><b>Ajouter un nouveau client </b></DialogTitle>
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
                            helperText={errors.NAI ? errors.NAI.message :"Numéro d'article d'imposition ."}
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
        <Button  type="submit" variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Ajouter</Button>
        <Button  variant='contained' className='btn-cancel' onClick={()=>{
          dispatch(handleDialogClose("clientCreate"))
          reset()
          setResponseErrors(null);
          
          }}>Annuler</Button>
      </DialogActions>
    </Dialog>
  


  )
}
