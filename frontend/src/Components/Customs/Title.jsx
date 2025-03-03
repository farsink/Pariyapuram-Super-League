import React from 'react';

const Title = ({ title }) => {
  const words = title.split(" ");
  return (
    <div className="bg-[#f9f9f9] text-[#37003C] p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl">
          {words.length > 1 ? (
            <>
              <span className="font-normal">{words[0]}</span> <span className="font-bold">{words.slice(1).join(" ")}</span>
            </>
          ) : (
            <span className="font-bold">{data}</span>
          )}
        </h1>
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium"></span>
          <span className="text-xs text-gray-600"></span>
        </div>
      </div>
    </div>
  );
};

export default Title;