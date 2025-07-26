/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import CandleVolume from './pages/5minCandleVolume.jsx'
import HourlyCandleVolume from './pages/HourlyCandleVolume.jsx'
import DailyCandleVolume from './pages/DailyCandleVolume.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<CandleVolume />} />
        <Route path='hour' element={<HourlyCandleVolume />} />
        <Route path='day' element={<DailyCandleVolume />} />
      </Route>
    )
  )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  //<App />
  
)
