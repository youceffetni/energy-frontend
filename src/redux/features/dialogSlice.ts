
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface dialogState {
    refetchApi:number,  
    articleCreate:boolean;
    articleUpdate:boolean;
    articleDelete:boolean;

    clientCreate:boolean;
    clientUpdate:boolean;
    clientDelete:boolean;

    userCreate:boolean;
    userUpdate:boolean;
    userDelete:boolean;

    factureOverview:boolean,
    
    venteDelete:boolean;

    factureShow:boolean;
     
    
}



const initialState: dialogState = {
            refetchApi:0,

            articleCreate:false,
            articleUpdate:false,
            articleDelete:false,

            clientCreate:false,
            clientUpdate:false,
            clientDelete:false,

            userCreate:false,
            userUpdate:false,
            userDelete:false,

            venteDelete:false,
            
            factureOverview:false,
            factureShow:false,
        

}


export type dialogeName=keyof dialogState;

export const dialogSlice=createSlice({
    name:"dialog",
    initialState,
    reducers:{
        handleDialogOpen:(state,payload:PayloadAction<dialogeName>)=>{

            return {
                ...state,
                [payload.payload]:true
            }
        },
        handleDialogClose:(state,payload:PayloadAction<dialogeName>)=>{
            return {...state,[payload.payload]:false}
        },
        handleRefetch:(state)=>{
            return {...state,refetchApi:state.refetchApi+1}
        }

    }

});

        
export const {handleDialogOpen,handleRefetch,handleDialogClose}=dialogSlice.actions;

export const selectDialog = ({dialog}: RootState) =>dialog
export const dialogReducer =dialogSlice.reducer