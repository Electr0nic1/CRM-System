import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface AuthState {
  accessToken: string | null
}
const initialState: AuthState = { accessToken: null }

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken
    },
    removeAccessToken(state) {
      state.accessToken = null
    }
  }
})

export default AuthSlice.reducer
export const authActions = AuthSlice.actions