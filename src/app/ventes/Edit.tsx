


import { memo, useEffect, useState } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import CreateComponent from "@/components/Ventes/Create"

import { useNavigate, useParams } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';
import { useFetchVente } from '@/hooks/VentesHooks';
import { useVente } from '@/Providers/VenteProvider';
import { useUpdateVente } from '@/hooks/VentesHooks'; 
import DeleteIcon from '@mui/icons-material/Delete';
import CreateSkelton  from "@/components/Ventes/Create/Skelton/index"
import DeleteModel from '@/components/DeleteModal';
import { useDeleteVente } from '@/hooks/VentesHooks'; 
import Factures from "@/components/Ventes/Edit/Factures/index";




function Edit(){
    let { venteId } = useParams<string>();
    const {isLoadingFetch}=useFetchVente(venteId as string);
    const {mutate,isLoading}=useUpdateVente();
    const {vente,saved}=useVente();
    const [open,setOpen]=useState(false);
    const navigate=useNavigate();
   

    const handleDeleteVente=()=>{
        useDeleteVente(vente.numero as string);
        navigate("/ventes");

    }

    useEffect(()=>{
      document.title=`Vente n ° ${vente.numero_vente }`
    },[vente]);
  
  return (
    
    <div>
      <DeleteModel title="Supprimer la vente :" action={handleDeleteVente} open={open} setOpen={setOpen}>

          <b>Vente n° {vente.numero_vente}</b>
      </DeleteModel>
        <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center  mb-4'>

            <h1 className="text-xl md:text-3xl my-4 font-extrabold">
                Vente n° {vente?.numero_vente}
            </h1>
            
            <div className='flex flex-row gap-2'>
                <Button  variant='outlined' color="error" onClick={()=>setOpen(true)}>
                   <DeleteIcon/>
                </Button>
                 <Button 
                        color="success"
                        variant="contained" 
                        sx={{width:"200px"}} 
                        disabled={vente.client_id==null || vente.designations.length==0 || vente.mode_paiement==null || isLoading || saved} 
                        endIcon={isLoading ? <CircularProgress size={25}/>:<SaveIcon/>} 
                        onClick={()=>{mutate(vente);}} 
                    >
                        Sauvegarder
                </Button>   

                
            </div>
        </div>

        {isLoadingFetch && <CreateSkelton/>}
        {! isLoadingFetch && <CreateComponent/>}
   
      <hr className='border-gray-400 w-[80%]  m-auto'/>
      <div className="my-4">
             <Factures/>
      </div>
        
    </div>
         

  )
}

export default  memo(Edit)