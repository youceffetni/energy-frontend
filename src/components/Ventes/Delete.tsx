
import DeleteModel from '@/components/DeleteModal';
import { MRT_Row } from 'material-react-table';
import { VentesTableInterface } from '@/Interfaces/ventes'; 
import { useDeleteVente } from '@/hooks/VentesHooks'; 
import { useAppDispatch } from '@/redux/store';
import { handleRefetch } from '@/redux/features/dialogSlice';


interface IProps{
  ventes:MRT_Row<VentesTableInterface>[];
  setOpenDelete:(val:boolean)=>void
  openDelete:boolean
}




export default function Delete({ventes,setOpenDelete,openDelete}:IProps){
 


const dispatch=useAppDispatch();
  const handleDelete=()=>{

    ventes.map((vente:MRT_Row<VentesTableInterface>)=>{
        useDeleteVente(vente.original.numero);
        
      });
      
      setOpenDelete(false);
      dispatch(handleRefetch())
  }
     


  return (
      <DeleteModel 
        title="Êtes-vous sûr de supprimer ces ventes :" 
        action={handleDelete}
        open={openDelete}
        setOpen={setOpenDelete}
      >
        <div>
          {ventes?.map(({original})=>(<div key={original.numero}><b>- Vente n° : {original.numero}</b></div>))}
        </div>
      </DeleteModel>
  
  )
}

