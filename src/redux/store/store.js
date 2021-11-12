import {configureStore} from '@reduxjs/toolkit'
import LoginSlice from '../user/LoginSlice'
import Dataslice from '../user/Dataslice'
import FormSlice from '../user/FormSlice'
export default configureStore({
    reducer:{
        Login: LoginSlice,
        data: Dataslice,
        Form: FormSlice,

    }
})