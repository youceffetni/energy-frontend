import {FactureOverViewInterface } from '@/Interfaces/factures';
import FactureOverview from '@/components/Ventes/Edit/Factures/FactureOverview';

import { createContext, useContext, useState } from 'react';

interface ViewContextInterface{
  openFacture:boolean
  setOpenFacture:React.Dispatch<React.SetStateAction<boolean>>
  facture:FactureOverViewInterface;
  setFacture:(val:FactureOverViewInterface)=>void

}
interface IProps{
children:React.ReactNode;
}



const ViewContext=createContext<ViewContextInterface>({
  openFacture:false,
  setOpenFacture:()=>{},
  facture:null,
  setFacture:()=>{}
});

export default function ViewProvider({children}:IProps){

  const [openFacture,setOpenFacture]=useState(false);
  const [facture,setFacture]=useState<FactureOverViewInterface>(null);

  return (
    <ViewContext.Provider value={{facture,setFacture,openFacture,setOpenFacture}}>
        <FactureOverview/>
        {children}

    </ViewContext.Provider>
  )
}



export const useView=()=>useContext(ViewContext);
