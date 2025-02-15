import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import date from "date-and-time";
import { UserContext } from "../contextAPI/AuthContext";
import Loading from "../components/Loading";
import { BASE_URL } from "../utils/FetchAPI";
import { CgProfile } from "react-icons/cg";

const SinglePost = () => {
  const { loading, setLoading, error, setError } = UserContext();
  const [onePost, setOnePost] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/user/post/${id}`, {
          method: "GET",
          credentials: "include",
        });
        const result = await response.json();
        setOnePost(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full mx-auto flex justify-center items-center ">
      <div className="w-full text-justify flex flex-col justify-center items-center gap-10  my-16 px-10 sm:px-20 md:px-36">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-5 leading-none md:leading-tight">
            {onePost.title}
          </h1>

          <div className="flex gap-3 text-sm md:text-base text-gray-500 mt-8 px-2 items-center">
            <CgProfile className="w-6 h-6 sm:w-8 sm:h-8" />
            <p className="italic">{onePost.author?.name},</p>
            <p>{date.format(new Date(onePost.createdAt), " MMM DD, YYYY")}</p>
          </div>
        </div>

        <div className="w-full h-auto overflow-hidden px-10">
          <img
            src={`http://localhost:8000/` + onePost.cover}
            className="w-full h-auto   object-cover"
          />
        </div>

        <div className="my-4 text-lg md:text-xl font-semibold w-full text-justify text-slate-700">
          {onePost.summary}
        </div>

        <div className="border-t-2 w-full"></div>

        <div
          className="text-sm md:text-base w-full text-justify text-pretty leading-normal"
          dangerouslySetInnerHTML={{ __html: onePost.content }}
        />
      </div>
    </div>
  );
};

export default SinglePost;
