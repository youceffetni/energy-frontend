import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface themeState {
  doDark:boolean,
 
}


let doDark :boolean=  true;

if(localStorage.getItem("doDark") !== null)
    doDark=JSON.parse(localStorage.getItem("doDark") as string) 
else
    localStorage.setItem("doDark","true")

const initialState: themeState = {
  doDark
 
}

export const themeSlice=createSlice({
    name:"theme",
    initialState,
    reducers:{
        toggleMode:(state,payload:PayloadAction<boolean>)=>{
            
            localStorage.setItem("doDark",`${payload.payload}`)
            return {
                ...state,
                   doDark:payload.payload,  
            }
            
        }
    }

});

export const {toggleMode}=themeSlice.actions;

export const selectTheme = ({theme}: RootState) => theme
export const themeReducer =themeSlice.reducer