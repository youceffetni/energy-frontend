import * as React from 'react';
import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add';


import GenerateFactureDialog from './GenerateFactureDialog';

export default function FactureGenerator() {

  const [openGenerate, setOpenGenerate] = React.useState(false);

  return (
    <div>
      <Button onClick={()=> setOpenGenerate(true)} variant='contained' endIcon={<AddIcon/>}>Facture  </Button>
      <GenerateFactureDialog {...{openGenerate,setOpenGenerate}} />
   
    </div>
  );
}