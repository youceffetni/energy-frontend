import { formatMontant } from '@/helpers';
import { useVente } from '@/Providers/VenteProvider';




export default function Footer(){
 
  const {venteFooter:{
    mode_paiement,
    remise,
    montant_total_avec_remise,
    tva,
    montantTotalTTC,
    timbreMontant,
    montant_total_a_payer
  }}=useVente()

  return (
   
    <div className='bg-white rounded border border-slate-400 w-[390px]  mb-4 shadow'>
      <table className=' text-left w-full   '>
          <tbody>
          <tr>
            <th className='p-2 w-[50%]'>Mode de paiement :</th>
            <td className='p-2'>{mode_paiement}</td>
           </tr>

        
            <tr>
              <th className='px-2 w-[50%]'>Remise :</th>
              <td className='px-2'>{formatMontant(remise)}</td>
            </tr>
            <tr>
              <th className='p-2 w-[50%]'>Montant total H.T avec remise appliquée :</th>
              <td className='p-2'>{formatMontant(montant_total_avec_remise)}</td>
            </tr>
        
      
              <tr>
                <th className='p-2 w-[50%]'>TVA (19 %)  :</th>
                <td className='p-2'>{formatMontant(tva)}</td>
              </tr>
              <tr>
                <th className='p-2 w-[50%]'>Montant total TTC :</th>
                <td className='p-2'>{formatMontant(montantTotalTTC)}</td>
              </tr>
                {mode_paiement ==="Par espèces" &&
                    <tr>
                    <th className='p-2 w-[50%]'>Timbre :</th>
                    <td className='p-2'>{formatMontant(timbreMontant)}</td>
                  </tr>
                }
                <tr className='bg-gray-200  border-t  border-slate-400'>
                  <th className='p-2 w-[50%]'>Montant à payer</th>
                  <td className='p-2'>{formatMontant(montant_total_a_payer)}</td>
                </tr>
          </tbody>
      </table>
    </div>
    

  )
}
