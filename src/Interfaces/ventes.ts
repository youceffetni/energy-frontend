import { UserInterface } from "./UsersInterfaces"; 
import { clientInterface } from "./clients";
import { FactureInterface } from "./factures";

export interface DesignationInterface{
    ref:string;
    Qt:string;
    prix:string;
    nom:string;
    unite:string;
    montant:string;

}

export interface VenteInterfce{
    edit:boolean;
    brouillon?:boolean|null;
    numero?:string;
    numero_vente?:string|null;
    date:string;
    remise:string;
    mode_paiement:string;
    client_id:number|null;
    designations:DesignationInterface[];
    montant_total_a_payer:string;
    notes:string;
    factures?:FactureInterface[]
    
}

export interface VenteFooterInterface{
    montant_total:number;
    mode_paiement:string;
    remise:string;
    montant_total_avec_remise:number;
    tva:number;
    montantTotalTTC:number;
    timbreMontant:number;
    montant_total_a_payer:number;

}

export interface VenteProviderInterfce{
    vente:VenteInterfce,
    setVente:(vente:VenteInterfce)=>void,
    saved:boolean;
    venteFooter:VenteFooterInterface;
    resetVente:()=>void;
    storedVente:VenteInterfce;
    _setSaved:(val:boolean)=>void
}


export interface VentesTableInterface{
        numero:string;
        numero_vente: string;
        date: string;
        client: clientInterface;
        montant_total_a_payer: string;
        user: UserInterface;
}