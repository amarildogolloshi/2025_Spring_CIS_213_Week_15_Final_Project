import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/layouts/public/PublicLayout.jsx"
import Home from './components/pages/home-page/Home.jsx'
import SignIn from './components/pages/sign-in/SignIn.jsx'
import Support from './components/pages/support/Support.jsx'

function App() {
  

  return (
    <PublicLayout>
      <Routes>
        <Route index element={<Home />}/>
        <Route path='signin' element={<SignIn />}/>
        <Route path='support' element={<Support />}/>
      </Routes>
    </PublicLayout>
  )
}

export default App
