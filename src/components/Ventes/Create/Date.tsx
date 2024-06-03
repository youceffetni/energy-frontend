
import { DatePicker } from '@mui/x-date-pickers';
import { useVente } from '@/Providers/VenteProvider';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

export default function Date(){

  const {vente,vente:{date},setVente}=useVente();

  const [dateState,setDateState]=useState<Dayjs | null>(dayjs(date,"DD/MM/YYYY"));

  const onChangeHandle=(newDate:Dayjs | null)=>{

    setDateState(newDate);
    const dateFormated=newDate!=null ? newDate.format("DD/MM/YYYY"):dayjs().format("DD/MM/YYYY");
    
    setVente({...vente, date:dateFormated});
    
  } 

  

  return (
    <div className='bg-white rounded border border-slate-400 mb-4 shadow '>
        <h1 className='text-xl px-4 py-2 '>Date de vente</h1>
        <hr className=' border-slate-400'/>
        <div className="p-4">
              

                    <DatePicker 
                        sx={{width:{xs:"100%",lg:330}}} 
                        value={dateState}
                        onChange={onChangeHandle} 
                        format={"DD/MM/YYYY"}
                    />
              
        </div>
    </div>
  )
}
