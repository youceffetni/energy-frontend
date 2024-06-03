
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { DatePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { useVente } from '@/Providers/VenteProvider';
import { useGenerateFacture } from '@/hooks/Factures';

import Spinner from '@/components/Ui/Spinner';
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';
import { useUpdateVente } from '@/hooks/VentesHooks';

interface IProps{
    openGenerate:boolean;
    setOpenGenerate:(val:boolean)=>void
}
export default function GenerateFactureDialog({openGenerate, setOpenGenerate}:IProps) {

  

  const handleClose = () => {setOpenGenerate(false);};
  const {vente,venteFooter,vente:{date},saved}=useVente();

  const [dateFacturation,setDateFacrturation]=useState<Dayjs | null>(dayjs(date,"DD/MM/YYYY"));

  const [typeFacture,setTypeFacture]=useState<string>("Facture");
  const onChangeDateHandler=(newDate:Dayjs | null)=>{setDateFacrturation(newDate);}

  const {mutate,isLoading}=useGenerateFacture();   
  const {mutate:mutateVente}=useUpdateVente();
  
   const handleFactue =()=>{
       
      if(!saved)
       mutateVente(vente);

       
       const facture={
            date_facturation:dateFacturation?.format("DD/MM/YYYY") as string,
            etat:0,
            type:typeFacture,
            montant:`${venteFooter.montant_total}`,
            montant_remise:`${venteFooter.montant_total_avec_remise}`,
            net_a_payer:`${venteFooter.montant_total_a_payer}`,
            ttc:`${venteFooter.montantTotalTTC}`,
            tva:`${venteFooter.tva}`,
            timbre:`${venteFooter.timbreMontant}`,
            designations:vente.designations,
            client_id:vente?.client_id as number,
            vente_numero:vente?.numero as string,

     }
     mutate(facture) 
     
     
     handleClose();
   }
  return (
    <div>
     
        <Dialog
            open={openGenerate}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        
        <DialogContent>
                <h1 className='text-lg mb-4'>Choisissez une date de facturation</h1>
                <div className='w-full'>
                    <DatePicker 
                            
                            sx={{width:{xs:"100%",lg:330}}} 
                            value={dateFacturation}
                            onChange={onChangeDateHandler} 
                            format={"DD/MM/YYYY"}
                    />

                </div>
                <h1 className='text-lg my-4'>Type de facture</h1>
                <div className='w-full'>
                    <TextField
                            fullWidth
                            select
                            label="Type"
                            defaultValue={"Facture"}
                            value={typeFacture}
                            onChange={(e)=>setTypeFacture(e.target.value)}
                        >
                            <MenuItem value={"Proforma"} >Proforma</MenuItem>
                            <MenuItem value={"Facture"} >Facture</MenuItem>
                    </TextField>
                </div>

                {isLoading && <div className='flex justify-center my-4'>
                    <Spinner w="w-16" h="h-16"/>
                </div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' className='btn-cancel'>Annuller</Button>
          <Button onClick={handleFactue} autoFocus variant='contained' disabled={isLoading}>
                facturer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
