import { Outlet } from "react-router-dom";
import  VenteProvider  from '@/Providers/VenteProvider';

export default function VenteRoot(){

  return (
    <VenteProvider>
        <Outlet/>
    </VenteProvider>
  )
}
