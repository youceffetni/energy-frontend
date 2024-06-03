
import MaterialTable from "@/components/MaterialTable";
import { useTable } from "@/hooks/VentesHooks"; 

import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Delete from "@/components/Ventes/Delete";
import { useEffect, useState } from "react";


 function index(){


 const data=useTable();
 const navigate=useNavigate();
 const selectedRows=data.table.getSelectedRowModel().rows;
 const [openDelete,setOpenDelete]=useState(false);
 useEffect(()=>{
    document.title="Ventes"
  },[]);
  return (

    <div>
        <h1 className="text-xl md:text-3xl my-4 font-extrabold">Ventes</h1>
        <MaterialTable data={data} >
            {selectedRows.length > 0 ?
                                        <Button
                                            color="error"
                                            variant="contained"
                                            startIcon={<DeleteIcon/>}
                                            onClick={()=>setOpenDelete(true)}
                                         >
                                            Supprimer
                                        </Button> 
                                        :
                                        <Button  startIcon={<Add/>}  variant="contained" onClick={()=>navigate("/ventes/ajouter")}>
                                            vente
                                        </Button>}
        </MaterialTable>

        <Delete ventes={selectedRows} openDelete={openDelete} setOpenDelete={setOpenDelete}/>
    </div>
  ) 
}


export default index