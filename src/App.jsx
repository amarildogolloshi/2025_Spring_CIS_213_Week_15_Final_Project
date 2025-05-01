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
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import Report from "./components/private/Support/Report/Report.jsx";
import Feature from "./components/private/Support/Feature/Feature.jsx";
import About from "./components/private/About/About.jsx";
import EventCreate from "./pages/events/create/EventCreate.jsx";
import EventsShowAll from "./pages/events/show-all/EventsShowAll.jsx";
import MemberCreate from "./pages/members/create/MemberCreate.jsx";
import MembersShowAll from "./pages/members/show-all/MembersShowAll.jsx";
import MembersCards from "./pages/members/cards/MembersCards.jsx";
import SchedulerCreate from "./pages/scheduler/create/SchedulerCreate.jsx";
import SchedulerShowAll from "./pages/scheduler/show-all/SchedulerShowAll.jsx";
import PrivacyPolicy from "./pages/privacy-policy/PrivacyPolicy.jsx";
import TermsAndConditions from "./pages/terms-and-conditions/TermsAndConditions.jsx";

import ContactPage from "./pages/contact/ContactPage.jsx";
import AboutPage from "./pages/about/AboutPage.jsx";
import FAQPage from "./pages/faq-page/FAQPage.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {
  const {user, dispatch, login} = useContext(UserContext);
  const [guess, setUser] = useLocalStorage("user", user);
  
  //console.log('user', user)
  // console.log('user id', user.user.id)
  //console.log("user.user.isLoggedIn", user.isLoggedIn)

  // console.log(process.env);
  console.log(process.env.NODE_ENV);
  console.log(import.meta.env.VITE_API_URL);

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
          <Route path='home'element={<Home />}/>
          <Route path='signin' element={<SignIn />}/>
          <Route path='support' element={<Support />}/>
          <Route path='signup' element={<SignUp />}/>
          <Route path='forgotpassword' element={<ForgotPassword />}/>
          <Route path='about' element={<AboutPage />} />
          <Route path='contact' element={ <ContactPage/>} />
          <Route path='faq' element={ <FAQPage/>} />
          <Route path='privacy-policy' element={<PrivacyPolicy />} />
          <Route path='terms-and-conditions' element={ <TermsAndConditions/>} />


          <Route path='/pulse/dashboard' element={<ProtectedRoute element={<Dashboard />} />}/>
          <Route path='/pulse/events/create' element={<ProtectedRoute element={<EventCreate />} />}/>
          <Route path='/pulse/events' element={<ProtectedRoute element={<EventsShowAll />} />}/>
          <Route path='/pulse/members/create' element={<ProtectedRoute element={<MemberCreate />} />}/>
          <Route path='/pulse/members' element={<ProtectedRoute element={<MembersShowAll />} />}/>
          <Route path='/pulse/members/cards' element={<ProtectedRoute element={<MembersCards />} />}/>
          <Route path='/pulse/scheduler/create' element={<ProtectedRoute element={<SchedulerCreate />} />}/>
          <Route path='/pulse/scheduler' element={<ProtectedRoute element={<SchedulerShowAll />} />}/>
          <Route path='/pulse/profile' element={<ProtectedRoute element={<Profile />} />}/>
          <Route path='/pulse/support/report' element={<Report />} />
          <Route path='/pulse/support/feature' element={<Feature />} />
          <Route path='/pulse/about' element={<ProtectedRoute element={<About />} />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
  )
}

export default App
