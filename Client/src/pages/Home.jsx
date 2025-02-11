import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import date from "date-and-time";
import { UserContext } from "../contextAPI/AuthContext";
import Category from "../components/Category";
import { BASE_URL } from "../utils/FetchAPI";




const Home = () => {
  const { setLoading, error, setError } = UserContext();
  const [userPost, setUserPost] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${BASE_URL}/user/all-post`,
          { method: "GET", credentials: "include" }
        );
        const result = await response.json();
        setUserPost(result);
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
      <Category />

      <div
        className="h-full w-full mt-16 md:flex md:flex-row flex flex-col gap-y-16 md:gap-8
                   px-9 "
      >
        {/* Card Section */}
        <div
          className="md:w-[70%] md:h-fit md:px-6 md:pb-5 flex flex-col gap-y-9 
                        w-full px-2"
        >
          {/* Card Layout */}

          {userPost &&
            userPost?.map((post) => (
              <Link to={`/post/${post._id}`}>
                <div
                  key={post._id}
                  className="w-full sm:min-h-52  rounded-2xl hover:scale-105 duration-300 hover:cursor-pointer border-2
                          sm:p-4 sm:flex sm:gap-x-8 sm:h-40 sm:flex-row sm:items-center sm:justify-center
                          flex flex-col justify-center items-center gap-y-5 py-4"
                >
                  <div
                    className=" sm:w-[35%] sm:h-full border-2 rounded-xl border-white
                            w-[90%] h-[200px]"
                  >
                    <img
                      src={`http://localhost:8000/${post.cover}`}
                      alt="#"
                      className="w-full h-full rounded-xl object-cover object-center"
                    />
                  </div>

                  <div className="sm:w-[65%] w-[85%] h-full space-y-3">
                    <h1 className="text-base line-clamp-3 xs:text-2xl font-bold xs:line-clamp-2">
                      {post.title}
                    </h1>

                    <div className="flex items-center gap-5">
                      <p className="text-xs xs:text-sm">
                        {" "}
                        {date.format(new Date(post.createdAt), " MMM DD YYYY")}
                      </p>
                      <div className="flex gap-2">
                        <p className="bg-black rounded-3xl w-fit px-2 xs:px-3 py-[2px] md:py-[3px] font-medium text-white text-[10px] xs:text-xs">
                          #tailwind
                        </p>
                        <p className="bg-black rounded-3xl w-fit px-2 xs:px-3 py-[2px] md:py-[3px] font-medium text-white text-[10px] xs:text-xs">
                          #tailwind
                        </p>
                      </div>
                    </div>

                    <p className=" line-clamp-2 xs:line-clamp-2 lg:line-clamp-2 sm:hidden">
                      {post.summary}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
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
              <div className="flex gap-4 w-full sm:h-24 bg-white rounded-md p-3">
                <img
                  src={`http://localhost:8000/${post.cover}`}
                  alt="#"
                  className="max-w-20 max-h-20 rounded-md"
                />

                <div className="flex flex-col gap-3 w-full">
                  <h1 className="text-sm font-medium line-clamp-2 hover:underline hover:cursor-pointer">
                    {post.title}
                  </h1>
                  <div className="flex gap-2">
                    <p className="bg-black rounded-3xl w-fit px-3 py-[2px] text-xs font-medium text-white">
                      #tailwind
                    </p>
                    <p className="bg-black rounded-3xl w-fit hidden xs:flex md:hidden lg:flex px-3 py-[2px] text-xs font-medium text-white">
                      #tailwind
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
