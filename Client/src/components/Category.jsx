import React, { useState } from "react";
import downArrow from "/assets/downArrow.png";
import { hiddenCat, categories } from "../utils/data";

const Category = ({ tagPostShown }) => {
  const [expand, setExpand] = useState(true);

  function handleTagCategory(tag) {
    tagPostShown(tag);
  }

  return (
    <div className="h-fit w-full  my-6 flex flex-col items-center justify-center space-y-4">
      <h1 className="py-1  text-center text-xl border-2 border-black rounded-3xl px-6 w-fit font-semibold">
        Category
      </h1>

      <div className="w-full px-10 pt-5 flex flex-wrap justify-center gap-y-5 gap-x-3">
        {categories.map((cat) => (
          <div
            key={cat}
            onClick={() => handleTagCategory(cat)}
            className="w-fit rounded-xl px-4 py-1 bg-black text-white text-sm font-medium hover:cursor-pointer hover:scale-105 duration-150"
          >
            {cat}
          </div>
        ))}

        {!expand ? (
          hiddenCat.map((cats) => (
            <div
              key={cats}
              onClick={() => handleTagCategory(cats)}
              className="w-fit rounded-xl px-4 py-1 bg-black text-white text-sm font-medium hover:cursor-pointer hover:scale-105 hover:duration-150"
            >
              {cats}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>

      <div className="w-11/12 mx-auto mt-5 flex items-center justify-center">
        <div className="border-b-2 w-full flex justify-center items-center">
          <div
            onClick={() => setExpand(!expand)}
            className="p-2   relative top-5 bg-white hover:cursor-pointer w-fit h-fit rounded-full border-[1px] flex justify-center items-center"
          >
            {!expand ? (
              <img src={downArrow} alt="#" className="h-5 w-5 rotate-180" />
            ) : (
              <img src={downArrow} alt="#" className="h-5 w-5" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
