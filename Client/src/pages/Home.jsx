import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import date from "date-and-time";
import { UserContext } from "../contextAPI/AuthContext";
import Loading from "../components/Loading";
import LazyLoad from "react-lazyload";
import Category from "../components/Category";

const Home = () => {
  const { loading, setLoading, error, setError } = UserContext();
  const [userPost, setUserPost] = useState();

  
  
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          "https://byte-breakdown1.onrender.com/user/all-post",
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

 

  // if (loading) {
  //   return <Loading />;
  // }

  // if (error) {
  //   return <div>Error: {error}</div>;
  // }





  return (
    // <div className="flex flex-col gap-8 my-9">

    //   {userPost &&
    //     userPost?.map((post) => (
    //       <div
    //         key={post._id}
    //         className="mx-12 h-[395px] xxs:mx-[70px] sm:mx-28 sm:h-auto px-1 py-5 shadow-lg hover:shadow-2xl transition-shadow duration-300
    //                                  md:w-fit lg:w-[976px] lg:justify-start  md:h-52 flex items-start justify-center
    //                                  bg-white border-2 rounded-2xl"
    //       >
    //         <Link to={`/post/${post._id}`}>
    //           <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-10 px-4">
    //             <div className="max-w-[300px] h-[180px]  md:h-44 md:w-80   flex-shrink-0">
    //               <img
    //                 className="w-full h-full object-cover rounded-xl"
    //                 src={"https://byte-breakdown1.onrender.com/" + post.cover}
    //                 loading="lazy"
    //                 alt="Lazy loaded image"
    //               />
    //             </div>

    //             <div className="flex flex-col gap-2 ">
    //               <h1 className="text-xl line-clamp-2 leading-tight md:text-2xl font-semibold md:line-clamp-1 ">
    //                 {post.title}
    //               </h1>

    //               <div className="flex gap-5 text-gray-400 text-sm italic">
    //                 <p>{post.author?.name}</p>
    //                 <p>
    //                   {date.format(new Date(post.createdAt), " MMM DD YYYY")}
    //                 </p>
    //               </div>

    //               <p className="text-s line-clamp-3 leading-tight text-gray-500 md:text-lg md:line-clamp-3 ">
    //                 {" "}
    //                 {post.summary}{" "}
    //               </p>
    //             </div>
    //           </div>
    //         </Link>
    //       </div>
    //     ))}

    // </div>

    <>
      <Category />

      <div
        className="h-full w-full mt-16 md:flex md:flex-row flex flex-col gap-y-16 md:gap-0
                      px-9 "
      >
        {/* Card Section */}
        <div
          className="md:w-[70%] md:h-fit md:px-6 md:pb-5 flex flex-col gap-y-9 
                        w-full px-2 "
        >
          {/* Card Layout */}
         
         {userPost &&
          userPost?.map((post) => (
            <div key={post._id}
                 className="w-full sm:min-h-52  rounded-xl hover:shadow-lg hover:cursor-pointer border-2 border-red-600 bg-yellow-100
                          sm:p-4 sm:flex sm:gap-x-8 sm:h-40 sm:flex-row sm:items-center sm:justify-center
                          flex flex-col justify-center items-center gap-y-5 py-4"
          >
            <div
              className=" sm:w-[35%] sm:h-full border-2 rounded-xl border-white
                            w-[85%] h-[200px]"
            >
              <img
                src={"https://byte-breakdown1.onrender.com/" + post.cover}
                alt="#"
                className="w-full h-full rounded-xl object-cover object-center"
              />
            </div>

            <div className="sm:w-[65%] w-[85%] h-full space-y-3">
              <h1 className="text-base line-clamp-3 xs:text-2xl font-bold xs:line-clamp-2">
              {post.title}
              </h1>

              <div className="flex gap-5">
                <p className="text-xs xs:text-sm">
                  {" "}
                  {date.format(new Date(post.createdAt), " MMM DD YYYY")}
                </p>
                <div className="flex gap-2">
                  <p className="bg-black rounded-3xl w-fit px-1 xs:px-3 py-[2px] xs:py-1 font-medium text-white text-[10px] xs:text-sm">
                    #tailwind
                  </p>
                  <p className="bg-black rounded-3xl w-fit px-1 xs:px-3 py-[2px] xs:py-1 font-medium text-white text-[10px] xs:text-sm">
                    #tailwind
                  </p>
                </div>
              </div>

              <p className=" line-clamp-2 xs:line-clamp-2 lg:line-clamp-2 sm:hidden">
              {post.summary}
              </p>
            </div>
          </div>
          ))




         }

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

          { userPost &&
            userPost?.slice(userPost.length-1, userPost.length-6).map( (post) => (
           <div className="flex gap-4 w-fit bg-white rounded-md p-3">
            <img
               src={"https://byte-breakdown1.onrender.com/" + post.cover}
              alt="#"
              className="max-w-24 max-h-24 rounded-md "
            />

            <div className="flex flex-col gap-3">
              <h1 className="text-sm font-medium line-clamp-3 hover:underline hover:cursor-pointer">
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
           ))
          }
          
          
        </div>
      </div>
    </>
  );
};

export default Home;
