import { useContext, useEffect } from "react";
import { Routes, Route } from 'react-router'
import './App.css'
import PublicLayout from "./components/public/PublicLayout.jsx"
import Home from './pages/home-page/Home.jsx'
import SignIn from './pages/sign-in/SignIn.jsx'
import Support from './pages/support/Support.jsx'
import UserContext from './store/UserContextProvider.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import SignUp from './pages/sign-up/SignUp.jsx'
import ForgotPassword from './pages/forgot-password/ForgotPassword.jsx'
import PrivateLayout from "./components/private/PrivateLayout.jsx";
import useLocalStorage from "./hooks/useLocalStorage.jsx";
import NotFound from "./pages/not-found/NotFound.jsx";

function App() {
  const {user, dispatch, login} = useContext(UserContext);
  const [guess, setUser] = useLocalStorage("user", user);
  
  //console.log('user', user)
  // console.log('user id', user.user.id)
  //console.log("user.user.isLoggedIn", user.isLoggedIn)

  useEffect(() => {
    console.log("Login user:", user)
    if (user.isLoggedIn) {
      const mockToken = "mock_jwt_token_123";
      login(user, mockToken )
    }

    if (!user?.isLoggedIn) {
      dispatch({
          type: "LOAD_USER"
      })
    }
    
  }, [user?.isLoggedIn]);
  return (
    
        <Routes>
          <Route index element={<Home />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='support' element={<Support />}/>
          <Route path='dashboard' element={<Dashboard />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path='forgotpassword' element={<ForgotPassword />} />
          <Route path='*' element={<NotFound />}/>
          <Route path='dashboard' element={<Dashboard />}/>
        </Routes>
  )
}

export default App
