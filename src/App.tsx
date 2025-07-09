import React from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import Layout from "./layout/Layout";
import TodoListPage from "./pages/TodoListPage/TodoListPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

const App: React.FC = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<TodoListPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
    )
  )

  return <RouterProvider router={router} />;
}

export default App;