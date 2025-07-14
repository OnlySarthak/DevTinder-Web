import { createSlice } from "@reduxjs/toolkit";

const userConnections = createSlice({
    name : 'connections',
    initialState: [],
    reducers:{
        addConnections : (state, action)=>{
            return action.payload;
        },
        removeConnections : (state, action)=>{
            return null;    
        }
    }
});

export const { addConnections, removeConnections } = userConnections.actions;
export default userConnections.reducer;