import {configureStore} from '@reduxjs/toolkit'
import userslice from '../user/userslice'
export default configureStore({
    reducer:{
        user: userslice
    }
})