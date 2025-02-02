import React, { useState } from "react";
import downArrow from "/assets/downArrow.png"


let hiddenCat = ["#deepseek",
  "#Chatgpt",
  "#Next.js",
  "#Redux Toolkit",
  "#Schema Design",
  "#SQL",
  "#Rust",
   "Rest API"]

let categories = [
  "#tailwind",
  "#web development",
  "#react.js",
  "#node.js",
  "#express.js",
  "#mongodb",
  "#java",
  "#tailwind",
  "#react.js",
  "#node.js",
  "#express.js",
  "#mongodb",
  "#java",
  "#tailwind",
  "#web development",
  "#react.js",
  "#node.js",
  "#express.js",
  "#mongodb",
  "#java",
];






const Category = () => {

  const [expand, setExpand] = useState(true);



  return (
    <div className="h-fit w-full  my-6">

      <h1 className="py-6 text-center text-3xl font-semibold">Category</h1>

      <div className="w-full px-10 pt-5 flex flex-wrap gap-y-5 gap-x-3">
        {
          categories.map((cat) => (
           <div
            key={cat}
            className="w-fit rounded-xl px-4 py-1 bg-black text-white text-sm font-medium hover:cursor-pointer hover:scale-105 duration-150"
          >
            {cat}

           </div>
           )) 

          }


           
            {expand ?
            
             hiddenCat.map((cats) => (
               <div key={cats} 
               className="w-fit rounded-xl px-4 py-1 bg-black text-white text-sm font-medium hover:cursor-pointer hover:scale-105 hover:duration-150"
               >
               {cats}
               </div>
             ))
          
            : <></>  }

          
        


      </div>


      <div className="w-11/12 mx-auto mt-5 flex items-center justify-center">


      <div className="border-b-2 w-full flex justify-center items-center">

         <div onClick={()=> setExpand(!expand)}
              className="p-2   relative top-5 bg-white hover:cursor-pointer w-fit h-fit rounded-full border-[1px] flex justify-center items-center">
              {
                !expand?
                <img src={downArrow} alt="#" className="h-5 w-5" />
                :
                <img src={downArrow} alt="#" className="h-5 w-5 rotate-180" />
              }
         </div>
      </div>
       
      </div>


      </div>
    
  );
};

export default Category;
