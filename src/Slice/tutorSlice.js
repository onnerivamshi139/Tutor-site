import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userdashboard from "../userdashboard/userdashboard";

//make http post req to login user

export const tutorLogin=createAsyncThunk('logintutor',async(usercred,thunkApi)=>{
    let response=await axios.post('http://localhost:4000/tutor-api/tutorlogin',usercred);
    let data=response.data;
    console.log(data);
    
    // let navigate=useNavigate();
    if(data.message==='login success')
    {
        //local storage token
        localStorage.setItem("tutortoken",data.payload)
        // navigate('/userdashboard') 
        return data.userObj;
        
    }
    if(data.message==="Invalid username" || data.message==="Invalid password"){
        return thunkApi.rejectWithValue(data); 

    }
})

let tutorSlice=createSlice({
    name:'tutor',
    initialState:{
        tutorobj:{},
        isError:false,
        isSuccesstutor:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        cleartutorLoginStatus:(state)=>{
            // console.log("he;;       ")
            state.isSuccesstutor=false;
            state.tutorobj=null;
            state.isError=false;
            state.errMsg='';
            // console.log(state)
            return state;
        }
    },
    extraReducers:{

        //  track life cycle promise returned by createasyncTHunk function
        [tutorLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },

        [tutorLogin.fulfilled]:(state,action)=>{
            state.tutorobj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccesstutor=true;
            state.errMsg="b"
        },
        [tutorLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccesstutor=false;
            state.errMsg='error occured'
        }
    }
})

export const {cleartutorLoginStatus}=tutorSlice.actions;
export default tutorSlice.reducer;