import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/public/PublicLayout.jsx"
import Home from './pages/home-page/Home.jsx'
import SignIn from './pages/sign-in/SignIn.jsx'
import Support from './pages/support/Support.jsx'
import { UserContextProvider } from './store/UserContextProvider.jsx'
import Dashboard from './components/private/Dashboard.jsx'
import SignUp from './pages/sign-up/SignUp.jsx'
import ForgotPassword from './pages/forgot-password/ForgotPassword.jsx'

function App() {
  

  return (
    <PublicLayout>
      <UserContextProvider>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='support' element={<Support />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path='forgotpassword' element={<ForgotPassword />} />
        </Routes>
      </UserContextProvider>
    </PublicLayout>
  )
}

export default App
