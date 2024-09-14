import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
//login

export const login = createAsyncThunk("user/login", async(form, thunkAPI) => {
    try{
        const config = { headers : { "Content-Type" : "application/json" }};
        const { data } = await axios.post('/api/v1/user/login', form, config)

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})


//logout
export const logoutuser = createAsyncThunk("user/logout", async(thunkAPI) => {
    try{
        const { data } = await axios.post('/api/v1/user/logout')

        return data
    }catch(error){
        if(error.response){
            return thunkAPI.rejectWithValue(error.response.data)
        }else{
            return thunkAPI.rejectWithValue({ message: error.message })
        }
    }
})     