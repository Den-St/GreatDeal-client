import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserI } from "../types/user.type";

const initialState:UserI = {
    email:null,
    createdAt:null,
    displayName:null,
    photoURL:null,  
    id:null,
    lastLocation:null,
    balance:0
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser(state,payload:PayloadAction<UserI>){
            state.email = payload?.payload.email;
            state.createdAt = payload?.payload.createdAt;
            state.displayName = payload?.payload.displayName;
            state.photoURL = payload?.payload.photoURL;
            state.id = payload?.payload.id;
            state.lastLocation = payload.payload.lastLocation;
            state.balance = payload.payload.balance;
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;