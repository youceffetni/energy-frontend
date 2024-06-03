
import {  Grid, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatMontant } from '@/helpers';
import { DesignationInterface } from '@/Interfaces/ventes';
import { useVente } from '@/Providers/VenteProvider';


interface IProps{
  articleVendu:DesignationInterface;
  designations:DesignationInterface[];
  index:number
}

function Designation({articleVendu,designations,index}:IProps){
  
  const {vente,setVente}=useVente();
  const handleRemove = (ref:string)=>{

  const filtredDesignations=designations.filter((item:DesignationInterface)=>item.ref!=ref )

  
      setVente({...vente,designations:filtredDesignations})
  } 


 
  return (
   

          <Grid container alignItems="center" className='p-1 shadow bg-gray-50  font-bold text-center border border-gray-300 rounded'>
                <Grid item xs={1}>
                <span>{index}</span>
                </Grid>
                <Grid item xs={4}>
                  <span>{articleVendu.nom}</span>
                </Grid>
                <Grid item xs={2}>
                    <span>{formatMontant(articleVendu.prix)}</span>
                </Grid>
                <Grid item xs={1}>
                    <span>{articleVendu.unite}</span>
                </Grid>
                <Grid item xs={1}>
                    <span>{articleVendu.Qt}</span>
                </Grid>
                <Grid item xs={2}>
                    {<span>{formatMontant(articleVendu.montant)}</span> }
                </Grid>
                 <Grid item xs={1}>
                    <IconButton onClick={()=>handleRemove(articleVendu.ref)}>
                        <DeleteIcon color='error' />
                    </IconButton>
                </Grid> 
          </Grid>
 
  
  )
}

export default Designation;