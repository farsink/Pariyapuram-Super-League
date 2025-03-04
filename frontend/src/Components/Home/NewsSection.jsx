import React, { useEffect, useState } from "react";
import { Clock, ChevronRight } from "lucide-react";
import { getNews } from "../../Api/ApiList";
import { serverurl } from "../../Api/ServerURL";

const NewsSection = () => {
  const [News, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await getNews();
      setNews(response.data);
    };
    fetchNews();
  }, []);


  const formatTimeAgo = (dateString) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const timeDiff = now - postDate;
    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days === 0) {
      return hours === 0 ? `${minutes}m ago` : `${hours}hours ago`;
    } else {
      return days === 1 ? "Yesterday" : `${days}days ago`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <button className="text-[#37003c] hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {News.length > 0 ? (
          News.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="text-sm text-[#37003c] font-semibold mb-2">{item.category}</div>
                <h3 className="text-lg font-bold mb-3 hover:text-[#37003c] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock className="w-4 h-4 mr-1" />
                  {formatTimeAgo(item.createdAt)}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">No news available</div>
        )}
      </div>
    </div>
  );
};

export default NewsSection;
