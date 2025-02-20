import React, { useState } from 'react'
import Button from './Button'
import { RxCross1 } from 'react-icons/rx'
import defaultImage from '/assets/no-auth-post.webp'




const ImageGenerator = ({handleImageGenerate}) => {

  const [imageUrl, setImageUrl] = useState("/");
  const [aiPrompt, setPrompt] = useState("")
  const [clicked, setClicked] = useState(false);


  const generateImage = async () => {

    const formData = new FormData();
    formData.append("prompt", aiPrompt);

    setClicked(true)
    const response = await fetch('https://clipdrop-api.co/text-to-image/v1', 
                              {
                                method: "POST",
                                headers: {
                                   'x-api-key' : process.env.AI_GENERATOR_PIC_API,
                                   
                                 },
                                 body: formData,
                              }
                    );
                    
                    const data = await response.blob();
                    const aiURL = URL.createObjectURL(data);


                    setImageUrl(aiURL);
                    console.log("Generated Image URL:", aiURL);


                    setClicked(false)
  }


  function uploadGeneratedImage () {

    const downloadLink = document.getElementById('save');

    downloadLink.href = imageUrl;

    downloadLink.download = 'image.png'

    document.body.appendChild(downloadLink);

    downloadLink.click();

    document.body.removeChild(downloadLink);

    URL.revokeObjectURL(aiURL);
  }
  
  
  function aiGenerate (res) {
    handleImageGenerate(res)
  }





  return (

                             
    <div className='w-full min-h-full mx-10 py-24 -bottom-[80%] top-0 md:top-0 md:-bottom-72   
                    absolute z-20  backdrop-blur-sm bg-opacity-50
                    flex justify-center items-start bg-slate-300'
        
    >
        

        <div className='w-full h-fit pb-16 top-0 bottom-0 mx-8 sm:mx-10 md:mx-48 xl:mx-96 
                        shadow-custom-dark rounded-xl border-2 bg-white relative'>  


             <RxCross1 
                onClick={() => aiGenerate(false)}
                className='w-6 h-6 absolute right-4 top-4 hover:cursor-pointer '/>           

              <div className='w-full h-full px-10 py-10 flex flex-col items-center justify-start gap-y-6'>          

                  <h1 className='text-xl md:text-2xl font-semibold py-2'>Generate Your Cover Image</h1>

                  <div className='max-h-[250px] h-full max-w-[350px] w-full overflow-hidden'>
                    <img src={imageUrl === "/"? defaultImage : imageUrl} 
                         className='h-full w-full object-center' />
                  </div>

                  {
                    imageUrl === "/"?
                    <></>
                    :
                    <a id='save' onClick={() => uploadGeneratedImage()}> 
                      <Button
                          btnText={"Download"} 
                      />
                    </a>
                    
                  }

                  <div className='w-full px-5 py-3'>
                      <input type="text"
                          onChange={(e) => setPrompt(e.target.value)}
                          placeholder='type prompt to get desire cover image'
                          className='w-full py-2 px-3 border-2 rounded-xl text-xs sm:text-sm' />
                  </div>

                  <div onClick={() => generateImage()}>
                     <Button
                          btnText={"Generate"} 
                          clicked={clicked} />
                  </div>

            </div>      

        </div>

    </div>   



  )
}

export default ImageGenerator