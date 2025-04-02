import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/layouts/public/PublicLayout.jsx"
import Home from './components/pages/home-page/Home.jsx'

function App() {
  

  return (
    <PublicLayout>
      <Routes>
        <Route index element={<Home />}/>
      </Routes>
    </PublicLayout>
  )
}

export default App
