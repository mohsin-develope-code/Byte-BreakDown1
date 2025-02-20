import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contextAPI/AuthContext";
import Category from "../components/Category";
import { BASE_URL } from "../utils/FetchAPI";
import { IoSearchSharp } from "react-icons/io5";
import Card from "../components/Card";

const Home = () => {

  const postRef = useRef(null);
  const { setLoading, error, setError } = UserContext();
  const [userPost, setUserPost] = useState();

  const [searchVal, setSearchVal] = useState();
  const [searchPost, setSearchPost] = useState();

  function categoryTags(catTag) {

    if(postRef.current){
      postRef.current.scrollIntoView({behavior: 'smooth'})
    }

    const filterByTags = userPost.filter((post) =>
      post.tags?.some((tag) => tag.toLowerCase().includes(catTag.toLowerCase()))
    );

    setSearchPost(filterByTags);
  }

  function handlePostSearch() {

    if(postRef.current){
      postRef.current.scrollIntoView({behavior: 'smooth'})
    }

    const filterByPostSearch = userPost.filter((post) =>
      post.title.toLowerCase().includes(searchVal.toLowerCase())
    );

    const filterByTags = userPost.filter((post) =>
      post.tags?.some((tag) =>
        tag.toLowerCase().includes(searchVal.toLowerCase())
      )
    );

    const combinedResults = [
      ...new Set([...filterByPostSearch, ...filterByTags]),
    ];

    setSearchPost(combinedResults);
  }

  // All User Post API Calling
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/user/all-post`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setUserPost(result);
        setSearchPost(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      {/* Searching Post  */}
      <div
        className="w-full px-16 py-16 md:mb-20 flex md:flex-row md:items-center md:gap-x-28 
                     flex-col items-center justify-center gap-y-8"
      >
        <div className="flex-shrink-0 max-w-[500px] w-full flex flex-col gap-y-3">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold px-3">
            Dive into the World of 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-pink-600 to-purple-600">
             {" "}Tech Trends
            </span>
          </h1>
          <div className="flex items-center">
            <input
              type="text"
              onChange={(e) => setSearchVal(e.target.value)}
              className="px-4 py-2 rounded-l-3xl w-full border border-r-0 border-black"
            />
            <div className="border border-l-0 rounded-r-3xl px-4 py-2 border-black ">
              <IoSearchSharp
                onClick={handlePostSearch}
                className="w-6 h-6 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-1 w-fit h-auto ">
          <h1 className="text-5xl md:text-6xl sm:py-3 font-semibold text-transparent leading-tight bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-purple-600">
            Empowering
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-600 ">
            Your Tech Journey
          </h2>
        </div>
      </div>


      {/* Tags Category */}
      <Category tagPostShown={categoryTags} />

      <div
        ref={postRef}
        className="h-full w-full mt-20 md:flex md:flex-row flex flex-col gap-y-16 md:gap-8
                   px-9 "
      >
        {/* Card Section */}
        <div
          className="md:w-[70%] md:h-fit md:px-6 md:pb-5 flex flex-col gap-y-9 
                        w-full xs:px-10"
        >

          
          {searchPost?.length == 0 ? (
            <div className="text-center text-3xl font-semibold mt-10">
              No Post
            </div>
          ) : (
            searchPost &&
            searchPost?.map((post) => (
              <Link to={`/post/${post._id}`}>
                <Card key={post._id} post={post} />
              </Link>
            ))
          )}
        </div>

        {/* Latest News Section */}
        <div className="md:w-[30%] h-fit p-5 flex flex-col  gap-6 w-full rounded-xl bg-slate-100">
          {/* Heading */}
          <div className="flex items-center justify-center">
            <h2 className="bg-black px-4 py-2 w-fit  text-white font-semibold">
              Latest Trends
            </h2>
          </div>

          {/* Latest Small Card */}
          {userPost &&
            userPost?.slice(1, 5).map((post) => (
              <Link to={`/post/${post._id}`}>
                <div key={post._id} className="flex gap-4 w-full sm:h-24 bg-white rounded-md p-3 overflow-hidden">
                  <img
                    src={`${BASE_URL}/${post.cover}`}
                    alt="#"
                    className="max-w-20 max-h-20 rounded-md"
                  />

                  <div className="flex flex-col gap-3 w-full">
                    <h1 className="text-sm font-medium line-clamp-2 hover:underline hover:cursor-pointer">
                      {post.title}
                    </h1>
                    <div className="flex gap-2">
                      <p className="bg-black flex-shrink-0 rounded-3xl w-fit px-3 py-[2px] text-[10px] font-medium text-white">
                        {post.tags[0]}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
