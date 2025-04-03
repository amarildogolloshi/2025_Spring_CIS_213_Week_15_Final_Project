import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/layouts/public/PublicLayout.jsx"
import Home from './components/pages/home-page/Home.jsx'
import SignIn from './components/pages/sign-in/SignIn.jsx'
import Support from './components/pages/support/Support.jsx'
import { UserContextProvider } from './store/UserContextProvider.jsx'
import Dashboard from './components/layouts/private/Dashboard.jsx'

function App() {
  

  return (
    <PublicLayout>
      <UserContextProvider>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='support' element={<Support />}/>
          <Route path='dashboard' element={<Dashboard />}/>
        </Routes>
      </UserContextProvider>
    </PublicLayout>
  )
}

export default App
