import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Slice/userSlice'
import tutorRedcer from './Slice/tutorSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        tutor:tutorRedcer
        
    }
})
