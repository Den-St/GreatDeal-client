import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserI } from "../types/user.type";

const initialState:UserI = {
    email:null,
    createdAt:null,
    displayName:null,
    photoURL:null,    
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
        }
    }
});

export const {setUser} = userSlice.actions;
export default userSlice.reducer;