import React, {useState, useEffect, useRef} from 'react'                                               
import { Link } from 'react-router-dom';
import date from 'date-and-time'
import { UserContext } from '../contextAPI/AuthContext';
import LazyLoad from 'react-lazyload';
import Loading from './Loading';



const UserPostList = () => {

    const { error, setError,} = UserContext();
    const [userPost, setUserPost] = useState(null);

    
    useEffect(()=> {
      const fetchPosts = async () => {
  
        try {
          const response = await fetch("http://localhost:8080/user/user-posts", 
                                      { method: "GET", 
                                        credentials:'include',});
          const result = await response.json();
          setUserPost(result);

        }catch(err){
          setError(err.message);
        } 
      } 

      fetchPosts();

    }, [])



    if (error) {
        return <div>Error: {error}</div>;
    }




             
  




  return (
   
    <div className='mx-28 flex-nowrap md:space-y-0 md:flex md:flex-wrap md:gap-20 
                    items-center justify-center mt-12'>


        {
          userPost && userPost.map((post) => (

            <Link to={`/post/${post._id}`} key={post._id}> 
                      <div className='h-[360px] w-[260px] md:w-[260px] flex flex-col gap-4 p-5 shadow-lg 
                                      hover:shadow-2xl transition-shadow duration-300 border-[1px] border-gray-400  
                                      rounded-2xl mt-10'>

                      <Link to={`/post/${post._id}`}>       
                            <div className='h-[150px] w-full rounded-xl border-2 border-gray-300' >
                                <img className='h-[150px] w-full rounded-xl object-center object-cover' 
                                     src={'http://localhost:8080/'+post.cover}
                                     loading="lazy" alt="Lazy loaded image" />
                            </div>
                      </Link> 
                       
                      <div className='flex flex-col items-start gap-1 mt-0'>

                            <Link to={`/post/${post._id}`}>   
                              <h1 className='font-semibold text-lg  line-clamp-2 leading-tight'>{post.title}</h1> 
                            </Link>

                            <div className='mt-2 flex gap-5 text-gray-400 text-sm italic'>
                              <p>{post.author?.name}</p>
                              <p>{date.format(new Date(post.createdAt), 'MMM DD YYYY')}</p>
                            </div>

                            <p className='text-gray-500 text-sm md:text-base mt-2 line-clamp-3'> 
                              {post.summary}
                            </p>
         
                      </div>

                    </div>

            </Link>
 
          ))

        }

    </div>

)}



export default UserPostList