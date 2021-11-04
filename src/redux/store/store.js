import {configureStore} from '@reduxjs/toolkit'
import userslice from '../user/userslice'
import Dataslice from '../user/Dataslice'
export default configureStore({
    reducer:{
        user: userslice,
        data: Dataslice
    }
})