import { createSlice } from "@reduxjs/toolkit";

const userFeed = createSlice({
    name : 'feed',
    initialState: [],
    reducers:{
        addFeed : (state, action)=>{
            return action.payload;
        },
        removeFeed : (state, action)=>{
            const newFeed = state.filter((state)=>state._id != action.payload);
            return newFeed;    
        }
    }
});

export const { addFeed, removeFeed } = userFeed.actions;
export default userFeed.reducer;