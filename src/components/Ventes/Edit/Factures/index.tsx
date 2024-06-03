

import { useVente } from '@/Providers/VenteProvider';
import Facture from './Facture';
import FactureGenerator from './FactureGenerator';


function index(){


    const {vente:{factures}}=useVente();

   
  return (
    <div>
        <div className="flex flex-row justify-between my-4">
            <h1 className='text-4xl '>Factures</h1>
            <FactureGenerator/>
        </div>
        <div className="bg-white shadow rounded">

                    <table className='w-full text-center '>
                            <thead >
                                <tr className=' bg-gray-300 uppercase'>
                                    <th>Numéro</th>
                                    <th>Date de facturation</th>
                                    <th>Montant total a payer</th>
                                    <th>état</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                 {factures?.map((facture)=><Facture facture={facture} key={facture.numero}/>)} 
                                
                            </tbody>
                    </table>
        </div>
    </div>
  )
}
export default index