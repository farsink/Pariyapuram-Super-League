import React from "react";

const HeroSection = () => {
  return (
    <div className='bg-[#37003c] text-white relative overflow-hidden'>
      <div
        className="absolute inset-0 bg-[url('/assets/Home.jpg')] opacity-10"
        style={{
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className='max-w-7xl mx-auto px-4 py-8 md:py-12 relative'>
        <div className='flex flex-col md:flex-row items-center gap-6 mb-8'>
          <img
            src='..//assets/psl-logo1.png'
            alt='pariyapuram League Logo'
            className='w-16 h-16 md:w-16 md:h-16'
          />
          <h1 className='text-4xl text-white md:text-6xl lg:text-7xl font-bold tracking-tight text-center md:text-left'>
            Pariyapuram Super League
          </h1>
        </div>
        <h2 className='text-xl md:text-2xl lg:text-2xl font-semibold mt-4 ml-4 text-textColor'>
          FIXTURES, LIVE SCORES & RESULTS
        </h2>
      </div>
    </div>
  );
};

export default HeroSection;
