import React from 'react'
import NavBar from './NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'


const Layout = () => {

  return (
  
  <> 
      <div className=" max-w-[1200px] mx-auto min-h-screen ">
    
            <NavBar/>
           
            <Outlet/>
           
      </div>

      <div>
        <Footer/>
      </div>

  </> 

  )
  
}

export default Layout