import { motion } from "framer-motion";
import NewsGrid from "./NewsGrid";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useNews } from "../../context/NewsContext";
import FeaturedNews from "./Featured";
// import FeaturedNews from "./Featured";

const NewsContainer = ({ searchQuery = "" }) => {
  const { News, metadata, setpage, page } = useNews();

  const filteredNews = News.filter((article) =>
    article.title.toLowerCase().includes(searchQuery?.toLowerCase())
  );
  console.log(filteredNews);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const handleNextPage = () => {
    setpage((prev) => Math.min(prev + 1, metadata.totalPages));
  };

  const handlePrevPage = () => {
    setpage((prev) => Math.max(prev - 1, 1));
  };

  const currentArticles = News.slice(1, 10);

  return (
    <div className='min-h-screen bg-[#F7F7F2] relative'>
      <motion.div
        className='w-full pt-6 pb-6 px-4 md:px-6'
        initial='hidden'
        animate='visible'
        variants={containerVariants}
      >
        <div className='max-w-7xl mx-auto'>
          <motion.div variants={containerVariants}>
            {News[0] && <FeaturedNews article={News[0]} />}
          </motion.div>

          <NewsGrid articles={currentArticles} />
        </div>
      </motion.div>

      {/* Pagination Controls */}
      <div className='flex justify-center gap-4 m-4 bg-[#F7F7F2] '>
        {page > 1 && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handlePrevPage}
            className='group flex items-center gap-1.5 px-4 py-2 bg-[#37003c] text-white rounded-full hover:bg-[#4a0050] transition-all duration-300 text-sm'
          >
            <ArrowLeft className='w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform duration-300' />
            <span>Previous</span>
          </motion.button>
        )}
        {page < metadata.totalPages && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleNextPage}
            className='group flex items-center gap-1.5 px-4 py-2 bg-[#37003c] text-white rounded-full hover:bg-[#4a0050] transition-all duration-300 text-sm'
          >
            <span>Next</span>
            <ArrowRight className='w-3.5 h-3.5 group-hover:translate-x-1 transition-transform duration-300' />
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default NewsContainer;
