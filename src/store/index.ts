import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './auth.ts'

const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>;