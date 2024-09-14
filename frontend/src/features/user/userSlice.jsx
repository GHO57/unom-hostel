import { createSlice } from "@reduxjs/toolkit";
import {
    login,
    logoutuser,
} from './userThunks'

const initialState = {
    user: {},
    loading: false,
    loadingLogin: false,
    isAuthenticated: false,
    isLoggingIn: false,
    message: null,
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearUserMessage: (state) => {
            state.message = null;
        },
        
        clearUserError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            

            //login pending
            .addCase(login.pending, (state) => {
                return{
                    ...state,
                    loading: false,
                    loadingLogin: true,
                    isAuthenticated: false,
                    isLoggingIn: false,
                    newUser: false,
                    message: null,
                    error: null
                }
            })

            //login fulfilled
            .addCase(login.fulfilled, (state, action) => {
                    return{
                        ...state,
                        loading: false,
                        loadingLogin: false,
                        isAuthenticated: true,
                        isLoggingIn: true,
                        user: action.payload.user,
                        message: `Welcome ${action.payload.user[0].fullname}`,
                        error: null
                    }
            })

            //login rejected
            .addCase(login.rejected, (state, action) => {
                return{
                    ...state,
                    loading: false,
                    loadingLogin: false,
                    isAuthenticated: false,
                    error: action.payload
                }
            })


            //logoutuser pending
            .addCase(logoutuser.pending, (state) => {
                return{
                    ...state, 
                    loading: true,
                    loadingLogin:false, 
                    isAuthenticated: true,
                    newUser: false,
                    message: null,
                    error: null
                }
            })

            //logoutuser fulfilled
            .addCase(logoutuser.fulfilled, (state, action) => {
                return{
                    ...state, 
                    loading: false,
                    loadingLogin: false,
                    isAuthenticated: false,
                    newUser: false,
                    user: null,
                    message: action.payload.message,
                    error: null,
                }
            })
            
            //logoutuser rejected
            .addCase(logoutuser.rejected, (state, action) => {
                return{
                    ...state, 
                    loading: false,
                    loadingLogin: false,
                    isAuthenticated: true,
                    newUser: false,
                    error: action.payload
                }
            })
    } 
})


export const { clearUserMessage, clearUserError } = userSlice.actions;
export default userSlice.reducer

