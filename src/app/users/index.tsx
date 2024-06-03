
import Create from "@/components/Users/Create";



import DeleteIcon from '@mui/icons-material/Delete';
import { Add } from "@mui/icons-material"
import { Button } from "@mui/material";
import Delete from "@/components/Users/Delete";
import { useTable } from "@/hooks/UsersHooks";
import Edit from "@/components/Users/Edit";
import MaterialTable from "@/components/MaterialTable";
import { useAppDispatch } from "@/redux/store";
import { handleDialogOpen } from "@/redux/features/dialogSlice";
import { useEffect } from "react";

interface IProps{

}

 function index({}:IProps){


  const dispatch=useAppDispatch();
  const {user,data}=useTable();
  
  useEffect(()=>{
    document.title="Utilisateurs"
  },[]);

  return (
    <div>

      <h1 className="text-xl md:text-3xl my-4 font-extrabold">Utilisateurs</h1>
     
      <Create/>
       {user!=undefined && <Edit user={user}/>  }
      <Delete users={data.table?.getSelectedRowModel()?.rows}/>
      
      

        
        <div>
         
          <MaterialTable data={data}  > 
          {data.table.getSelectedRowModel().rows.length > 0 ?
                                        <Button
                                            color="error"
                                            variant="contained"
                                            startIcon={<DeleteIcon/>}
                                            onClick={()=>dispatch(handleDialogOpen("userDelete"))}
                                         >
                                            Supprimer
                                        </Button> 
                                        :
                                        <Button  startIcon={<Add/>}  variant="contained" onClick={()=>{dispatch(handleDialogOpen("userCreate"))}}>
                                            vente
                                        </Button>}
          </MaterialTable> 
        </div>
        
        
     
    </div>
  )
}


export default index