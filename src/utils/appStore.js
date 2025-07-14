import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionReducer from "./userConnections";


const appStore = configureStore({
    reducer :{
        user: userReducer,
        connections : connectionReducer
    },
})

export default appStore;