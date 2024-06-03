
import { TextField } from '@mui/material';
import * as React  from 'react';
import { useVente } from '@/Providers/VenteProvider';

 function Notes(){
    const {vente,vente:{notes},setVente}=useVente();

   const  onChangeHandle=(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setVente({...vente,notes:event.target.value})
    }
  return (
    <div className="bg-white ">
                <h1 className='text-xl px-4 py-2 shdow border border-slate-400 rounded '>Notes</h1>
                
             
                    <TextField
                        value={notes}
                        onChange={onChangeHandle}
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                      
                    />
             
            </div>
  )
}


export default Notes;