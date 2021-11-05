import {configureStore} from '@reduxjs/toolkit'
import userslice from '../user/userslice'
import Dataslice from '../user/Dataslice'
import FormSlice from '../user/FormSlice'
export default configureStore({
    reducer:{
        user: userslice,
        data: Dataslice,
        Form: FormSlice,

    }
})