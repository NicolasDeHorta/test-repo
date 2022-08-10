import { configureStore } from "@reduxjs/toolkit";
import  exitReducer  from "../Features/ExitSlice";
//import { coinSlice } from "../Features/coinSlice";

export const store = configureStore({
    reducer:{
         //coins: coinsReducer
         exit:exitReducer,       
        
    }
})
