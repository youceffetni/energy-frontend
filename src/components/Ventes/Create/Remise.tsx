
import {  InputAdornment, TextField } from "@mui/material";
import { useVente } from '@/Providers/VenteProvider';

export default function Remise(){
   const {vente,vente:{remise},setVente}=useVente();
   const onChangeHandle=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    const remise=event.target.value;
    setVente({...vente,remise})
  
  }
  return (
  
    <div className='bg-white rounded border w-[390px] border-slate-400 mb-4 shadow'>
                    <h1 className='text-xl px-4 py-2 '>Remise</h1>
                    <hr className=' border-slate-400'/>
                    <div className="p-4">
                      <TextField 
                              fullWidth
                              value={remise} 
                              onChange={onChangeHandle}
                              variant="outlined"
                              InputProps={{
                                endAdornment: <InputAdornment position="start">DA</InputAdornment>,
                              }} 
                              type="number"
                          />
                    </div>
                </div>
                        

              
                    
    
  )
}
