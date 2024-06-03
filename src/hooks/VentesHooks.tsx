
import { useMutation } from "react-query";
import { enqueueSnackbar } from "notistack";
import {  useNavigate } from "react-router-dom";
import { axiosEnergy } from "@/config/axios.config";
import { useVente } from "@/Providers/VenteProvider"; 
import { useQuery } from "react-query";
import { useEffect } from "react";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useMaterialReactTable } from "material-react-table"
import { MRT_ColumnDef} from "material-react-table";
import { useMemo} from "react";
import { VentesTableInterface,VenteInterfce } from "@/Interfaces/ventes"; 
import { formatMontant } from '@/helpers';
import { useSelector } from "react-redux";
import { selectDialog } from "@/redux/features/dialogSlice";

export function useCreateVente(){

    const {resetVente}=useVente();
    const navigate=useNavigate();

    return useMutation(async (data:VenteInterfce)=>{
        return  await axiosEnergy.post("/ventes",data);
    },{
        onSuccess:({data})=>{
            if(data.status==201){
                enqueueSnackbar(`La vente a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
                resetVente()

               navigate(`/ventes/modifier/${data.vente.numero}`); 
            }
            
        },
        onError:(error)=>{
            console.log(error);
        }
    }); 

}



export function useDeleteVente(numero:string){


    axiosEnergy.delete(`ventes/${numero}`)
        .then((response)=>{
            if(response.status==204)
                enqueueSnackbar(`La suppression a été effectuée avec succès`, { variant: "success", autoHideDuration: 2000 });
        })
        .catch((error)=>{
            console.log(error)
        });
        
}







export function useFetchVente(id:string){
    const {setVente,storedVente,_setSaved}=useVente();
    const {refetchApi}=useSelector(selectDialog)
    const {data,isLoading,isFetched}=useQuery(["vente",refetchApi],async ()=>{
        const data=await axiosEnergy.get(`ventes/${id}`);

        return data.data.vente;
    });

    useEffect(()=>{
        if(isFetched){
            const vente:VenteInterfce={
                edit:true,
                numero:data.numero,
                numero_vente:data.numero_vente,
                client_id:data.client.id,
                date:data.date,
                designations:data.designations,
                mode_paiement:data.mode_paiement,
                montant_total_a_payer:data.montant_total_a_payer,
                notes:data.notes,
                remise:data.remise,
                factures:data.factures
    
            }
            setVente(vente)
            _setSaved(true)
        }

        return ()=>{
            
            setVente(storedVente)
        }
    },[data])

    return {isLoadingFetch:isLoading}


   
}












function useGetVentes() {
    const {refetchApi}=useSelector(selectDialog)
    const { data = [], isLoading, isError } = useQuery(["ventes",refetchApi], async () => {
    const response = await axiosEnergy.get("ventes");
    return response.data.ventes;
    });

    const ventes = useMemo(() => {
    if (!data || isLoading || isError) return [];
    return data.map((vente: any) => ({
        numero: vente.numero,
        numero_vente: vente.numero_vente,
        date_vente: vente.date,
        client: vente.client.nom,
        montant_total_a_payer: vente.montant_total_a_payer,
        user: vente.user.name,
    }));
    }, [data, isLoading, isError]);

    return { ventes, isLoading, isError };
}

 export function useTable(){
    const navigate=useNavigate(); 
    const {ventes,isLoading,isError}=useGetVentes();

  
    const columns= useMemo <MRT_ColumnDef<VentesTableInterface>[]>(()=>([
        {
            accessorKey:"numero",
            header:"numero",
        

        },
        {
            accessorKey:"numero_vente",
            header:"N° Vente",
            Cell:({renderedCellValue})=><b className="text-slate-950">{renderedCellValue}</b> 
            
            
        },
        {
            accessorKey:"date_vente",
            header:"Date",
            
            
        },
        {
            accessorKey:"client",
            header:"Client",
    
            Cell:({renderedCellValue})=><b className="text-slate-950">{renderedCellValue}</b> 

    
        }, 
    

        {
            
            accessorKey:"montant_total_a_payer",
            header:"Montant total a payer",
            Cell:({cell})=><div>{formatMontant(cell.getValue<string>())} DA</div>
        } ,
        {
            accessorKey:"user",
            header:"Créée par",

        }  
        

    ]),[]); 

    const table=useMaterialReactTable({
                columns,
                data:ventes,
                localization:MRT_Localization_FR,
                enableSorting:false,
                enableRowSelection: true, 
                enableColumnActions:false,
                muiTableBodyProps:{sx: {'& >tr > td': {backgroundColor: '#fff',},},},
                muiTableBodyCellProps: ({row})=>({
                    align:"center",
                    onClick:()=>{
                    
                        navigate(`/ventes/modifier/${row?.original.numero}`)
                    }

                }),
                
                muiPaginationProps: {
                    variant: 'outlined',
                    showRowsPerPage:false,
                    shape:"rounded",
                    
                },
                muiTableHeadCellProps: () => ({
                    
                    align:"center",
                    sx:{background:"#E0E7FF"}
                    
                    
                }),
                paginationDisplayMode: 'pages',
                initialState: { 
                    pagination:{pageIndex: 0,pageSize: 10,}, 
                    showGlobalFilter: true,
                    columnVisibility:{
                        numero:false,
                    }
                
                
                },
                
            
    
    });  


    return {table,isLoading,isError}; 
 
 }




 export const useUpdateVente=()=>{

    const {_setSaved}=useVente();

    return useMutation(async (vente:VenteInterfce)=>{
  
        const {numero}=vente
        return  await axiosEnergy.put(`/ventes/${numero}`,vente)
    },{
        onSuccess:({data})=>{
            if(data.status==200){
                _setSaved(true)
                enqueueSnackbar(`La vente a été modifiée avec succès`, { variant: "success", autoHideDuration: 2000 });
            }

        },
        onError:(error)=>{
            console.log(error)
        }
    })
}