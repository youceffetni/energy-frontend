
import { FactureDataTableInterface, FactureInterface } from '@/Interfaces/factures';
import { axiosEnergy } from '@/config/axios.config';
import { formatMontant } from '@/helpers';
import { handleDialogOpen, handleRefetch, selectDialog } from '@/redux/features/dialogSlice';
import { useAppDispatch } from '@/redux/store';
import { MenuItem } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { MRT_ColumnDef, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { useNavigate } from 'react-router-dom';
import { useView } from '@/Providers/OverViewProvider';

export function useGenerateFacture(){
  
    const dispatch=useAppDispatch();

    return useMutation(async (data:any)=>{
        const response=await axiosEnergy.post("/factures",data);

        return response.data
    },{
        onSuccess:()=>{
            dispatch(handleDialogOpen("factureOverview")); 
            dispatch(handleRefetch())
           
        },
        onError:()=>{

        }
    });
}


export function useFetchFacutres(){
    const {refetchApi}=useSelector(selectDialog)
    const {data,isLoading}=useQuery({
        queryKey:["factures",refetchApi],
        queryFn:async ()=>{
            const response = (await axiosEnergy.get("/factures")).data.factures;
            return response; 
        }
    });

    const factures:FactureDataTableInterface[]=useMemo(()=>{
        if(isLoading) return [];

        if(!isLoading) return data.map((facture:FactureInterface)=>{


            const {
                numero,
                numero_facture,
                date_facturation,
                type,
                net_a_payer,
                client,
                vente

            }=facture;

            return {
                numero,
                numero_facture,
                date_facturation,
                type,
                net_a_payer,
                client:client?.nom,
                vente
            };
        }); 

    },[isLoading])


    return {factures,isLoading};
}

export function useTable(){

    const {factures:data,isLoading}=useFetchFacutres();
    const navigate=useNavigate();
    const {setOpenFacture}=useView();
    const columns=useMemo<MRT_ColumnDef<FactureDataTableInterface>[]>(()=>[
        {
            accessorKey:"numero",
            header:"numero"
            
        },
        {
            accessorKey:"numero_facture",
            header:"N° facture",
       
            enableSorting:false,
            Cell:({renderedCellValue})=><b>{renderedCellValue}</b>,

        },
        {
            accessorFn: (originalRow) => {

                return dayjs(originalRow.date_facturation,"DD/MM/YYYY")
            },
            accessorKey:"date_facturation",
            header:"Date facturation",
            filterVariant: "date",
            Cell: ({ cell }) => cell.getValue<Dayjs>().format("DD/MM/YYYY"),
           

        },
        {
            accessorKey:"client",
            header:"Client",
            enableSorting:false,
            filterVariant: 'autocomplete',
            filterSelectOptions: ["youcef","ilyes"], 
            
            Cell:({renderedCellValue})=><b>{renderedCellValue}</b>,

        },
        {
            accessorKey:"type",
            header:"Type",
            enableSorting:false,
        
            filterFn: 'equals',
            filterSelectOptions: ['Facture', 'Proforma'],
            filterVariant: 'select',
            Cell:({renderedCellValue})=>{

                const color=renderedCellValue=="Facture" ? "text-green-700 border-green-700":"text-amber-700 border-amber-700";


                return <span  className={`bg-gray-200  font-bold rounded px-4 py-1 border ${color}`}>
                    {renderedCellValue}
                    </span>
            }

             
                    
           

        },
        {
            accessorKey:"net_a_payer",
            header:"Montant",
            enableColumnActions:false,
            enableSorting:false,
            Cell:({cell})=><div>{formatMontant(cell.getValue<string>())} DA</div>

        },
        {
            accessorKey:"vente",
            header:"Vente"
        

        },
    ],[]);
  

    const table=useMaterialReactTable({
        data,
        columns,
        localization:MRT_Localization_FR,
        enableColumnActions:false,
        enableRowActions: true,
        positionActionsColumn:"last",
        initialState: { 
            
            columnVisibility:{
                numero:false,
                vente:false
            }
        
        
        },
        
       
        muiTableHeadCellProps: () => ({
                
        align:"center",
        sx:{background:"#E0E7FF"}
        
        
        }),
        muiTableBodyCellProps: ()=>({align:"center",}),
        renderRowActionMenuItems: ({ row }) => [
            <MenuItem key="edit" onClick={() => {
                setOpenFacture(true)
               
            }}>
              <div className="flex gap-2 items-center">
                <VisibilityIcon color="primary"/>
                <div>Aperçu</div>
              </div>
            </MenuItem>,
            <MenuItem key="delete" onClick={() => navigate(`/ventes/modifier/${row.original.vente.numero}`)}>
              <div className="flex gap-2 items-center">
                <LocalGroceryStoreIcon color="secondary"/>
                <div>Vente</div>
              </div>
            </MenuItem>,
          ],
      
      
    });

    return {table,isLoading}
}