import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const tutorLogin = createAsyncThunk('logintutor', async (usercred, thunkApi) => {
  try {
    const response = await axios.post('http://localhost:4000/tutor-api/tutorlogin', usercred);
    const data = response.data;
    
    if (data.message === 'login success') {
      localStorage.setItem("tutortoken", data.payload);
      return data.userObj;
    }

    if (data.message === "Invalid username" || data.message === "Invalid password") {
      return thunkApi.rejectWithValue(data);
    }
  } catch (error) {
    return thunkApi.rejectWithValue(error.response.data);
  }
});

export const updateTutor = createAsyncThunk('updatetutor', async (formData) => {
  try {
    const response = await axios.post(`http://localhost:4000/tutor-api/update-tutor/${formData.username}`, formData);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
});
export const addavailabilityexperience = createAsyncThunk('add-availability-experience', async (formData) => {
  try {
    const response = await axios.post(`http://localhost:4000/tutor-api/add-availability-experience/${formData.username}`, formData);
    return response.data.payload;
  } catch (error) {
    throw error;
  }
});

let tutorSlice = createSlice({
  name: 'tutor',
  initialState: {
    tutorobj: {},
    isError: false,
    isSuccesstutor: false,
    isLoading: false,
    errMsg: '',
  },
  reducers: {
    cleartutorLoginStatus: (state) => {
      state.isSuccesstutor = false;
      state.tutorobj = {};
      state.isError = false;
      state.errMsg = '';
    },
  },
  extraReducers: {
    [tutorLogin.pending]: (state) => {
      state.isLoading = true;
    },
    [tutorLogin.fulfilled]: (state, action) => {
      state.tutorobj = action.payload;
      state.isLoading = false;
      state.isError = false;
      state.isSuccesstutor = true;
      state.errMsg = "";
    },
    [tutorLogin.rejected]: (state, action) => {
      state.isError = true;
      state.isLoading = false;
      state.isSuccesstutor = false;
      state.errMsg = action.payload.message;
    },
    [updateTutor.fulfilled]: (state, action) => {
      state.tutorobj = action.payload;
    },
    [addavailabilityexperience.fulfilled]: (state, action) => {
      state.tutorobj = action.payload;
    },
  },
});

export const { cleartutorLoginStatus } = tutorSlice.actions;
export default tutorSlice.reducer;
