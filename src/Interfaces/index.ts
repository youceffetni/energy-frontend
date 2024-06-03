import { Dayjs } from "dayjs";
import { ReactElement } from "react";
import { clientInterface } from "./clients";



export type childItem={

    label:string,
    path:string
};

export interface typeMenuItem{
    label:string;
    path:string;
    icon:ReactElement<any, any>;
    children:childItem[];
}

























export type userType={
    id: number,
    name: string,
    email: string,
    email_verified_at: string| null,
    created_at: string|null,
    updated_at: string|null
}

export  type articleType = {
    ref:string;
    nom:string;
    prix:number|null,
    description:string;
    unite:string;
    quantite_stock:number;
    quantite_min_stock:number|null;
    created_at:string;
    updated_at:string;
} 




/* VENTES */

export type articleVenduType={
    ref:string;
    nom:string;
    unite:string;
    prix:string;
    Qt:string;
    montant:number;
}

export type venteType={
    client:clientInterface|null;
    date:Dayjs|null;
    modePaiement:"0"|"1"|"2"|"3";
    designations:articleVenduType[];
    notes:string;
    remise:string;

}

export type venteTableType={
    id_vente:number;
    date:string;
    client:clientInterface;
    total_to_pay:string;
    user:userType;
}

/* END VENTES */



