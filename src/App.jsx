import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ContainerLayout from './components/ContainerLayout'
import { Link, Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import Home from './pages/Home'

function App() {
  

  return (
    <ContainerLayout>
      <Routes>
        <Route path="/"  element={<Home/>}/>
        <Route path="*"  element={<NotFound/>}/>
      </Routes>

    </ContainerLayout>
  )
}

export default App
