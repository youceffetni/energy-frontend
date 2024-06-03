import * as React from 'react';
import { articleValidation } from "@/data/validation";
import { articleType } from "@/Interfaces";
import { handleDialogClose, handleRefetch, selectDialog } from "@/redux/features/dialogSlice";
import { useAppDispatch } from "@/redux/store";
import { Alert, Button, CircularProgress, DialogActions, DialogContentText,MenuItem,Stack, TextField } from "@mui/material";
import { useForm,SubmitHandler} from "react-hook-form"
import { useSelector } from "react-redux";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';




import { LIST_UNITE_ARTICLE } from '@/data';
import { useMutation } from 'react-query';
import {  postAxios} from '@/services/axiosApi.service';
import { enqueueSnackbar } from 'notistack';


export function Create(){
const dispatch=useAppDispatch();
const {articleCreate}=useSelector(selectDialog)
const [responseErrors,setResponseErrors]=React.useState(null);
const {register,handleSubmit,reset,formState:{errors}}=useForm<articleType>();

/* Handlers */
const { mutate, isLoading } = useMutation(postAxios, {
  onSuccess: ({data}) => {
     if(data.status===201){
        dispatch(handleDialogClose("articleCreate"));
        dispatch(handleRefetch());
        enqueueSnackbar("L'article a été ajouté avec succès",{variant:"success",autoHideDuration:3000});
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


const articleSubmit:SubmitHandler<articleType> =(data:articleType) =>{
  
  mutate({data,endpoint:"articles"});

}
 

  return (
   
    <Dialog
      open={articleCreate}
      onClose={()=>dispatch(handleDialogClose("articleCreate"))}
      PaperProps={{
        component: 'form',
        onSubmit: handleSubmit(articleSubmit),
      }}
      sx={{
          "& form.MuiPaper-root":{
            minWidth:{lg:"700px"}
          },
         
      }}
    >
      
      
       
      
      <DialogTitle sx={{background:"#E0E7FF"}}><b>Ajouter un nouvel article</b></DialogTitle>
      <DialogContent>
        <DialogContentText gutterBottom>
          Les champs marqués d'une * sont obligatoires,
          le reste sont des champs facultatifs.
        </DialogContentText>
       

        
         
          {responseErrors&&  <Alert severity="error" variant='filled'>
              {responseErrors}
          </Alert> }
          

          <Stack direction="row" sx={{my:2}} alignItems="center" gap={1}>
              <TextField 
                      error={errors.ref!=null}
                      fullWidth
                      id="filled-basic" 
                      label="Réference *" 
                      variant="outlined"
                      about="test"
                      {...register("ref",articleValidation.ref)}
                      helperText={errors.ref ? errors.ref.message :"La référence d'article. "}
               />
             
              <TextField 
                  
                  fullWidth
                  error={errors.nom!=null}
                  id="filled-basic" 
                  label="Désignation *" 
                  variant="outlined" 
                  helperText={errors.nom ? errors.nom.message :"Le nom d'article . "}
                  {...register("nom",articleValidation.nom)}
              />
          </Stack>
          
          <Stack direction="row" sx={{my:2}} alignItems="center" gap={1}>
              <TextField 
                      error={errors.prix!=null}
                      helperText={errors.prix ? errors.prix.message :"Le prix unitaire d'article . "}
                      fullWidth
                      id="filled-basic"  
                      label="Prix unitaire *" 
                      variant="outlined"
                      
                      {...register("prix",articleValidation.prix)}
               />
             
            
              
          </Stack>
          <Stack>
          <TextField
                id="outlined-select-currency"
                select
                label="Unité"
                defaultValue="U"
                helperText="Unité de mesure d'article ."
                {...register("unite")}
            >
                {LIST_UNITE_ARTICLE.map((item)=><MenuItem value={item.value} key={item.value} selected>{item.text}</MenuItem>)}
            </TextField>
          </Stack>
          <Stack direction="row" sx={{my:2}} alignItems="center" gap={1}>
              <TextField 
                      fullWidth
                      error={errors.quantite_stock!=null}
                      helperText={errors.quantite_stock ? errors.quantite_stock.message :"La quantité d'article dans votre stocke. "}
                      id="filled-basic" 
                      label="Quantité stock *" 
                      variant="outlined"
                      {...register("quantite_stock",articleValidation.quantite_stock)}
                      type="number"
                      
               />
             
              <TextField 
                  fullWidth
                  error={errors.quantite_min_stock!=null}
                  helperText={errors.quantite_min_stock ? errors.quantite_min_stock.message :"La Quantité minimale d'article en stocke . "}
                  id="filled-basic" 
                  label="Quantité minimum stock" 
                  variant="outlined" 
                  type="number"
                  {...register("quantite_min_stock",articleValidation.quantite_min_stock)}
                  
              />
          </Stack>

          
           <Stack >
              <TextField
                  error={errors.description!=null}
                  helperText={errors.description ? errors.description.message :"Description ou des notes sur l'article. "}
                  id="outline-basic"
                  label="Description"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  {...register("description")}
              />
             
            
          </Stack>

          
          
         
          
      </DialogContent>


      <DialogActions>
        <Button  type="submit" variant='contained' disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Ajouter</Button>
        <Button  variant='contained' className='btn-cancel' onClick={()=>{
          dispatch(handleDialogClose("articleCreate"))
          reset()
          setResponseErrors(null);
          
          }}>Annuler</Button>
      </DialogActions>
    </Dialog>
  


  )
}
