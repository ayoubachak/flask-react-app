import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './views/Home.tsx'
import ControlPannel from './views/ControlePannel.tsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App View={Home}/>,
  },
  {
    path: "control/:com",
    element: <App View={ControlPannel}/>,
  },

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
)