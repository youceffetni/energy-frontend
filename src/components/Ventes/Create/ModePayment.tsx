
import {  MenuItem, TextField } from '@mui/material';
import { useVente } from '@/Providers/VenteProvider';



export default function ModePayment(){
  const {vente,vente:{mode_paiement},setVente}=useVente();

   const handleChange=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
      const mode_paiement=event.target.value;
      
      setVente({...vente, mode_paiement})
    }
  
  
  return (
   
                      
    <div className="bg-white rounded border border-slate-400  shadow">
        <h1 className='text-xl px-4 py-2'>Mode de paiement</h1>
        <hr className=' border-slate-400'/>
        <div className='p-4'>
          <TextField
                              id="outlined-select-currency"
                              select
                            
                              fullWidth
                              
                              sx={{width:{lg:330}}}
                              value={mode_paiement}
                              onChange={handleChange}
                              
                              >
                                  <MenuItem value={0}  selected>Par espèces</MenuItem>
                                  <MenuItem value={1}  selected>Par chéque</MenuItem>
                                  <MenuItem value={2}  selected>Par virement bancaire</MenuItem>
                                  <MenuItem value={3}  selected>Paiement a terme</MenuItem>

          </TextField>
        </div>
    </div>
                
                    
    
  )
}


