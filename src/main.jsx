import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Login, Signup, Posts, EditPost, AddPost, Post } from './pages';
import { AuthLayout } from './components';

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
      path: '/',
      element: <Home/>
    },
    {
      path: '/login',
      element: 
        <AuthLayout authentication={false}>
          <Login/>
        </AuthLayout>
    },
    {
      path: "/signup",
      element: 
        <AuthLayout authentication={false}>
          <Signup/>
        </AuthLayout>
    },
    {
      path: "/posts",
      element: 
        <AuthLayout authentication>
          {" "}
          <Posts />
        </AuthLayout>
    },
    {
      path: "/add-post",
      element: (
        <AuthLayout authentication>
          {" "}
          <AddPost />
        </AuthLayout>
      ),
    },
    {
      path: "/edit-post/:slug",
      element: (
        <AuthLayout authentication>
          {" "}
          <EditPost/>
        </AuthLayout>
      ),
    },
    {
      path: "/post/:slug",
      element: <Post/>,
    },
  ]
}])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
