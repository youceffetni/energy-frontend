import MaterialTable from "@/components/MaterialTable";
import {  useTable } from "@/hooks/Factures.tsx";

import { MRT_TableHeadCellFilterContainer } from "material-react-table";
import { useEffect } from "react";

export default function index(){

   const data=useTable();

 /* const navigate=useNavigate();
  const [openDelete,setOpenDelete]=useState(false); */
  useEffect(()=>{
     document.title="Factures"
   },[]);
 
   return (
 
     <div>
     
         <h1 className="text-xl md:text-3xl my-4 font-extrabold">Factures</h1>
        
         
          <MaterialTable data={data} >
              <div className="flex flex-col lg:flex-row gap-4 mb-4 justify-between ">
                {data.table.getLeafHeaders().map((header) => {

                  if( header.id=="client" || header.id=="type")
                    return (<div  key={header.id} className="bg-white w-[full] lg:w-[45%] p-4  rounded border border-gray-300" >
                              <MRT_TableHeadCellFilterContainer header={header} table={data.table} in />
                            </div>)
                })}
                
              </div>

              <div className="flex  flex-col lg:flex-row-reverse gap-4 mb-4 justify-between ">
                  {data.table.getLeafHeaders().map((header) => {

                      if( header.id=="date_facturation" || header.id=="numero_facture")
                        return (<div  key={header.id} className="bg-white w-[full] lg:w-[45%] p-4 rounded border border-gray-300" >
                                  
                                  <MRT_TableHeadCellFilterContainer header={header} table={data.table} in />
                                </div>)
                      })}
              </div>
          </MaterialTable>
 

     </div>
   ) 
}
