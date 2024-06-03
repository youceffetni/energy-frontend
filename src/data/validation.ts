export const articleValidation ={
    ref:{
        required:"Svp ,taper la référence .",
        maxLength:{
            value:255,
            message:"la référence ne dépasse pas 255 caractères ."

        }
    },
    nom:{
        required:"Svp ,taper la désignation.",
        maxLength:{
            value:255,
            message:"la désignation ne dépasse pas 255 caractères"

        }
    },
    prix:{
        required:"Svp ,taper le prix unitaire.",
        min:{
            value:1,
            message:"Vous ne pouvez pas mettre le prix à zéro."
        },
        pattern:{
            value:/^\d*\.?\d*$/,
            message:"Svp ,taper un prix valide"

        }
        
    },
    
    quantite_stock:{
        required:"Svp taper la qunatité d'article dans le stocke.",
        pattern:{
            value:/^\d+$/,
            message:"la quantité d'article doit être un entier positif par exemple 15 ,0 ou 5"
        }

    },
    quantite_min_stock:{
        required:"Svp taper la qunatité minmale d'article dans le stocke.",
        pattern:{
            value:/^\d+$/,
            message:"la quantité minimale d'article doit être un entier positif par exemple 15 ,0 ou 5"
        }

    },
    
    

}


export const clientValidation={

    nom:{
        required:"Svp ,taper le nom du client.",
        maxLength:{
            value:255,
            message:"le nom du client ne dépasse pas 255 caractères"
        }
    },
    email:{
    
        pattern:{
         value:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
         message:"Svp ,Taper un email valide ."
        }
     },
     adresse:{
    
        
     },
    tel1:{
    
        pattern:{
         value:/^0\d{9}$/,
         message:"Numéro de téléphone incorrect ."
        }
     },
     tel2:{
    
        pattern:{
         value:/^0\d{9}$/,
         message:"Numéro de téléphone incorrect ."
        }
     },
     web_site:{
    
       
     },
     NIF:{
    
        
     },
     NIS:{
    
       
     },
     NRC:{
    
        
     },
     NAI:{
    
        
     },
     RIB:{

     },

     activite:{

     }
}



