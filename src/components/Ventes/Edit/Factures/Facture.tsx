
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { formatMontant } from '@/helpers';

import { FactureInterface } from '@/Interfaces/factures';

import FactureActions from './FactureActions';

interface IProps{
    facture:FactureInterface
}

export default function Facture({facture}:IProps){


  return (
  
   
        <tr className={facture.etat==1?"bg-green-200":""}>
                <td className='py-2 '><b>{facture.numero_facture}</b></td>

                <td> {facture.date_facturation}</td>
                <td> <b>{formatMontant(facture.net_a_payer)}</b></td>

                {facture.etat==1 &&<td className=' text-green-800 font-bold'> 
                    <DoneIcon/> 
            
                
                </td>}

                {!(facture.etat==1) && 
                    <td className=' text-red-800 font-bold'> 
                        <CloseIcon/> 
            
                
                    </td>
                }
                <td> 
                    {facture.type=="Facture" && <span  className=' bg-gray-200 text-green-700 font-bold rounded-xl px-4 py-1 border border-green-700'>
                        Facture
                    </span>}
                    {facture.type=="Proforma" && <span  className=' bg-gray-200 text-amber-700 font-bold rounded-xl px-4 py-1 border border-amber-700'>
                        Proforma
                    </span>}
                </td>
                <td>
                   
                    <FactureActions facture={facture}/>
                </td>
        </tr>

  
  )
}
