import {  Stack } from '@mui/material';

import Designation from './Designation';
import Head from './Head';

import TotalFooter from './TotalFooter';
import { useVente } from '@/Providers/VenteProvider';




export default function index(){
  const {vente:{designations}}=useVente();

  return (
    <Stack direction="column" spacing={1}>
        <Head/>
        {designations.map((item,index)=>
              <Designation 
                  index={index+1}
                  key={item.ref}
                  designations={designations} 
                  articleVendu={item}
              />
        )}
         <TotalFooter /> 
    </Stack>
  )
}
