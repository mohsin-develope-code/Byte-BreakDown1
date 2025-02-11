import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import Button from '../components/Button'
import {useNavigate} from 'react-router-dom'
import {BASE_URL} from '../utils/FetchAPI';




const CreatePost = () => {


  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();



  async function createNewPost (e) {
    e.preventDefault();

    const data = new FormData();
    data.set("title", title)
    data.set("summary", summary)
    data.set("content", content)
    data.set("files", files[0])
    console.log(files);


    try{
      const response = await fetch(`${BASE_URL}/user/create-post`, {
                                   method: "POST", 
                                   credentials: 'include',
                                   body: data,
                                  })
      const result = await response.json()
      const {status} = result

      if(status){
        setClicked(!clicked)

        // setTimeout(() => {
        //   setErrMessage(message);
        // }, 2000);

        setTimeout(()=> {
          navigate('/dashboard')
        }, 3000)
      }


    } catch(error){
        return null
    }

  } 




  return (

    <div className=' flex justify-center my-12'>
        
      <form onSubmit={createNewPost} 
            className='flex flex-col gap-5 justify-center text-center w-[900px]'>


        <input type="text" 
               onChange={(e)=> setTitle(e.target.value)}
               placeholder='Title'  
               className='mx-10 md:mx-0 border px-2 py-1 text-base rounded-md border-gray-400'/>
  


        <input type="text" 
               onChange={(e)=> setSummary(e.target.value)}
               placeholder='Summary' 
               className='mx-10 md:mx-0  border px-2 py-1 text-base rounded-md border-gray-400' />



 
        <div className='mx-10 md:mx-0  md:w-full flex justify-start items-center gap-3'>
          <input type="file"
                 onChange={(e)=> setFiles(e.target.files)}
                 placeholder='Image Upload'  
                 className='border px-2 py-1 text-sm rounded-md border-gray-400 '/> 
          <span className='text-sm md:text-base font-semibold'>Upload Images <span className='text-red-600'>*</span></span>
        </div>



        <div className='mx-10 md:mx-0  max-h-[300px]'>
             <ReactQuill onChange={(newValue)=> setContent(newValue)}
                         className='h-[300px]' />
        </div>

       
         <div className='mt-20'>
            <Button btnText={"Create Post"} clicked={clicked}/>
         </div>
       
      </form>
    </div>



  )
}

export default CreatePost

