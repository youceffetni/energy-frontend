import { useVente } from '@/Providers/VenteProvider';
import { formatMontant } from '@/helpers';
import { Grid } from '@mui/material';


export default function TotalFooter(){


  const {vente:{designations}}=useVente();

   const montantTotal=designations.reduce((acc,item)=>{

    return acc + parseFloat(item.montant);
  },0); 


  return (
    <Grid container className='text-center p-1' alignItems={"center"}>
                    <Grid item xs={7}>
                      
                    </Grid>
                    
                    <Grid item xs={2} className='font-bold'>
                        Montant total 
                    </Grid>
                    <Grid item xs={2} className=' font-bold bg-gray-200 shadow rounded border border-gray-300 py-2'>
                    {formatMontant(montantTotal)}  
                    </Grid>
                    
                
    </Grid>
  )
}
