
import {  MRT_RowData, MRT_TableContainer, MRT_TableInstance, MRT_TablePagination } from "material-react-table";
import { MRT_GlobalFilterTextField } from "material-react-table";
import TableSkelton from "./Ui/TableSkelton";

import { ReactNode } from "react";

interface IProps <T extends MRT_RowData>{
   data:{
    table:MRT_TableInstance<T>,
    isLoading:boolean;
    isError?:boolean;
   }
   children:ReactNode
}
export default function MaterialTable<T extends MRT_RowData>({data:{table,isLoading},children}:IProps<T>){
    
    return (<div>
  
        <div className="flex flex-col gap-4 md:gap-0  md:flex-row  justify-start  my-4">
            
            <div className="flex-grow"> 
                {children}
            </div>
            <div className="bg-white">
                <MRT_GlobalFilterTextField  table={table} />
            </div>
        
    
        </div>
         
        {!isLoading &&<div className="rounded border border-gray-300"> <MRT_TableContainer table={table} /></div>}
        {isLoading && <div className="flex flex-row justify-center"><TableSkelton/></div>}
        <div className="flex flex-row justify-center">
            <MRT_TablePagination table={table} />
        </div>
    </div>
    )
}
