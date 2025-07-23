import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import RootLayout from "./layout/RootLayout.tsx";
import AppLayout from "./layout/AppLayout.tsx";
import TodoListPage from "./pages/TodoListPage/TodoListPage.tsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.tsx";
import ErrorPage from "./pages/Error/Error.tsx";
import AuthenticationPage, {action as authAction} from "./pages/Authentication/Authentication.tsx";

import { checkAuthLoader } from "./helpers/auth.ts";
import store from "./store/index.ts";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
        <Route element={<AppLayout />} loader={checkAuthLoader}>
          <Route index element={<TodoListPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="auth" element={<AuthenticationPage />} action={authAction}/>
      </Route>
    )
  )
  return <Provider store={store}><RouterProvider router={router} /></Provider>;
}

export default App;