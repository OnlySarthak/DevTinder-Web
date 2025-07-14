import { createSlice } from "@reduxjs/toolkit";

const userRequests = createSlice({
    name : 'requests',
    initialState: [],
    reducers:{
        addRequests : (state, action)=>{
            return action.payload;
        },
        removeRequests : (state, action)=>{
            return null;    
        }
    }
});

export const { addRequests, removeRequests } = userRequests.actions;
export default userRequests.reducer;