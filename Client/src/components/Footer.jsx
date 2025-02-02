import {Link} from 'react-router-dom'
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";



const Footer = () => {

  return (
    
        <div className='bg-black w-full mt-12 flex items-center justify-between md:px-16 md:py-4  px-9 py-9'>

          
              <div className='list-none text-white font-medium 
                             md:flex md:flex-row space-x-6 items-center flex-col text-xs 
                             md:text-sm'>

                    <Link to={"/"}>
                      <li  className='hover:scale-105 duration-100'>Home</li>
                    </Link>
                    <Link to={"/about"}>
                       <li  className='hover:scale-105 duration-100'>About US</li> 
                    </Link>
                    <Link to={"/contact"}
                       ><li className='hover:scale-105 duration-100'>Contact US</li> 
                    </Link>
              </div>
            

              <div className='text-white hidden sm:block text-sm'>
                © 2024 | All Rights Reserved.
              </div>

           

              <div className='space-y-6 items-start md:flex md:space-x-8 md:space-y-0'>
                  <FaGithub className='text-white h-5 w-5 '/>
                  <FaXTwitter className='text-white h-5 w-5'/>
               </div>

        </div>
    
  )
}

export default Footer