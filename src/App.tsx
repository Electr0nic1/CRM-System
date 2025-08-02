import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import AppLayout from "./layout/AppLayout/AppLayout.tsx";
import AuthLayout from "./layout/AuthLayout/AuthLayout.tsx";
import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import ErrorPage from "./pages/Error/Error.tsx";
import SignInPage, {action as authAction} from "./pages/SignInPage/SignInPage.tsx";
import SignUpPage, {action as regAction} from "./pages/SignUpPage/SignUpPage.tsx";

import { checkAuthLoader } from "./helpers/auth.ts";
import store from "./store/index.ts";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<AppLayout />} loader={checkAuthLoader} errorElement={<ErrorPage />}>
          <Route index element={<TodoListPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="auth" element={<AuthLayout />} errorElement={<ErrorPage />}>
          <Route path="signin" element={<SignInPage />} action={authAction}/>
          <Route path="signup" element={<SignUpPage />} action={regAction}/>
        </Route>
      </>
    )
  )
  return <Provider store={store}><RouterProvider router={router} /></Provider>;
}

export default App;