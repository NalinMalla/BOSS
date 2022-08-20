import { configureStore } from '@reduxjs/toolkit'
import isAdmin from './reducer/isAdmin'

export const store = configureStore({
  reducer: {
    isAdmin: isAdmin,    //here, isAdmin is used to access the data
  },
})