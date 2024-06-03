

import * as React  from 'react';
import  {VenteProviderInterfce,VenteInterfce} from  "../Interfaces/ventes";
import dayjs from 'dayjs';

interface IProps{
children:React.ReactNode;
}



export const DefaultVente ={
  edit:false,
  numero_vente:null,
  date:dayjs().format("DD/MM/YYYY"),
  remise:"0",
  mode_paiement:"1",
  client_id:null,
  designations:[],
  montant_total_a_payer:"00.00",
  notes:"Notes sur la vente ..."
}

const venteFooterDefault={
 
  montant_total:0,
  mode_paiement:"Par chéque",
  remise:"00.00",
  montant_total_avec_remise:0,
  tva:0,
  montantTotalTTC:0,
  timbreMontant:0,
  montant_total_a_payer:0
}

const VenteContext=React.createContext<VenteProviderInterfce>({
  vente:DefaultVente,
  setVente:()=>{},
  venteFooter:venteFooterDefault,
  resetVente:()=>{},
  storedVente:DefaultVente,
  saved:false,
  _setSaved:()=>{}

});



export default function VenteProvider({children}:IProps){

  const [saved,setSaved]=React.useState(true)
 
  const storedVente=getStoredVente()

  const [vente,_setVente]=React.useState<VenteInterfce>(storedVente);
 



  const setVente=(vente:VenteInterfce)=>{
    if(vente.edit==false)
    
      localStorage.setItem("vente",JSON.stringify(vente));
    else
      setSaved(false)

     _setVente(vente)
  }



  const resetVente=()=>{
    localStorage.removeItem("vente");

    _setVente(DefaultVente)
  }


  const _setSaved=(val:boolean)=>{
    setSaved(val)
  }
  const venteFooter=venteFooterCalculate(vente);

  return (
    <VenteContext.Provider value={{saved,_setSaved,vente,setVente,venteFooter,resetVente,storedVente}}>
      {children}
    </VenteContext.Provider>
  )
}

export const useVente=()=>React.useContext(VenteContext);




const venteFooterCalculate=(vente:VenteInterfce)=>{

  function timbre(montant:number){
      
    let timbre=0.01*montant;

        if(timbre>10_000) return 10_000
        if(timbre<5) return 5

        return timbre; 


  }

  const montant_total=vente?.designations.reduce((acc,currentVal)=>{
    return acc+ parseFloat(currentVal.montant)},0);

  var mode_paiement="";
  if(vente?.mode_paiement =="0")
          mode_paiement="Par espèces";
  else if(vente?.mode_paiement =="1")

          mode_paiement="Par chéque";
  else if(vente?.mode_paiement =="2")
          mode_paiement="Par virement bancaire";
  else
          mode_paiement="Paiement a terme";


  const montant_total_avec_remise=montant_total - Number(vente?.remise);


  const tva= montant_total_avec_remise * 19/100;
  const montantTotalTTC=tva+montant_total_avec_remise;
  const timbreMontant=vente?.mode_paiement =="0" ? timbre(montantTotalTTC):0;
  const montant_total_a_payer=montantTotalTTC+timbreMontant;

  return {
    montant_total,
    mode_paiement,
    remise:vente.remise,
    montant_total_avec_remise,
    tva,
    montantTotalTTC,
    timbreMontant,
    montant_total_a_payer
  }


}

const getStoredVente=()=>{
 

      if(localStorage.getItem("vente") != null)
            return JSON.parse(localStorage.getItem("vente") as string)

      return DefaultVente;
}