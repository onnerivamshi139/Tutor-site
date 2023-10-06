import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import userdashboard from "../userdashboard/userdashboard";

//make http post req to login user

export const userLogin=createAsyncThunk('loginuser',async(usercred,thunkApi)=>{
    let response=await axios.post('http://localhost:4000/user-api/login',usercred);
    let data=response.data;
    
    
    // let navigate=useNavigate();
    if(data.message=='login success')
    {
        //local storage token
        localStorage.setItem("token",data.payload)
        // navigate('/userdashboard')
        return data.userObj;
        
    }
    else if(data.status===200)
    {
        alert("Invalid details")
    }
    
    if(data.message=="Invalid username" || data.message=="Invalid password"){
        
        return thunkApi.rejectWithValue(data); 

    }
});

export const updateuser = createAsyncThunk('updateuser', async (formData) => {
    try {
      const response = await axios.post(`http://localhost:4000/user-api/update-user/${formData.username}`, formData);
      return response.data.payload;
    } catch (error) {
      throw error;
    }
  });

let userSlice=createSlice({
    name:'user',
    initialState:{
        userobj:{},
        isError:false,
        isSuccess:false,
        isLoading:false,
        errMsg:''
    },
    reducers:{
        clearLoginStatus:(state)=>{
            // console.log("he;;       ")
            state.isSuccess=false;
            state.userobj=null;
            state.isError=false;
            state.errMsg='';
            // console.log(state)
            return state;
        }
    },
    extraReducers:{

        //  track life cycle promise returned by createasyncTHunk function
        [userLogin.pending]:(state,action)=>{
            state.isLoading=true;
        },

        [userLogin.fulfilled]:(state,action)=>{
            state.userobj=action.payload;
            state.isLoading=false;
            state.isError=false;
            state.isSuccess=true;
            state.errMsg="b"
        },
        [userLogin.rejected]:(state,action)=>{
            state.isError=true;
            state.isLoading=false;
            state.isSuccess=false;
            state.errMsg='error occured'
        },
        [updateuser.fulfilled]: (state, action) => {
            state.userobj = action.payload;
          },
    }
})

export const {clearLoginStatus}=userSlice.actions;
export default userSlice.reducer;