
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import PostJob from './components/Job/PostJob'
import MyJobs from './components/Job/MyJobs'
import Application from './components/Application/Application'
import MyApplications from './components/Application/MyApplications'
import NotFound from './components/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import NavBar from './components/Layout/NavBar'
import { useContext, useEffect } from 'react'
import { Context } from './main'
import axios from 'axios'
import Footer from './components/Layout/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'

function App() {
  const { isAuthorized, setIsAuthorized, setUser} = useContext(Context);

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if(user){

        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/user/getUser/${user.uid}`, { withCredentials: true});
        setUser(response.data.user);
        setIsAuthorized(true);
      }else{

        setIsAuthorized(false)
      }
    });
  }, [isAuthorized])
  return (
   
   <BrowserRouter>
   <NavBar />
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/' element={<Home />} />
      <Route path='/job/getall' element={<Jobs />} />
      <Route path='/job/:id' element={<JobDetails />} />
      <Route path='/job/post/:id' element={<PostJob />} />
      <Route path='/job/me/:id' element={<MyJobs />} />
      <Route path='/application/:id' element={<Application />} />
      <Route path='/application/me/:id' element={<MyApplications />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
    <Footer />
    <Toaster />
   </BrowserRouter>
   
   
  )
}

export default App
