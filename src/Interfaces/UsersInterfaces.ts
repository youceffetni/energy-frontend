export interface UserInterface{
    id:number;
    name:string;
    email:string;
    role:number|string;
    password?:string;
    password_confirmation?:string;
}