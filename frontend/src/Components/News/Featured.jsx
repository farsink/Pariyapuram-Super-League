import { motion } from "framer-motion";
import { Clock, Bookmark } from "lucide-react";
import SourceBadge from "./SourceBadge";
import { formatTimeAgo } from "../../utils/NewsFuns";

const FeaturedNews = ({ article }) => {
  const { title, image, category, description, createdAt } = article;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className='mb-10 overflow-hidden rounded-xl shadow-md bg-white transition-all duration-300 hover:shadow-lg'
    >
      <div className='md:flex'>
        <div className='md:w-3/5 relative'>
          <img
            src={image}
            alt={title}
            className='w-full h-64 md:h-full object-cover'
          />
        </div>

        <div className='md:w-2/5 p-5 md:p-6'>
          <div className='flex justify-between items-start mb-3'>
            <h2 className='text-xl md:text-2xl font-bold text-gray-900 leading-tight'>
              {title}
            </h2>
            <button
              className='text-gray-400 hover:text-gray-700 transition-colors p-1'
              aria-label='Bookmark this article'
            >
              <Bookmark size={20} />
            </button>
          </div>

          <p className='text-gray-600 mb-4 line-clamp-3 md:line-clamp-4'>
            {description}
          </p>

          <div className='flex items-center justify-between mt-auto'>
            <SourceBadge source={category} />

            <div className='flex items-center text-gray-500 text-sm'>
              <Clock size={14} className='mr-1' />
              <span>{formatTimeAgo(createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedNews;
