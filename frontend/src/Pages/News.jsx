import React, { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import { Newspaper, RefreshCcw, Search, Trophy } from "lucide-react";
import NewsContainer from "../Components/News/NewsContainer";

function News() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <>
      <header className='bg-[#f9f9f9] sticky -top-10 sm:-top-5 z-30'>
        <div className='max-w-7xl mx-auto'>
          {/* Main Header */}
          <div className='p-4 shadow-sm'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <Newspaper className='w-8 h-8 text-[#37003C]' />
                <h1 className='text-2xl md:text-3xl text-[#37003C]'>
                  <span className='font-normal'>Top</span>{" "}
                  <span className='font-bold'>News</span>
                </h1>
              </div>
              {/* Desktop Search */}
              <div className='hidden md:flex justify-end items-end flex-1 max-w-xl ml-auto'>
                <div className='relative w-full'>
                  <input
                    type='text'
                    placeholder='Search News...'
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
                  <Search className='w-6 h-6 text-[#37003c]' />
                </button>
              </div>
            </div>
            {/* Mobile Search Bar */}
            {isSearchVisible && (
              <div className='md:hidden mt-4'>
                <div className='relative'>
                  <input
                    type='text'
                    placeholder='Search highlights...'
                    className='w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-[#37003C] pr-10'
                  />
                  <Search className='absolute right-3 top-2.5 w-5 h-5 text-gray-400' />
                </div>
              </div>
            )}
          </div>
        </div>
      </header>
      {/* news Container */}
      <NewsContainer />
    </>
  );
}

export default News;
