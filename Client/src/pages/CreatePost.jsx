import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/FetchAPI";
import { RxCross2 } from "react-icons/rx";
import { hiddenCat, categories } from "../utils/data";
import ImageGenerator from "../components/ImageGenerator";


const categoryList = [...hiddenCat, ...categories];


const CreatePost = () => {
 
  const [showAIGenerator, setShowAIGenerator] = useState(false);


  function handleImageGenerate (result) {
    console.log(result)
    if(result){
      setShowAIGenerator(true);
    }
    else {
      setShowAIGenerator(false);
    }
  }


  const [categoryTag, setCategoryTag] = useState(null);
  const [searchVal, setSearchVal] = useState("");
  const [tag, setTag] = useState([]);

  function handleSearch(e) {
    setSearchVal(e.target.value);

    if (searchVal === "") {
      setCategoryTag(categoryList);
    }

    const filterBySearch = categoryList.filter((content) =>
      content.toLowerCase().includes(searchVal.toLowerCase())
    );

    setCategoryTag(filterBySearch);
  }

  function handleTag(catTag) {
    setTag((prevTag) => [...prevTag, catTag]);
    setSearchVal(null);
  }

  // console.log(tag);

  function deleteTags(tags) {
    setTag(tag?.filter((item) => item !== tags));
  }

  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState();



  async function createNewPost(e) {
    e.preventDefault();
    
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("files", files[0]);
    data.set("tags", tag);

    try {
      const response = await fetch(`${BASE_URL}/user/create-post`, {
        method: "POST",
        credentials: "include",
        body: data,
      });
      const result = await response.json();
      const { status } = result;

      if (status) {
        setClicked(!clicked);

        // setTimeout(() => {
        //   setErrMessage(message);
        // }, 2000);

        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      return null;
    }
  }


  return (

    <>    

    <div className=" flex justify-center ">

      { showAIGenerator && <ImageGenerator handleImageGenerate={handleImageGenerate} setFiles={setFiles} /> }

      <form
        onSubmit={createNewPost}
        className="flex flex-col gap-5 justify-center py-10 text-center w-full md:w-[900px]"
      >
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="mx-10 md:mx-0 border px-2 py-1 text-base rounded-md border-gray-400"
        />

        <input
          type="text"
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Summary"
          className="mx-10 md:mx-0  border px-2 py-1 text-base rounded-md border-gray-400"
        />


        <div className=" mx-10 md:mx-0  md:w-full flex flex-col items-center justify-start gap-y-2 py-4   
                         md:flex-row md:items-center md:justify-between bg-slate-100 md:py-8 md:px-6 rounded-xl">

           <div className="flex flex-col md:flex-row md:justify-start md:items-center gap-3">
              <input
                  type="file"
                  onChange={(e) => setFiles(e.target.files)}
                  placeholder="Image Upload"
                  className="border px-2 py-1 text-sm rounded-md border-black bg-white "
              />
              <span className="text-sm md:text-base font-semibold">
               Upload Image <span className="text-red-600">*</span>
              </span>
           </div>

           <div className="py-3">OR</div>

           <div className="md:pr-7">

            <button className="px-3 py-2 bg-black text-white text-sm md:text-base font-medium rounded-lg hover:scale-105 duration-300"
                    type="submit"
                    onClick={() => handleImageGenerate ("true")}        
            >
              Generate AI Image
            </button>

           </div>

        </div>


        <div
          className="mx-10 md:mx-0 md:flex md:flex-row md:items-center md:justify-start  md:w-full 
                       flex flex-col gap-y-3"
        >
          {/* Tags Searching */}
          <div className="relative w-full max-w-96 text-start">
            <input
              type="text"
              placeholder="Search Tags"
              onChange={handleSearch}
              className=" px-3 py-1 border border-gray-400 max-w-64 w-full rounded-md"
            />

            {searchVal ? (
              <div
                className="absolute z-10 top-9 w-full max-w-64 h-fit flex flex-col justify-start gap-y-2 text-start 
                           px-5 py-4 bg-white rounded-lg shadow-md border-2 max-h-96 overflow-y-scroll"
              >
                {categoryTag.map((cat) => {
                  return (
                    <div
                      onClick={() => handleTag(cat)}
                      className="text-black hover:bg-slate-200 hover:rounded-md hover:cursor-pointer px-4 py-1 w-full"
                    >
                      {cat}
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </div>

          {/* Tags Showing Right side tags search bar */}
          {tag ? (
            <div className="flex flex-wrap gap-x-3 gap-y-2 md:flex-row md:items-center md:gap-x-3 md:w-full">
              {tag.map((tags) => (
                <span className="pr-1 pl-2 py-1 rounded-lg text-xs md:text-sm text-white bg-black flex items-center justify-center gap-x-2">
                  {tags}
                  <RxCross2
                    onClick={() => deleteTags(tags)}
                    className="cursor-pointer "
                  />
                </span>
              ))}
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="mx-10 md:mx-0 max-h-[300px]">
          <ReactQuill
            onChange={(newValue) => setContent(newValue)}
            className="h-[300px]"
          />
        </div>

        <div className="mt-20">
          <Button btnText={"Create Post"} clicked={clicked} />
        </div>
        
      </form>
    </div>

    </>
  );
};

export default CreatePost;
