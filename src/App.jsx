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
        <div className='min-h-screen flex flex-wrap content-between bg-gray-700'>
          <div className='w-full block'>
            <h1>Loading</h1>
          </div>
        </div>
      </>
    )
  }
  else {
    return (
      <>
        <div className='min-h-screen flex flex-wrap content-between bg-gray-700 rounded-lg'>
          <div className='w-full block'>
            <Header />
            <main>
              {/* <Outlet /> */}
            </main>
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default App
