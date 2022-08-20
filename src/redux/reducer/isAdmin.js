import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAdmin: false,
}

export const adminSlice = createSlice({
  name: 'isAdmin',
  initialState,
  reducers: {
    
    updateIsAdmin: (state, action) => {
      state.isAdmin = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateIsAdmin } = adminSlice.actions

export default adminSlice.reducer