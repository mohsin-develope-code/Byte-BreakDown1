import React, {useState, useEffect} from 'react'
import {Link } from 'react-router-dom'
import date from 'date-and-time';
import { UserContext } from '../contextAPI/AuthContext';
import Loading from '../components/Loading'
import LazyLoad from 'react-lazyload';

const Home = () => {



  const {loading, setLoading, error, setError,} = UserContext();
  const [userPost, setUserPost] = useState();


  useEffect(()=> {

    const fetchPosts = async () => {
      setLoading(true)

      try {
        const response = await fetch("https://byte-breakdown1.onrender.com/user/all-post",
                                     { method: "GET", 
                                       credentials:'include',
                                    })
        const result = await response.json();
        setUserPost(result);

      }catch(error){
        setError(error.message);
      } finally {
        setLoading(false);
      }

    } 

    fetchPosts();

  }, [])


  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }




  return (

      <div className='flex flex-col gap-8 my-9'>


         {

           userPost && userPost?.map((post) => (
 

                    <div key={post._id} className='mx-10 xxs:mx-16 sm:mx-28 h-auto py-4 shadow-lg hover:shadow-2xl transition-shadow duration-300  
                                     md:w-fit lg:w-[976px] lg:justify-start   md:h-52 flex items-center justify-center  
                                     bg-white border-2 rounded-2xl'>
                        
                      <Link to={`/post/${post._id}`}>

                        <div className='flex flex-col gap-3 md:flex-row md:items-start md:gap-10 px-4'>
          
                            <div className='max-w-[300px] h-[180px]  md:h-44 md:w-80   flex-shrink-0'>
                                 <img className='w-full h-full object-cover rounded-xl' 
                                      src={'https://byte-breakdown1.onrender.com/'+post.cover} 
                                      loading="lazy" alt="Lazy loaded image"/>
                            </div>
             
                            <div className='flex flex-col gap-2 '>
                
                <h1 className='text-xl line-clamp-2 leading-tight md:text-2xl font-semibold md:line-clamp-1 '>{post.title}</h1> 
                
                <div className='flex gap-5 text-gray-400 text-sm italic'>
                  <p>{post.author?.name}</p>
                  <p>{date.format(new Date(post.createdAt), ' MMM DD YYYY')}</p>
                </div>

                <p className='text-s line-clamp-3 leading-tight text-gray-500 md:text-lg md:line-clamp-3 '> {post.summary}     </p>
             
                            </div>

                        </div>   

                      </Link>   

                    </div>
               
           ))

         }   

      </div>

 
  )
}

export default Home