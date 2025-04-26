import React, { useContext } from "react";
import { NewsContext } from "../context/NewsContext";

function News() {
  const { News } = useContext(NewsContext);

  console.log(News);

  return (
    <div className='h-screen bg-gray-800'>
      <h1 className='text-white text-2xl text-center text-bold'>News</h1>
    </div>
  );
}

export default News;
