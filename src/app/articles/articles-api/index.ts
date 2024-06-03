import { fetchAxios, putAxios } from "@/services/axiosApi.service";
import { useQuery } from "react-query";
import { deleteAxios } from '@/services/axiosApi.service';
import { enqueueSnackbar } from 'notistack';
import { useMutation } from 'react-query';
import { handleDialogClose, handleRefetch} from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';
export  function fetchArticles(queryKey:any[]){
   
    return useQuery({
        queryKey,
        queryFn:async()=>(await fetchAxios("articles")).articles
      }); 
}


export function deleteArticle(){
    const dispatch=useAppDispatch()
 return useMutation(deleteAxios,
    {
        onSuccess:({data})=>{     
         if(data.status===200){
          dispatch(handleRefetch())
          dispatch(handleDialogClose("articleDelete"));
          enqueueSnackbar(`La suppression a été effectuée avec succès`,{variant:"success",autoHideDuration:2000});
         }
        
        },
        onError:(error)=>{console.log(error)},
        onSettled:()=>{}
    }
  );

}


export function updateArticle(){
  const dispatch=useAppDispatch();
  return useMutation(putAxios,
     {
         onSuccess:(data)=>{     
          if(data.status===200){
           dispatch(handleRefetch())
           dispatch(handleDialogClose("articleUpdate"));
           enqueueSnackbar(`La modification a été effectuée avec succès`,{variant:"success",autoHideDuration:2000});
          }
         
         },
         onError:(error)=>{console.log(error)},
         onSettled:()=>{}
     }
   );
} 