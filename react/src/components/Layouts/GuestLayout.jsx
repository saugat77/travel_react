import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import '../../views/login-and-signup.css';

function GuestLayout() {
  const { user, token } = useStateContext();
  if (token) {
    return <Navigate to="/admin/dashboard" />
  }
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default GuestLayout
