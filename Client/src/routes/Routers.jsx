import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import CreatePost from '../pages/CreatePost'
import SinglePost from '../pages/SinglePost'
import { UserContext } from '../contextAPI/AuthContext'
import AboutUs from '../pages/AboutUs'
import ContactUs from '../pages/ContactUs'



const Routers = () => {


 const location = useLocation();
 const navigate = useNavigate();
 const {login} = UserContext();


  const PrivateRoute = ({element}) => {
    return login? element : <Navigate to={'/login'}/>
  }


  useEffect(()=> {
    if(login){
      if(location.pathname === '/login' || location.pathname === '/signup'){
        return navigate('/dashboard')
      }
    }
  },[])




  return (
    
    <Routes>

        <Route path='/' element={<Layout/>} >

            <Route index element={<Home/>} />

            <Route path='/signup' element={<Signup/>} />

            <Route path='/login' element={<Login/>} />

            <Route path='/dashboard' element={<PrivateRoute element={<Dashboard/>}/>}  />

            <Route path='/create-post' element={<PrivateRoute element={<CreatePost/>}/>} />

            <Route path='/post/:id' element={<SinglePost/>} />

            <Route path='/about' element={<AboutUs/>} />

            <Route path='/contact' element={<ContactUs/>} />

        </Route>
        

    </Routes>

  )
}

export default Routers