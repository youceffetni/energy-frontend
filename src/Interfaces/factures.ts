import { UserInterface } from "./UsersInterfaces";
import { clientInterface } from "./clients";
import { DesignationInterface, VenteInterfce } from "./ventes";

export interface FactureInterface{
    numero?:string;
    numero_facture?:string;
    date_facturation:string;
    etat :number;
    type :string;
    montant :string;
    montant_remise :string;
    tva :string;
    ttc :string;
    timbre :string;
    net_a_payer :string;
    designations:DesignationInterface[]
    client? :clientInterface;
    vente? :VenteInterfce;
    user?:UserInterface;
    
}

export interface FactureDataTableInterface{
    numero_facture:string;
    date_facturation:string;
    type:string;
    vente:VenteInterfce;
}

export type FactureOverViewInterface=FactureInterface|null;