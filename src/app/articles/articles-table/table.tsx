import { articleType } from "@/Interfaces";
import { useMaterialReactTable } from "material-react-table";
import { MRT_Localization_FR } from "material-react-table/locales/fr";
import { useState } from "react";
import { useAppDispatch } from "@/redux/store";
import { handleDialogOpen } from "@/redux/features/dialogSlice";
import {Grid} from "@mui/material";

import { MRT_ColumnDef, MRT_Row } from "material-react-table";
import { useMemo } from "react";
import { formatMontant } from "@/helpers";

const media=window.matchMedia('(max-width: 768px)');
function getColumnsArticles(){


  return useMemo<MRT_ColumnDef<articleType>[]>(()=>[
    {
        accessorKey:"ref",
        header:"Référence"
      },
      {
        accessorKey:"nom",
        header:"Article",
        Cell:({renderedCellValue})=><b className="text-slate-950">{renderedCellValue}</b>
      },
      {
        accessorKey:"prix",
        header:"Prix",
        Cell:({cell})=><div>{formatMontant(cell.getValue<string>())} DA</div>
      },
      {
        accessorKey:"unite",
        header:"Unité"
       
      },
      {
        accessorKey:"quantite_stock",
        header:"Stock",
        Cell:({renderedCellValue})=><span 
                                          className="bg-gray-300 p-1 min-w-6 h-6 rounded inline-flex items-center justify-center text-green-600 border border-green-600 font-bold"
                                    >

                                          {renderedCellValue}
                                    </span>
      },
      {
        accessorKey:"quantite_min_stock",
        header:"Stock min",
        Cell:({renderedCellValue})=><div className="bg-gray-300 p-1 min-w-6 h-6 rounded inline-flex items-center justify-center text-orange-600 border border-orange-600  font-bold">

                                          {renderedCellValue}
                                    </div>
      },
      {
        accessorKey:"description",
        header:"Description"
      },
      {
        accessorKey:"created_at",
        header:"Date de creation"
      },
      {
        accessorKey:"updated_at",
        header:"Date de la dernière mise à jour"
      }
],[]);
} 


 function detailArticlePanel({row}:{row:MRT_Row<articleType>}){
  return (
    <div className="flex-col px-3" >
        {media.matches &&
          <Grid container  sx={{mb:1}} spacing={1}>  
              <Grid item xs={12} md={6}>
                <b>Référence :</b>{row.original.ref}

              </Grid>
              <Grid item xs={12} md={6}>
                <b>Prix unitaire  :</b>{row.original.prix}DA.

              </Grid>
              <Grid item xs={12} md={6}>
                <b>La quantite d'article dans le stock :</b><span className="text-green-700 font-bold">{row.original.quantite_stock}</span>

              </Grid>
              <Grid item xs={12} md={6}>
                <b>La quantite minimale d'article dans le stock :</b><span className="text-orange-600 font-bold">{row.original.quantite_min_stock}</span>

              </Grid>
          </Grid>}
        <Grid container spacing={1}>  
          <Grid  item xs={12} >
            <b>Unité de mesure :</b> {row.original.unite}.
          </Grid>
         {row.original.description && <Grid item xs={12}>
            <b>Description :</b> {row.original.description}.
          </Grid> } 
         
          <Grid  item xs={12} md={6}><b>Data de création cet article :</b> {row.original.created_at}.</Grid>
          <Grid  item xs={12} md={6}><b>Dernière date de mise a jour:</b> {row.original.updated_at}.</Grid>
      
      </Grid>
    </div>);

}

export function table(data:articleType[]){


    const dispatch=useAppDispatch();
    const [articleToEdit,setArticleToEdit]=useState<articleType>({
        ref:"",
        nom:"",
        prix:0,
        description:"",
        unite:"",
        quantite_stock:0,
        quantite_min_stock:0,
        created_at:"",
        updated_at:""
      });

      const articleTable=useMaterialReactTable({
        columns:getColumnsArticles(),
        data, 
        localization:MRT_Localization_FR,
        enableRowSelection: true, 
        getRowId: (originalRow) => originalRow.ref,
        enableSorting:false,
        enableColumnActions:false,
        renderDetailPanel:detailArticlePanel,
        muiTableBodyRowProps:{
         
          sx: {
            cursor: 'pointer',
          },
        },
    
      
      muiTableBodyProps:{sx: {'& tr > td': {backgroundColor: '#fff',},},},
      muiTableBodyCellProps: ({row})=>({
        onClick: () => {
            setArticleToEdit(row?.original);
            dispatch(handleDialogOpen("articleUpdate"));
          
        },
        align:"center"
      }),
      
      
      muiDetailPanelProps:()=>({sx:{background:"#fef2f2 !important",}}),
       muiPaginationProps: {
        variant: 'outlined',
        showRowsPerPage:false,
        shape:"rounded",
        
      },
      paginationDisplayMode: 'pages',
      
      initialState: { 
        pagination:{pageIndex: 0,pageSize: 10,}, 
        showGlobalFilter: true,
        columnVisibility:{description:false,unite:false,created_at:false,updated_at:false ,...(media.matches ?{ref:false,prix:false,quantite_min_stock:false,quantite_stock:false}:{})} 
        },
        muiTableHeadCellProps: () => ({
           
          align:"center",
          sx:{background:"#E0E7FF"}
    
          
        }),
    });
      
    return {articleTable,articleToEdit};
    
}