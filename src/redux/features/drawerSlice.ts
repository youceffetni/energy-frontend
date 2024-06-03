
import { createSlice} from '@reduxjs/toolkit'
import type { RootState } from '../store'


export interface drawerState {
    mobileOpen:boolean,
    isClosing:boolean,
    width:number
 
}



const initialState: drawerState = {
    mobileOpen:false,
    isClosing:false,
    width:290

}

export const drawerSlice=createSlice({
    name:"drawer",
    initialState,
    reducers:{
        handleDrawerClose:(state)=>{
            return {
                ...state,
                isClosing:true,
                mobileOpen:false
            }
          
            
        },
        handleDrawerTransitionEnd:(state)=>{
            return {
                ...state,
                isClosing:false,
                
            }
        },
        handleDrawerToggle:(state)=>{
            console.log("cliceeeek")
            if (!state.mobileOpen) 
                return {
                    ...state,
                    mobileOpen:!state.mobileOpen
                }
        
        }
    }

});

export const {
    handleDrawerClose,
    handleDrawerTransitionEnd,
    handleDrawerToggle}=drawerSlice.actions;

export const selectDrawer = ({drawer}: RootState) => drawer
export const drawerReducer =drawerSlice.reducer