import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useReactToPrint } from 'react-to-print';
import PrintIcon from '@mui/icons-material/Print';
import { NumberToLetter, formatMontant } from '@/helpers/index.js';

import { useView } from '@/Providers/OverViewProvider';




const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function FactureOverview() {
  

  const {openFacture,setOpenFacture,facture}=useView();

  const componentRef = React.useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
 
     
      <Dialog
        fullScreen
        open={openFacture}
        onClose={()=>setOpenFacture(false)}
        TransitionComponent={Transition}
        sx={{"& .MuiPaper-root":{
          background:"#ddd"
        }}}
      >
       <AppBar sx={{ position: 'relative',background:"#191E38 !important" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={()=>setOpenFacture(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Aperçu de la facture
            </Typography>
            <Button 
              autoFocus 
              color="success" 
              variant='contained' 
              endIcon={<PrintIcon/>}
              onClick={()=>{
                  setOpenFacture(false);
                  handlePrint()
                }}
            >
              Imprimer
            </Button>
          </Toolbar>
        </AppBar> 
       <div className="flex  my-[90px] flex-row items-center justify-center  min-h-[calc(100vh-64px)]">

          {facture && <div className='px-4 bg-white rounded md:w-[768px]' ref={componentRef}>
              

                  <div className='flex flex-col items-center gap-4 my-5 '>
                      <img src="https://energyrecoverywt.com/asset/imgs/logo.png" width="250px"/>
                      <p className='text-xl font-semibold text-cyan-950'>SARL ENERGY RECOVERY AND WATER TECH</p>
                  </div>
                  <hr className='border-gray-500 w-[50%] m-auto'/>
                  <table className='w-full my-5'>
                    <tbody className='border border-gray-900'>
                    
                     
                      <tr>
                        <td className='px-2'>
                          <p className='text-2xl font-bold'>Facture N° {facture.numero_facture}</p>
                          <p className='text-xl'>Du {facture.date_facturation}</p>
                        </td>
                        <td className='border border-gray-900'>
                          <b>Client:</b> {facture?.client?.nom}                       
                        </td>
                      </tr>
                      <tr>
                        <td rowSpan={7} width={"50%"} >
                          
                        </td>
                       
                        
                      </tr>
                     {facture?.client?.adresse && <tr>
                          <td className='border border-gray-900'>
                            <b>Adresse:</b> {facture.client.adresse}
                          </td>
                      </tr>}
                      {facture?.client?.NRC && <tr>
                        <td className='border border-gray-900'>
                          <b>R.C N°:</b> {facture?.client?.NRC}                       
                        </td>
                      </tr> }
                      {facture?.client?.NIF && <tr>
                          <td className='border border-gray-900'>
                          <b>NIF:</b> {facture.client.NIF}
                          </td>
                      </tr>}
                     {facture?.client?.NIS && <tr>
                        <td className='border border-gray-900'>
                          <b>NIS:</b> {facture.client.NIS}                      
                        </td>
                      </tr>}
                      {facture?.client?.NAI && <tr>
                          <td className='border border-gray-900'>
                             <b>A.I.N°:</b> {facture?.client?.NAI}
                          </td>
                      </tr>}

                    </tbody>
                  </table>
                  <hr className='border-gray-500 w-[50%] m-auto'/>
                  <p className='text-xl font-bold'>Fourniture de:</p>
                  <table className=' text-center w-full mb-5'>
                    <thead>
                        <tr>
                          <th  className='border border-gray-900'>Référence</th>
                          <th  className='border border-gray-900'>Désgination</th>
                          <th  className='border border-gray-900'>Unité</th>
                          <th  className='border border-gray-900'>Prix HT</th>
                          <th  className='border border-gray-900'>Qte</th>
                          <th  className='border border-gray-900'>Mantant HT</th>
                        </tr>
                    </thead>

                    <tbody>
                    {facture.designations.map((item,index)=><tr key={index}>
                        <td  className='border border-gray-900'>{index+1}</td>
                        <td  className='border border-gray-900'>{item.nom}</td>
                        <td  className='border border-gray-900'>{formatMontant(item.prix)}</td>
                        <td  className='border border-gray-900'>U</td>
                        <td  className='border border-gray-900'>{item.Qt}</td>
                        <td  className='border border-gray-900'>{formatMontant(item.montant)}</td>
                      </tr>
                    )}
                    <tr>
                        <th colSpan={5}></th>
                        <th className="border border-gray-900 bg-gray-300" >{formatMontant(facture.montant)} </th>
                    </tr>
                    </tbody> 
                  </table>

                  <div className="flex flex-row justify-end w-full my-5" >

                          <table className='border-2 text-left border-gray-900  '>
                           

                         
                            <tr>
                              <th className='px-2'>Total H.T</th>
                              <td className='px-2'>{formatMontant(facture.montant_remise)}</td>
                            </tr>
                            
                          
                            <tr>
                              <th className='px-2'>TVA (19 %)  :</th>
                              <td className='px-2'>{formatMontant(facture.tva)}</td>
                            </tr>
                            <tr>
                              <th className='px-2'>Total TTC :</th>
                              <td className='px-2'>{formatMontant(facture.ttc)}</td>
                            </tr>
                            {facture.timbre!="0" && <tr>
                              <th className='px-2'>Timbre :</th>
                              <td className='px-2'>{formatMontant(facture.timbre)}</td>
                            </tr>}
                            <tr className='bg-gray-300 border-2  border-gray-900'>
                              <th className='px-2'>Total</th>
                              <td className='px-2'><b>{formatMontant(facture.net_a_payer)}</b></td>
                            </tr>
                          </table>
                  </div>
                  <p className='text-xl font-bold mt-5'>Arrêtez la présente à la somme de :</p>
                  <p className='mb-5 font-lg'>
                    {facture && NumberToLetter(facture.net_a_payer)}
                  </p>

                    <div className='my-10 text-xl font-bold flex justify-center'>
                      <u>LA DIRECTION</u>
                    </div>
                  <hr/>

                  {/* <footer className='mt-10'>
                      <div className="flex gap-4 flex-wrap">
                        <div>
                          <b>Siége:</b> Cité 05 juillet 70 lgts Bt C local 41 Bab Ezzouar - 16025 Alger 
                        </div>
                        <div>
                            <b>RIB:</b> ----------------
                        </div>
                        <div>
                            <b>RIS:</b> ----------------
                        </div>
                        <div>
                            <b>RIF:</b> ----------------
                        </div>
                        <div>
                            <b>R°A.I:</b> ----------------
                        </div>
                      </div>
                      </footer> */}
              
          </div>}


        </div>
        
       
      </Dialog>
   
  );
}

export default FactureOverview;