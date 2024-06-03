
import {  Stack } from "@mui/material";
import { Create } from "./Create";
import ArticlesTable from "./articles-table/index";

import { selectDialog } from "@/redux/features/dialogSlice";

import TableSkelton from "@/components/Ui/TableSkelton";

import { useSelector } from "react-redux";
import { fetchArticles } from "./articles-api/index";
import Delete from "./Delete";
import { table } from "./articles-table/table";
import Edit from "./Edit";
import { useEffect } from "react";





export default function index(){

  const {refetchApi}=useSelector(selectDialog)
  const {data=[],isLoading}=fetchArticles(["articlesTable",refetchApi])


  const {articleTable,articleToEdit} = table(data);

  useEffect(()=>{
    document.title="Articles"
  },[]);
 
  return (
    
        <div>
          
          <h1 className="text-xl md:text-3xl my-4 font-extrabold">Articles</h1>              
            <Create/>  
            <Delete articles={articleTable.getSelectedRowModel()?.rows}/> 
            <Edit article={articleToEdit}/> 

            { isLoading &&  <Stack direction="row" justifyContent="center"><TableSkelton/></Stack>} 
            {!isLoading && <ArticlesTable  table={articleTable}/>}

        </div>
      

  );
}



