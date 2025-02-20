import date from "date-and-time";
import React, { useState, useRef, useEffect } from "react";
import { BASE_URL } from "../utils/FetchAPI";


const Card = ({ post }) => {
  const [visibleTags, setVisibleTags] = useState(post.tags);
  const tagsContainerRef = useRef(null);

  // Show no. of tags according it's width
  useEffect(() => {
    const adjustVisibleTags = () => {
      const container = tagsContainerRef.current;
      if (!container) return;

      const containerWidth = container.offsetWidth;
      const tagElements = container.querySelectorAll(".tag");
      let totalWidth = 0;
      const newVisibleTags = [];

      tagElements.forEach((tag) => {
        tag.style.display = "inline-block";
      });

      tagElements.forEach((tag, index) => {
        totalWidth += tag.offsetWidth;
        if (totalWidth <= containerWidth) {
          newVisibleTags.push(post.tags[index]);
        } else {
          tag.style.display = "none";
        }
      });

      setVisibleTags(newVisibleTags);
    };

    adjustVisibleTags();
    window.addEventListener("resize", adjustVisibleTags);

    return () => {
      window.removeEventListener("resize", adjustVisibleTags);
    };
  }, [post.tags]);

  return (
    <div
      key={post._id}
      className=" w-full sm:min-h-52  rounded-2xl hover:scale-105 duration-300 hover:cursor-pointer border-2
                              sm:p-4 sm:flex sm:gap-x-8 sm:h-40 sm:flex-row sm:items-center sm:justify-center
                              flex flex-col justify-center items-center gap-y-5 py-4 overflow-hidden"
    >
      <div
        className=" sm:w-[35%] sm:h-full border-2 rounded-xl border-white
                                w-[90%] h-[200px]"
      >
        <img
          src={`${BASE_URL}/${post.cover}`}
          alt="#"
          className="w-full h-full rounded-xl object-cover object-center"
        />
      </div>

      <div className="sm:w-[65%] w-[85%] h-full space-y-3">
        <h1 className="text-base line-clamp-3 sm:text-xl font-bold xs:line-clamp-2">
          {post.title}
        </h1>

        <div className="flex items-center gap-x-10 ">
          <span className="text-xs xs:text-sm w-fit flex-shrink-0">
            {" "}
            {date.format(new Date(post.createdAt), " MMM DD YYYY")}
          </span>
          <span ref={tagsContainerRef} className="flex items-center gap-2">
            {post.tags?.map((tag, index) => (
              <>
                <p
                  key={index}
                  className="bg-black tag flex-shrink-0 rounded-3xl w-fit px-2 xs:px-3 py-[2px] md:py-[3px] font-medium text-white flex items-center justify-center text-[10px] xs:text-xs"
                >
                  {tag}
                </p>
              </>
            ))}
          </span>
        </div>

        <p className=" line-clamp-2 xs:line-clamp-2 lg:line-clamp-2 text-sm text-slate-500 sm:hidden">
          {post.summary}
        </p>
      </div>
    </div>
  );
};

export default Card;
