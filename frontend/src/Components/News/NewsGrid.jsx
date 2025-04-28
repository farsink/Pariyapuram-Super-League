import React from "react";
import { motion } from "framer-motion";
import NewsCard from "./Newscard";

const NewsGrid = ({ articles }) => {
  return (
    <motion.div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {articles.map((article) => (
        <NewsCard key={article._id} article={article} />
      ))}
    </motion.div>
  );
};

export default NewsGrid;
