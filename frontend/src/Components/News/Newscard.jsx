import React from "react";
import { motion } from "framer-motion";
import { Clock, Bookmark } from "lucide-react";
import SourceBadge from "./SourceBadge";
import { formatTimeAgo } from "../../utils/NewsFuns";

const NewsCard = ({ article }) => {
  const { title, image, category, createdAt } = article;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -4 }}
      className='bg-white rounded-lg overflow-hidden shadow-md h-full transition-all duration-300 hover:shadow-lg'
    >
      <div className='relative'>
        <img src={image} alt={title} className='w-full h-48 object-cover' />
      </div>

      <div className='p-4'>
        <div className='flex justify-between items-start mb-2'>
          <h3 className='font-semibold text-gray-900 line-clamp-2'>{title}</h3>
          <button
            className='text-gray-400 hover:text-gray-700 transition-colors p-1 ml-1 flex-shrink-0'
            aria-label='Bookmark this article'
          >
            <Bookmark size={16} />
          </button>
        </div>

        <div className='flex items-center justify-between mt-3'>
          <SourceBadge source={category} />

          <div className='flex items-center text-gray-500 text-xs'>
            <Clock size={12} className='mr-1' />
            <span>{formatTimeAgo(createdAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
