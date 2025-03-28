import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'
import UserList from './pages/UserList'
import EditUser from './pages/EditUser'

function App() {
  return (
    <AuthProvider>
  
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/edit-user/:id" element={<EditUser />} />
        </Routes>

    </AuthProvider>
  )
}

export default App
