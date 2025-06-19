import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './styles/index.scss'
import TodoListPage from './pages/TodoListPage/TodoListPage.jsx'
import ProfilePage from './pages/ProfilePage/ProfilePage.jsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
