
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useMaterialReactTable } from "material-react-table"
import { clientInterface } from "@/Interfaces/clients"; 
import { Grid, Typography } from "@mui/material";
import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { useMemo, useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { handleDialogClose, handleDialogOpen, handleRefetch, selectDialog } from "@/redux/features/dialogSlice";
import { axiosEnergy } from "@/config/axios.config";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { onlyDirtyFields } from "@/helpers";





const mediaQuery = window.matchMedia('(max-width: 768px)');

export function getClientDetils({row}:{row:MRT_Row<clientInterface>}){


    return (
        <Grid container  spacing={3}>
    
        
            {mediaQuery.matches &&
            <Grid item xs={12}>
                <Typography variant='subtitle1'><u><b>Contact:</b></u></Typography>
                <Grid container spacing={1}>
                    {row.original.tel1 &&<Grid item xs={12} md={6}>
                        <b>Téléphone 1 :</b>{row.original.tel1}
                    </Grid>}
                    {row.original.tel2 &&<Grid item xs={12} md={6}>
                        <b>Téléphone 2 :</b>{row.original.tel2}
                    </Grid>}
                    {row.original.email && <Grid item xs={12} md={6}>
                        <b>Email :</b>{row.original.email}
                    </Grid>}
                    {row.original.adresse && <Grid item xs={12} md={6}>
                        <b>adresse :</b>{row.original.adresse}
                    </Grid>}
                    
                </Grid>
            </Grid>
            }
        
        
        <Grid item xs={12}>
                <Typography sx={{mb:1 }} variant='subtitle1'><b><u>Autres informations:</u></b></Typography>
                <Grid container spacing={1}>
                    
                    {row.original.web_site && <Grid item xs={12} md={6}>
                        <b>Site Web :</b>{row.original.web_site}
                    </Grid>}
                    {row.original.NIF && <Grid item xs={12} md={6}>
                        <b>Numéro d'identification fiscal (N°I.F) :</b>{row.original.NIF}
                    </Grid>}
                    {row.original.NIS && <Grid item xs={12} md={6}>
                        <b>Numéro d'identification statistique (N°I.S) :</b>{row.original.NIS}
                    </Grid>}
                    {row.original.NRC && <Grid item xs={12} md={6}>
                        <b>Numéro de registre commerce (N°.R.C) :</b>{row.original.NRC}
                    </Grid>}
                    {row.original.NAI && <Grid item xs={12} md={6}>
                        <b>Numéro article d'imposition (N°.A.I) :</b>{row.original.NAI}
                    </Grid>}
                    {row.original.RIB && <Grid item xs={12} md={6}>
                        <b>RIB:</b>{row.original.RIB}
                    </Grid>}
                    {row.original.activite && <Grid item xs={12} md={6}>
                        <b>Activité :</b>{row.original.activite}
                    </Grid>}
                </Grid>
        </Grid>
            
        </Grid>)
}


export function useFetchClients() {

    const {refetchApi}=useSelector(selectDialog)
    return useQuery({
      queryKey:["clients",refetchApi],
      queryFn: async ()=> {

        const response=await axiosEnergy.get("clients");
        return response.data.clients;

      }
    });
  }

export default function useTable(){


    const dispatch=useAppDispatch();
    const [clientToEdit,setClientToEdit]=useState<clientInterface>({
        id:1,
        nom:"",
        email:"",
        tel1:"",
        tel2:"",
        adresse:"",
        web_site:"",
        NIF:"",
        NIS:"",
        NRC:"",
        RIB:"",
        activite:"",
        NAI:"",
        created_at:"",
        updated_at:"",
    });
    const columns=useMemo<MRT_ColumnDef<clientInterface>[]>(()=>([
        {
            accessorKey:"id",
            header:"Id",
            
        },
        {
            accessorKey:"nom",
            header:"Client",
            
            Cell:({renderedCellValue})=><b className="text-slate-950">{renderedCellValue}</b>
        },
        {
            accessorKey:"email",
            header:"Email",
            Cell:({renderedCellValue})=><span>{renderedCellValue?renderedCellValue:"---"}</span>
        }
        ,
        {
            accessorKey:"tel1",
            header:"Téléphone1",
            Cell:({renderedCellValue})=><span>{renderedCellValue?renderedCellValue:"---"}</span>
        }
        ,
        {
            accessorKey:"tel2",
            header:"Téléphone2",
            Cell:({renderedCellValue})=><span>{renderedCellValue?renderedCellValue:"---"}</span>
        }
        ,
        {
            accessorKey:"adresse",
            header:"Adresse",
            Cell:({renderedCellValue})=><span>{renderedCellValue?renderedCellValue:"---"}</span>
        }
        ,
        {
            accessorKey:"web_site",
            header:"Web Site",
        }
        ,
        {
            accessorKey:"nrc",
            header:"NRC",
        }
        ,
        {
            accessorKey:"nif",
            header:"NIF",
        }
        ,
        {
            accessorKey:"nis",
            header:"NIS",
        }
        ,
        {
            accessorKey:"nai",
            header:"NAI",
        }
        ,
        {
            accessorKey:"rib",
            header:"RIB",
        }
        ,
        {
            accessorKey:"activite",
            header:"Activité",
        },
       
    
    ]),[]);

    const {data=[],isLoading,isError}=useFetchClients();

    const  columnVisibility={
        ...(
            mediaQuery.matches?
        {
          email:false,
          tel1:false,
          tel2:false,
          adresse:false
        }
        :
        {
      
        }),
        id:false,
        web_site:false,
        nrc:false,
        nif:false,
        nis:false,
        nai:false,
        rib:false,
        activite:false
    }
    
    
    const table=useMaterialReactTable({
            columns,
            data,
            localization:MRT_Localization_FR,
            enableSorting:false,
            enableRowSelection: true, 
            enableColumnActions:false,
            muiTableBodyProps:{sx: {'& >tr > td': {backgroundColor: '#fff',},},},
            muiTableBodyCellProps: ({row})=>({
                onClick: () => {
                    setClientToEdit(row?.original);
                    dispatch(handleDialogOpen("clientUpdate"));
                  
                },
                align:"center"
              }),
            
            muiPaginationProps: {
                variant: 'outlined',
                showRowsPerPage:false,
                shape:"rounded",
                
            },
            muiDetailPanelProps:{sx:{background:"#fffbeb !important"}},
            muiTableHeadCellProps: () => ({
                
                align:"center",
                sx:{background:"#E0E7FF"}
                
                
            }),
            paginationDisplayMode: 'pages',
            initialState: { 
                pagination:{pageIndex: 0,pageSize: 10,}, 
                showGlobalFilter: true,
                columnVisibility
            },
            renderDetailPanel:getClientDetils,
            muiTableBodyRowProps:{

                sx: {
                 cursor: 'pointer',
                 },
            }
           ,
  
    });



    return {clientToEdit,table,isLoading,isError}
}


export function useDeleteClient() {

    const dispatch = useAppDispatch();
    return useMutation( async (id:number)=>{
        return await axiosEnergy.delete(`clients/${id}`)
    },
      {
        onSuccess: ({ data }) => {
          if (data.status === 200) {
            dispatch(handleRefetch())
            dispatch(handleDialogClose("clientDelete"));
            enqueueSnackbar(`La suppression a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
          }
  
        },
        onError: (error) => { console.log(error) },
        onSettled: () => { }
      }
    );
  }


export function useUpdateClient() {
    const dispatch = useAppDispatch();
    return useMutation(async (data:{endpoint:string,data:any})=>{
       return await axiosEnergy.put(data.endpoint,onlyDirtyFields(data.data));
    },
      {
        onSuccess: (data) => {
  
          if (data.status === 200) {
            dispatch(handleRefetch())
            dispatch(handleDialogClose("clientUpdate"));
            enqueueSnackbar(`La modification a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
          }
  
        },
        onError: (error) => { console.log(error) },
        onSettled: () => { }
      }
    );
  } 