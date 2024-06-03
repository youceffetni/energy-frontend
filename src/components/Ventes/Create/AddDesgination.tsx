import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Autocomplete, TextField } from '@mui/material';
import { articleType } from '@/Interfaces';

import * as React from "react"
import { fetchArticles } from '@/app/articles/articles-api';

import { enqueueSnackbar } from 'notistack';
import { useVente } from '@/Providers/VenteProvider';
import { DesignationInterface } from '@/Interfaces/ventes';




export default function AddDesgination() {

    const { data = [] } = fetchArticles(['articles-vente']);

    const [article, setArticle] = React.useState<articleType | null>(null)
    const [prix, setPrix] = React.useState("00.00")
    const [Qt, setQt] = React.useState("0");

    const {vente,vente:{designations},setVente}=useVente();

    const handleArticleChange = (_:any, newArticle: articleType | null) => {
        
        setPrix( newArticle!=null ? `${newArticle.prix}`: "00.00");
        setArticle(newArticle);
        setQt(newArticle!=null? "1":"0");
    }


    const handleAddDesgintation = () => {


        if (article != null && ! designations?.find((item) => item.ref === article.ref)) {

            if(!(article.quantite_stock < parseInt(Qt))){
                    const montant = parseFloat(prix) * parseInt(Qt);

                    const newDesignation:DesignationInterface={
                        ref: article.ref,
                        nom: article.nom,
                        unite: article.unite,
                        prix,
                        Qt,
                        montant:`${montant}`
                    }
                     
                     setVente({   ...vente,designations:[...designations, newDesignation],}
                    )
                   


                    setPrix("00.00")
                    setArticle(null)
                    setQt("0"); 
            }
            else{
                enqueueSnackbar(`Vous n'avez que ${article.quantite_stock} quantités de cet article`, { variant: "default", autoHideDuration: 5000 });
            }

        }


        else {
            enqueueSnackbar(`Cet article a déjà été sélectionné`, { variant: "default", autoHideDuration: 3000 });
        }


    }


    return (
        <div  className='flex flex-col gap-3 lg:flex-row lg:items-center  lg:justify-between py-4 px-2 shadow bg-gray-50 border border-slate-400 rounded font-bold text-center' >

            <div className='flex-grow lg:w-[70%]'>
                <Autocomplete
                    value={article}
                    onChange={handleArticleChange}
                    options={data}
                    getOptionLabel={(option: articleType) => `${option.nom}`}
                    isOptionEqualToValue={(option: articleType, value) => option.ref === value.ref}
                    fullWidth
                    disablePortal
                    id="combo-box-demo"
                    sx={{ width: "100%" }}
                    renderInput={(params) => <TextField {...params} label="Selectionner un article" />}
                />
            </div>


            <div>

                <TextField
                    value={prix}
                    onChange={(event) => setPrix(event.target.value)}
                    id="outlined-basic"
                    label="Prix unitare"
                    variant="outlined"
                    type="number"
                />

            </div>

            <div>
                <TextField
                    id="outlined-basic"
                    label="Qunatité"
                    value={Qt}
                    onChange={(event) => {
                        if (parseInt(event.target.value) <= 0)
                            setQt("1")
                        else
                            setQt(event.target.value)
                            
                    }}
                    variant="outlined"
                    type="number"
                />
            </div>

            <div>
                <Button color="success" variant='contained'  onClick={handleAddDesgintation}   disabled={article == null || prix <= "00.00" || Qt <= "0"}>
                    <AddIcon />
                </Button>
            </div>
        </div>
    )
}
