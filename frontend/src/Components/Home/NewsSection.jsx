import React from "react";
import { Clock, ChevronRight } from "lucide-react";

const newsItems = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    category: "Premier League",
    title: "Klopp announces shock Liverpool exit",
    time: "1 hour ago",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    category: "Transfers",
    title: "January transfer window: All the done deals",
    time: "2 hours ago",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
    category: "Premier League",
    title: "Arsenal vs Liverpool: Preview and predictions",
    time: "3 hours ago",
  },
];

const NewsSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest News</h2>
        <button className="text-[#37003c] hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <div className="text-sm text-[#37003c] font-semibold mb-2">{item.category}</div>
              <h3 className="text-lg font-bold mb-3 hover:text-[#37003c] transition-colors">
                {item.title}
              </h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsSection;
