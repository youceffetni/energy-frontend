import { Grid } from '@mui/material';


export default function Head(){

  return (
    <Grid container className='text-center bg-gray-200 p-1'>
                    <Grid item xs={1}>
                        <h1 className='text-gray-950 font-bold '>Référence</h1>
                    </Grid>
                    <Grid item xs={4}>
                        <h1 className='text-gray-950 font-bold '>Désgination</h1>
                    </Grid>
                    <Grid item xs={2}>
                        <h1 className='text-gray-950 font-bold '>Prix unitaire</h1>
                    </Grid>
                    <Grid item xs={1}>
                        <h1 className='text-gray-950 font-bold '>Unité</h1>
                    </Grid>
                    <Grid item xs={1}>
                        <h1 className='text-gray-950 font-bold '>Qunatité</h1>
                    </Grid>
                    <Grid item xs={2}>
                        <h1 className='text-gray-950 font-bold '>Mantant</h1>
                    </Grid>
                
    </Grid>
  )
}
