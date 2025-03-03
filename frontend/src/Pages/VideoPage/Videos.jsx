import React, { useEffect, useState } from "react";
import { Trophy, Search, Filter, RefreshCcw } from "lucide-react";
import VideoCard from "./VideoCard";
import VideoModal from "./VideoModal";
import styled, { keyframes } from "styled-components";
import { fetchVideos, getVideos } from "../../Api/ApiList";
import Loader from "../../Components/Customs/Loader";

const categories = ["All Videos"];
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
const AnimateFadeIn = styled.div`
  animation: ${fadeIn} 0.2s ease-out;
`;

const CustomScrollbar = styled.div`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;
function Video() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All Videos");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const getvideos = async () => {
    try {
      const response = await getVideos();

      setVideos(response.data);
      setFilteredVideos(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getvideos();
  }, []);
  useEffect(() => {
    const filtered = videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  const Reload = async () => {
    try {
      const response = await fetchVideos();

      if (response.status === 200) {
        getVideos();
      }
      
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  const selectedVideoData = videos.find((v) => v.videoId === selectedVideo);

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <CustomScrollbar className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-[#f9f9f9] sticky -top-10 sm:-top-5 z-30'>
        <div className='max-w-7xl mx-auto'>
          {/* Main Header */}
          <div className='p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Trophy className='w-8 h-8 text-[#37003C]' />
                <h1 className='text-2xl md:text-3xl text-[#37003C]'>
                  <span className='font-normal'>Highlights</span>{" "}
                  <span className='font-bold'>Hub</span>
                </h1>
              </div>
              {/* Desktop Search */}
              <div className='hidden md:flex items-center flex-1 max-w-2xl mx-8'>
                <div className='relative w-full'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search highlights...'
                    className='w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#37003C] pr-10'
                  />
                  <Search className='absolute right-3 top-2.5 w-5 h-5 text-gray-400' />
                </div>
              </div>
              <div className='flex items-center space-x-2'>
                {/* Mobile Search Toggle */}
                <button
                  className='md:hidden p-2 hover:bg-gray-100 rounded-full'
                  onClick={toggleSearch}
                >
                  <Search className='w-6 h-6 text-[#37003C]' />
                </button>

                <button
                  className='flex items-center space-x-2 px-4 py-2 bg-[#37003C] text-white rounded-full hover:bg-[#250029] transition-colors'
                  onClick={Reload}
                >
                  <RefreshCcw className='w-4 h-4' />
                  <span className='hidden lg:block md:text-sm'>Refresh</span>
                </button>
              </div>
            </div>
            {/* Mobile Search Bar */}
            {isSearchVisible && (
              <div className='md:hidden mt-4'>
                <div className='relative'>
                  <input
                    type='text'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder='Search highlights...'
                    className='w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#37003C] pr-10'
                  />
                  <Search className='absolute right-3 top-2.5 w-5 h-5 text-gray-400' />
                </div>
              </div>
            )}
          </div>
          {/* Categories */}
          <div className='border-t overflow-x-auto'>
            <div className='max-w-7xl mx-auto px-4'>
              <div className='flex space-x-6 py-3'>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      activeCategory === category
                        ? "bg-[#37003C] text-white"
                        : "text-[#37003C] hover:bg-gray-100"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {filteredVideos.length === 0 && (
          <div className='flex justify-center'>
            <Loader />
          </div>
        )}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filteredVideos?.map((video) => (
            <VideoCard
              key={video.videoId}
              {...video}
              onClick={() => handleVideoClick(video.videoId)}
            />
          ))}
        </div>
      </main>
      {/* Video Modal */}
      {selectedVideoData && (
        // <AnimateFadeIn>
        <VideoModal
          videoId={selectedVideoData.videoId}
          title={selectedVideoData.title}
          views={selectedVideoData.views}
          date={selectedVideoData.date}
          competition={selectedVideoData.competition}
          isOpen={!!selectedVideo}
          onClose={handleCloseModal}
        />
        // </AnimateFadeIn>
      )}
    </CustomScrollbar>
  );
}

export default Video;
