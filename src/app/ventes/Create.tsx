import {  Button, CircularProgress } from '@mui/material';


import SaveIcon from '@mui/icons-material/Save';
import "dayjs/locale/fr";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { useCreateVente } from '@/hooks/VentesHooks'; 
import { useVente } from '@/Providers/VenteProvider';
import CreateComponent from "@/components/Ventes/Create"
import { useEffect } from 'react';






    


 function Create(){

   
    const {resetVente,vente,venteFooter:{montant_total_a_payer}}=useVente();
    const {mutate,isLoading}=useCreateVente(); 
    
    const handleSave=()=>{
        mutate({...vente,montant_total_a_payer:`${montant_total_a_payer}`}); 
        
    } 

    useEffect(()=>{
      document.title="Nouvelle vente"
    })
    

  /*   return <CreateSkelton/> */
  return (
    <div>

       
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center  mb-4'>
            <h1 className="text-xl md:text-3xl my-4 font-extrabold">
              Vente

            </h1>
            <div className='flex flex-row gap-2 '>
              <Button onClick={()=>resetVente()} variant='outlined' color="warning">
                <RotateLeftIcon/>
              </Button>
              <Button 
                
                variant="contained" 
                sx={{width:"200px"}} 
                disabled={ vente.client_id==null|| vente.designations.length==0 || isLoading} 
                endIcon={isLoading ? <CircularProgress size={25}/>:<SaveIcon/>}
                onClick={handleSave}
              >
                Sauvgarder
              </Button> 

            </div>
        </div> 
        
       
       <CreateComponent/>
  


       
           
     

     
    </div>
  )
}


export default Create;