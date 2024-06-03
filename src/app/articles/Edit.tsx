import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, CircularProgress, MenuItem, Stack } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { articleType } from '@/Interfaces';
import { articleValidation } from '@/data/validation';
import { useAppDispatch } from '@/redux/store';
import { handleDialogClose, selectDialog } from '@/redux/features/dialogSlice';
import { useSelector } from 'react-redux';
import { LIST_UNITE_ARTICLE } from '@/data';

import { updateArticle } from './articles-api';


interface IProps{
  article:articleType;
}
export default function Edit({article}:IProps) {

const dispatch=useAppDispatch();
const {articleUpdate}=useSelector(selectDialog)


const [responseErrors,setResponseErrors]=React.useState(null);

const {register,handleSubmit,reset,formState:{errors}}=useForm<articleType>({values:article});
const {mutate,isLoading}=updateArticle();
const articleSubmit:SubmitHandler<articleType> =(data:articleType) =>{

      delete data["created_at" as keyof articleType];
      delete data["updated_at" as keyof articleType];
   

      mutate({endpoint:`articles/${article.ref}`,data});
    
   
}


  

  return (
    <Dialog
      open={articleUpdate}
      onClose={()=>dispatch(handleDialogClose("articleUpdate"))}
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
      
      
       
      
      <DialogTitle sx={{background:"#E0E7FF"}}><b>{article.nom}</b></DialogTitle>
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
                defaultValue={article.unite}
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
      <Button  type="submit" variant='contained' color="success" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={25}/>:""}>Sauvgarder</Button>
        <Button  variant='contained' className='btn-cancel' onClick={()=>{
          dispatch(handleDialogClose("articleUpdate"))
          reset()
          setResponseErrors(null);
          
          }}>Annuler</Button>
      </DialogActions>
    </Dialog>
  );
}