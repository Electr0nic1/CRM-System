import { createSlice } from '@reduxjs/toolkit'

const initialState = { isAuth: false }

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isAuth = true
    },
    logout(state) {
      state.isAuth = false
    }
  }
})

export default AuthSlice.reducer
export const authActions = AuthSlice.actions