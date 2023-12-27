import React, { useEffect } from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../../contexts/ContextProvider'
import axiosClient from '../../axios-client';

import axios from 'axios';
function DashboardLayouts() {
  const { user, token, setUser, setToken } = useStateContext();
  console.log(user);
  if (!token) {
    return <Navigate to="/auth/login" />
  }
  const onLogout = (e) => {
    e.preventDefault();
    axiosClient.post('/logout').then(() => {
      setUser({})
      setToken(null)
    })
  }
  useEffect(() => {
    axiosClient.get('/user').then(({ data }) => {
      setUser(data);
    })
  }, []);
  return (
    <div id='dashboardlayout'>
      <aside>
        <Link to="/admin/dashboard">Dashboard</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/destinations">Destinations</Link>
      </aside>
      <div className='content'>
        <header>
          <div>
            Header
          </div>
          <div>
            {user.name}
            <a href='#' onClick={onLogout} className='btn-logout'>Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayouts
