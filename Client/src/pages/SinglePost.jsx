import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import date from 'date-and-time';
import { UserContext } from '../contextAPI/AuthContext';
import Loading from '../components/Loading';



const SinglePost = () => {

  const {loading, setLoading, error, setError,} = UserContext();
  const [onePost, setOnePost] = useState("")
  const {id} = useParams();


  useEffect(()=> {

    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8080/user/post/${id}`,
                                     { method: "GET", 
                                       credentials:'include',
                                     })
        const result = await response.json();
        setOnePost(result);
      
      }catch(error){
        setError(error.message);
      } finally {
        setLoading(false);
      }

    }  

    fetchPosts();

  },[])


  if (loading) {
    return <Loading/>
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  


  return (

   
      <div className='w-full flex justify-center '>    

        <div className='max-w-[900px] flex flex-col  gap-10  my-16 mx-10'>


           <div>
      <h1 className='text-3xl md:text-5xl font-bold mb-5 leading-none md:leading-tight'>{onePost.title}</h1>
           </div>

           <div className='max-w-[400px] md:max-w-[900px]' >
              <img src={`http://localhost:8080/`+ onePost.cover} 
                   className='max-h-[400px]  w-full object-cover' />

              <div className='flex gap-3 text-sm md:text-base text-gray-500 mt-5'>
               <p className='italic'>{onePost.author?.name}</p> 
               <p>{date.format(new Date(onePost.createdAt), ' MMM DD YYYY')}</p>
              </div>

           </div>

           <div className='text-xl md:text-3xl font-semibold w-full text-justify'>{onePost.summary}</div>

           <div className='text-lg md:text-xl w-full text-justify leading-normal' dangerouslySetInnerHTML={{__html:onePost.content}} />
  
        </div> 
      </div>

  )
}

export default SinglePost