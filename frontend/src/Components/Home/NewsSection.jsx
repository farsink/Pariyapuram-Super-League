import React, { useContext } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { useNews } from "../../context/NewsContext";
import { useNavigate } from "react-router-dom";
import { formatTimeAgo } from "../../utils/NewsFuns";

const NewsSection = () => {
  const { News, metadata } = useNews();
  const navigate = useNavigate();

  console.log(News);

  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-bold'>Latest News</h2>
        <button
          className='text-[#37003c] hover:underline flex items-center gap-1'
          onClick={() => navigate("/news")}
        >
          View All <ChevronRight className='w-4 h-4' />
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {News && News.length > 0 ? (
          News.map((item) => (
            <div
              key={item._id}
              className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow'
            >
              <img
                src={item.image}
                alt={item.title}
                className='w-full h-48 object-cover'
              />
              <div className='p-4'>
                <div className='text-sm text-[#37003c] font-semibold mb-2'>
                  {item.category}
                </div>
                <h3 className='text-lg font-bold mb-3 hover:text-[#37003c] transition-colors'>
                  {item.title}
                </h3>
                <div className='flex items-center text-gray-500 text-sm'>
                  <Clock className='w-4 h-4 mr-1' />
                  {formatTimeAgo(item.createdAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>No news available</div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
