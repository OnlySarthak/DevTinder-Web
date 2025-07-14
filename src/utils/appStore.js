import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionReducer from "./userConnections";
import reqquestReducers from "./userRequests";

const appStore = configureStore({
    reducer :{
        user: userReducer,
        connections : connectionReducer,
        requests : reqquestReducers
    },
})

export default appStore;