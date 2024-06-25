import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice'

import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <>
        <div className='flex flex-wrap content-between min-h-screen bg-gray-700'>
          <div className='block w-full'>
            <h1>Loading</h1>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className='flex flex-wrap content-between min-h-screen bg-gray-700 rounded-lg'>
          <div className='block w-full'>
            <Header />
            <main>
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default App
