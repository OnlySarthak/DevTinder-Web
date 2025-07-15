import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import connectionReducer from "./userConnections";
import reqquestReducers from "./userRequests";
import feedReducer from "./userFeed";

const appStore = configureStore({
    reducer :{
        user: userReducer,
        connections : connectionReducer,
        requests : reqquestReducers,
        feed : feedReducer
    },
})

export default appStore;