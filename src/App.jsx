import { useState, useEffect } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth'
import {login, logout} from './store/authSlice'
import { Header, Footer } from './components';
import { Outlet } from 'react-router-dom';
import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        dispatch(login(userData));
      } else {
        dispatch(logout());
      }
    })
    .finally(() => setLoading(false));

  },[]);

  return loading ? (null) : (
    <div className='flex flex-wrap content-between w-full min-h-screen bg-color2'>
      <header className='w-full'>
        <Header />
      </header>

      <main className='flex-1'>
        <Outlet />
      </main>

      <footer className='w-full'>
        <Footer />
      </footer>
    </div>
  )
}

export default App