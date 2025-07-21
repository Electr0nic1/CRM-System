import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { Provider } from "react-redux";

import RootLayout from "./layout/RootLayout";
import AppLayout from "./layout/AppLayout";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/Error/Error";
import AuthenticationPage, {action as authAction} from "./pages/Authentication/Authentication";
import { checkAuthLoader } from "./helpers/auth";
import store from "./store";

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