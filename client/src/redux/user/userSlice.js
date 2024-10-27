import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateProfilePicture: (state, action) => {
            if (state.currentUser) {
                state.currentUser.profilePicture = action.payload;
            }
        },
    },
});


export const { signInStart, signInSuccess, signInFailure, updateProfilePicture } = userSlice.actions;
export default userSlice.reducer;