
import { clientInterface } from '@/Interfaces/clients'; 
import { Autocomplete, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useAppDispatch } from '@/redux/store';
import { handleDialogOpen } from '@/redux/features/dialogSlice';
import { Create } from '@/components/Clients/Create';

import { useEffect, useState } from 'react';
import { useVente } from '@/Providers/VenteProvider';
import { useFetchClients } from '@/hooks/clients';



export default function Client(){
    const {vente,setVente}=useVente();
  
    const {data=[]}=useFetchClients();
    const clients=data;

    const [client,setClient]=useState<clientInterface|null>(null);
    

    const dispatch=useAppDispatch();

    const onChangeHandle=(_:any,newClient:clientInterface|null)=>{
            setClient(newClient);
            const client_id=newClient!=null? newClient.id:null; 
            setVente({...vente, client_id});
        
    }
    

  useEffect(()=>{
      if(clients.length > 0 ){
          if(vente.client_id != null)
                  setClient(clients.find((item:clientInterface)=>item.id == vente.client_id))
          else
                  setClient(null)

      }

    },[clients,vente]);
    
   



   
  return (
    <div className='bg-white rounded border  border-slate-400  shadow'>
        <div className='px-4 py-1 flex flex-row   justify-between items-center'>
            <h1 className='text-xl '>Client</h1>
             
                <div>
                    <IconButton  onClick={()=>dispatch(handleDialogOpen("clientCreate"))}>
                    <AddIcon color="primary"/>
                    </IconButton>
                    <Create/>
                </div>
            
        </div>

      
        <hr className=' border-slate-400'/>
        
        <div className="flex flex-col p-4">
        
            <div className='lg:w-[400px] xl:w-[500px] '>
                <Autocomplete
                                    
                                    onChange={onChangeHandle} 
                                    value={client}
                                    options={clients} 
                                    getOptionLabel={(option:clientInterface)=>option.nom}
                                    isOptionEqualToValue={(option:clientInterface, value) => option.id === value.id}
                                    fullWidth
                                    disablePortal
                                    id="combo-box-demo"
                                    /* sx={{width:{lg:330}}} */
                                    renderInput={(params) => <TextField {...params}   label="Selectionner un client" />}
                />
            </div>

        
                            
            <div>
                
                <h1 className=' text-center text-xl font-bold my-2'>{client?.nom}</h1>
                <div className='flex flex-col gap-2 p-2'>
                            {client?.adresse && 
                                <div>
                                    <p><b>Adresse:</b> {client?.adresse}</p>
                                </div>
                            } 
                                
                            {client?.tel1 && 
                                <div>
                                    <p><b>Numéro de Téléphone:</b> {client?.tel1}</p>
                                </div>
                                
                            }
                            {client?.tel2 && 
                                <div>
                                    <p><b>Numéro de Téléphone:</b> {client?.tel2}</p>
                                </div>
                                
                            }
                            {client?.email && 
                                <div>
                                    <p><b>Email:</b> {client?.email}</p>
                                </div>
                                
                            }
                                
                            {client?.NRC && 
                                <div>
                                    <p><b>N°.R.C:</b>  {client?.NRC}</p>
                                </div>
                            }
                            {client?.NAI && 
                                <div>
                                    <p><b>N°.I.A:</b> {client?.NAI}</p>
                                </div>
                                
                            }   
                            {client?.NIS &&
                                <div>
                                    <p><b>N°.I.S:</b> {client?.NIS}</p>
                                </div>
                            }
                                
                            {client?.NIF && 
                                <div>
                                    <p><b>N°.I.F:</b> {client?.NIF}</p>
                                </div>
                                
                            }
                            {client?.RIB && 
                                <div>
                                    <p><b>RIB:</b> {client?.RIB}</p>
                                </div>
                                
                            }

                </div>              

                  
            </div>


        

        </div>

    </div>
  )
}
