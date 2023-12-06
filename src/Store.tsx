import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Reducers/TodoSlice";

export const store=configureStore({
    reducer:{
        app:todoReducer,
    }
});
 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch


