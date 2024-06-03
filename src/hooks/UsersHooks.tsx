import { axiosEnergy } from '@/config/axios.config';
import { handleDialogClose, handleRefetch } from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { UserInterface } from '@/Interfaces/UsersInterfaces';
import { MRT_ColumnDef, useMaterialReactTable } from "material-react-table";

import { useMemo} from "react";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { Chip } from "@mui/material";

import { handleDialogOpen } from "@/redux/features/dialogSlice";

import { selectDialog } from "@/redux/features/dialogSlice";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export function useCreateUser(){
    const dispatch =useAppDispatch();
    const [responseErrors,setResponseErrors]=useState(null);
    const form=useForm<UserInterface>();
    const mutationObject=useMutation(async (data:UserInterface)=>{

        const userData = await axiosEnergy.post("/register",data);

        return userData;
    },{
        onSuccess:({data})=>{
            if(data.status===201){
                dispatch(handleDialogClose("userCreate"));
                dispatch(handleRefetch()); 
                enqueueSnackbar("l'utilisateur a ajouté avec succès",{variant:"success",autoHideDuration:3000});
                setResponseErrors(null);
                form.reset(); 
            }
        },
        onError:({response})=>{
            console.log(response)
            if(response.status==422)
               setResponseErrors(response.data.message);

        }
        
    });

    return ({
        ...form,
        ...mutationObject,
        responseErrors
    })
}






export function useDeleteUser(){
    const dispatch = useAppDispatch();
    return useMutation(async (id:number)=>{
        const response= await axiosEnergy.delete("/users/delete/"+id);

        return response;
    },
      {
        onSuccess: ({status}) => {
           if(status==204){

                    dispatch(handleRefetch())
                   dispatch(handleDialogClose("userDelete"));
                   enqueueSnackbar(`La suppression a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 }); 
           }
       
  
  
        },
        onError: (error) => { console.log(error) },
        
      }
    );
}








export function useGetUsers(){

    const {refetchApi}=useSelector(selectDialog)
    const {data=[],isLoading,isError}=useQuery(["users",refetchApi],async ()=>{
        const data=await axiosEnergy.get("/users");
       return data.data.users;
    }
       );
    return {data,isLoading,isError};
}

export function useTable (){

   const [user,setUser]=useState<UserInterface>();
   const {data,isLoading,isError}=useGetUsers();

   const dispatch=useAppDispatch();
   const mediaQuery = window.matchMedia('(max-width: 768px)');
    const columnVisibility={
        id:false,
        ...( mediaQuery.matches ?
            {
                email:false,
                role:false
        }:{})
    }
    const columns=useMemo<MRT_ColumnDef<UserInterface>[]>(()=>{
       

        return [
            {
                accessorKey:"id",
                header:"Id",
                
            },
            {
                accessorKey:"name",
                header:"Nom d'utilisatuer",
                Cell:({renderedCellValue})=><b className="text-slate-950">{renderedCellValue}</b>
                
            },
            {
                accessorKey:"email",
                header:"Email",
                
            },
            {
                accessorKey:"role",
                header:"Rôle",
                Cell:({renderedCellValue})=><Chip label={renderedCellValue==1 ? "Super Admin" :"Admin"} color="warning" size="small" variant="filled" />
             
                
               
                
            },
        ]
    },[]);
    
    const table =useMaterialReactTable({
        columns,
        data,
        localization:MRT_Localization_FR,
        enableSorting:false,
        enableRowSelection: true, 
        enableColumnActions:false,
        muiTableBodyProps:{sx: {'& >tr > td': {backgroundColor: '#fff',},},},
        muiPaginationProps: {
            variant: 'outlined',
            showRowsPerPage:false,
            shape:"rounded",
            
        },
        muiTableHeadCellProps: () => ({
                
            align:"center",
            sx:{background:"#E0E7FF"}
            
            
        }),
        muiTableBodyCellProps: ({row})=>({
            align:"center",
            onClick:()=>{
                setUser(row.original)
                dispatch(handleDialogOpen("userUpdate")) 
            }

        }),
        
        paginationDisplayMode: 'pages',
        
        muiTableBodyRowProps:{

            sx: {
             cursor: 'pointer',
             },
        },
        state:{ 
            pagination:{pageIndex: 0,pageSize: 10,}, 
            showGlobalFilter: true,
            columnVisibility,
            
           
            
            
        }
    });


    return {user,data:{table,isLoading,isError}};
}









export function useUpdateUser(user:UserInterface){



const dispatch = useAppDispatch();
const [responseErrors,setResponseErrors]=useState(null);
const form =useForm<UserInterface>({values:user} );
const mutation= useMutation(async (data:UserInterface)=>{
    const response = await axiosEnergy.put(`/users/edit/${data.id}`,data)

    return response;
  },
    {
      onSuccess: (response) => {

        if (response.status === 200) {
          dispatch(handleRefetch())
          dispatch(handleDialogClose("userUpdate"));
          enqueueSnackbar(`La modification a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
        }

      },
      onError: ({response}) => { 
       
        if(response.status=422){
          setResponseErrors(response.data.message)
        }
      
      },
    
    }
  );

  return {
    ...form,
    ...mutation,
    responseErrors,
    setResponseErrors
  }
}