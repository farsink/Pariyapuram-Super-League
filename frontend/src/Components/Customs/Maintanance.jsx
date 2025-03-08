import React from 'react'

function Maintanance({button = false , Buttontext , Heading , SubHeading , Image }) {
  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-red-100 border border-red-500 rounded p-4'>
        <p className='text-red-700 font-bold'>{Heading}</p>
        <p className='text-red-600'>{SubHeading}</p>
        <img src={Image} className='w-1/4 max-h-1/4' alt='' />
       { button && <button
          className='mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => Navigate("/login")}
        >
          { Buttontext}
        </button>}
      </div>
    </div>
  );
}

export default Maintanance
