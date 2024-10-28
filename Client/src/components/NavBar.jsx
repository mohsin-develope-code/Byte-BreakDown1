import React, { useState, useEffect } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../contextAPI/AuthContext';
import { RxCross2 } from "react-icons/rx";
import Button from './Button'



const NavBar = () => {

 
  const navigate = useNavigate();
  const {login, userName, setLogin, setUserName} = UserContext();
  const [profile, setProfile] = useState(false);
  const [openDrawer , setOpenDrawer] = useState(false);


  const drawerchange = ()=> {
   return setOpenDrawer(!openDrawer);
  }


  const handleLogout = async () => {
    const response = await fetch('https://byte-breakdown1.onrender.com/logout', {
                                  method: "Post",
                                  credentials: 'include',
                                })

    const result = await response.json();
    const {status} = result
    console.log(result);

    if(status){
      setLogin(false)
      setUserName("")
      localStorage.removeItem("login");
      localStorage.removeItem("userName");
      setProfile(false);

      setTimeout(() => {
        navigate('/login')
      });
    }

  }




  return (


    <nav className=' text-black rounded-lg border-2 border-gray-200  my-3 mx-4 xs:mx-10'>
          
        <div className='flex justify-between items-center px-6 h-14 '>

                <div className='flex gap-2 items-baseline'>
                    <div className='h-5 w-5 text-xs px-2 py-1 md:h-8 md:w-8 bg-black rounded-lg 
                                    md:text-base text-white text-center flex items-center justify-center 
                                    font-bold shadow-lg '>
                       BB 
                    </div>
                    <div className='font-semibold text-sm md:text-lg'>
                       ByteBreakDown
                    </div> 
                </div>



               <div className='md:display hidden list-none md:flex gap-5'>
       
                   <div className="hidden md:flex list-none gap-6">
                      <Link to={"/"}>
                        <li className='font-medium hover:text-green-500 cursor-pointer'>Home</li>
                      </Link>
                      <Link to={'/about'}>
                        <li className='font-medium hover:text-green-500 cursor-pointer'>About us</li>
                      </Link>
                   </div>
            </div>



         {
          login? 
          <div className='hidden md:flex gap-3 items-center '> 
              <p className='font-medium'>Hii, {userName}</p> 
              <CgProfile onClick={()=> setProfile(!profile)} className='h-8 w-8 cursor-pointer relative'/>


              <div className={`absolute right  mt-[190px] w-fit px-[43px]  bg-white border border-gray-200 
                               rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out 
                               ${profile ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>

                  <ul className="list-none p-2">

                       <Link to={'/create-post'} 
                             onClick={()=> setProfile(false)}> 
                            <div className='p-2 hover:bg-gray-100 hover:rounded-xl cursor-pointer'>Create Post</div> 
                       </Link>
                       <Link to={'/dashboard'} 
                             onClick={()=> setProfile(false)}> 
                             <div className='p-2 hover:bg-gray-100 hover:rounded-xl cursor-pointer'>Dashboard</div>  
                       </Link>
                       <div onClick={handleLogout} 
                           className='p-2 hover:bg-gray-100 hover:rounded-xl cursor-pointer '>Logout</div>
  
                  </ul>
              </div>       
 
          </div>


          :

          <div className='hidden md:flex gap-7 items-center'>
        
               <Link to={'/login'} 
                     className='font-semibold hover:text-green-500 text-lg' >Login</Link>
               <Link to={'/signup'} 
                     className='font-semibold hover:text-black hover:bg-white border-2 border-transparent hover:border-black px-4 py-2 bg-black text-white rounded-md transition-all duration-300 ease-in-out'>Sign up</Link>

          </div>


         }




          <div className='md:hidden'>
            {openDrawer?
              <RxCross2 onClick={drawerchange} className='cursor-pointer'/> 
              :
              <IoReorderThreeOutline onClick={drawerchange} className='h-8 w-8 cursor-pointer'/>
            }
          </div>




        </div> 


        { 
         openDrawer?
          <div className=' right-4 left-4 md:hidden  flex items-center justify-center absolute bg-slate-100 rounded-b-xl'>
            <div className=' text-left top-[72px] md:duration-200    flex flex-col items-center py-8'>
          
                <ul className='text-black py-2'>

                  <Link to={"/"} onClick={drawerchange} >
                       <li className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>Home</li>
                          </Link>

                  { login?
                    <>
                      <Link to={"/create-post"} 
                            onClick={drawerchange}>  
                            <li className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>Create Post</li> 
                      </Link>
                      <Link to={"/dashboard"} 
                            onClick={drawerchange} > 
                            <li className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>Dashboard</li> 
                      </Link>
                      <li onClick={ () => {handleLogout(); drawerchange()}} 
                          className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>Logout</li> 
                    </> 
                    : 
                    <>
                      <Link to={"/about"} 
                            onClick={drawerchange}>  
                            <li className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>About US</li> 
                      </Link>
                      <Link to={"/contact"} 
                            onClick={drawerchange}>  
                            <li className='hover:text-black hover:font-bold hover:duration-100 cursor-pointer py-1'>Contact US</li> 
                      </Link>
                    </>
                  }

                </ul>


                {
                  !login?
                   <div className='flex space-x-5 mt-3 items-baseline '>
  
                      <Link to={'/login'} 
                            onClick={()=> setOpenDrawer(!openDrawer)}> 
                            <a className='border-2 border-black bg-white px-3 py-2 rounded-md hover:font-semibold'>
                             Login
                            </a>
                      </Link>
      
                      <Link to={'/signup'} 
                            onClick={()=> setOpenDrawer(!openDrawer)}> 
                           <Button btnText={"Sign up"}/>
                      </Link> 
             
                    </div>

                    :

                    <></>
                }

            </div> 
          </div>

          :

          <></>
        }
 
    </nav>


)}



export default NavBar