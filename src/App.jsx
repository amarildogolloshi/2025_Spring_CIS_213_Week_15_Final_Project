import { useContext, useEffect } from "react";
import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/public/PublicLayout.jsx"
import Home from './pages/home-page/Home.jsx'
import SignIn from './pages/sign-in/SignIn.jsx'
import Support from './pages/support/Support.jsx'
import UserContext from './store/UserContextProvider.jsx'
import Dashboard from './components/private/Dashboard.jsx'
import SignUp from './pages/sign-up/SignUp.jsx'
import ForgotPassword from './pages/forgot-password/ForgotPassword.jsx'
import PrivateLayout from "./components/private/PrivateLayout.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";

function App() {
  const {user, dispatch} = useContext(UserContext);
  const [guess, setUser] = useLocalStorage("user", { isLoggedIn:  user.isLoggedIn });
  
  return user.isLoggedIn ? (
      <PrivateLayout>
        <Routes>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </PrivateLayout>
    ) : (
      <PublicLayout>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='support' element={<Support />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      
    </PublicLayout>
    )
}

export default App
