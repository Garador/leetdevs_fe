import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user_slice',
    initialState: {
      user: null,
    },
    reducers: {
      setUser: (state, action:any) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.user = action.payload;
      }
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUser } = userSlice.actions
  
  export default userSlice.reducer
  