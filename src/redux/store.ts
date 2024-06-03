
import { configureStore } from '@reduxjs/toolkit'
import {themeReducer} from "./features/themeSlice"
import { useDispatch } from 'react-redux'
import { drawerReducer } from './features/drawerSlice'
import { dialogReducer } from './features/dialogSlice'


 const store = configureStore({
    reducer: {
        theme:themeReducer,
        drawer:drawerReducer,
        dialog:dialogReducer
    
    }
  })
  
// Infer the `RootState` and `AppDispatch` types from the store itself
  export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  export type AppDispatch = typeof store.dispatch

  export const useAppDispatch:()=>AppDispatch=useDispatch;
  export default store;