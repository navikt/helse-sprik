import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import Home from './index'
import Feil from './pages/feil'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "nyfeil",
    element: <Feil />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
