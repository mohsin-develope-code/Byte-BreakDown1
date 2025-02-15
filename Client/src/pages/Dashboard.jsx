import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import UserPostList from '../components/UserPostList'



const Dashboard = () => {


  useEffect(() => {
    const element = document.getElementById('guidence');

    const showElement = setTimeout(() => {
      if (element) {
        element.classList.remove("hidden");
      }
    }, 2000);

   
    const hideElement = setTimeout(() => {
      if (element) {
        element.classList.add("hidden");
      }
    }, 10000); 

    return () => {
      clearTimeout(showElement);
      clearTimeout(hideElement);
    };
  }, []);




  return (


    <div className=' mt-10'>

        <div className='text-2xl md:text-3xl  font-bold text-center'>Your Blog Post</div>
       
        <UserPostList/>

        <div>
              <div id='guidence' className='animate-pulse hidden transition-all duration-700 ease-in-out ' >
                <div className='w-0 h-0 border-l-[20px] border-r-[0] border-t-[45px] border-solid border-r-transparent border-l-transparent  border-t-black
                                right-14 bottom-24 md:right-32 md:bottom-36 fixed'></div>
                <div className='h-11 w-36 md:h-14 md:w-44 bg-black right-14 bottom-28 md:right-32 md:bottom-40 fixed 
                               rounded-lg text-white font-medium md:font-semibold text-base md:text-lg flex items-center justify-center'> Create New Post</div>
              </div>


              <Link to={'/create-post'}>
                <div className='h-[50px] w-[50px] md:h-[70px] md:w-[70px] rounded-full right-8 bottom-10  md:right-24 md:bottom-16 fixed bg-black flex justify-center items-center'> 
                <FaPlus className='text-white h-6 w-6 md:h-9 md:w-9'/>
                </div>
              </Link>

        </div>

    </div>
  )
}





export default Dashboard