import React, { useState } from "react";
import { Plus } from "lucide-react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
const Gallery = () => {
  const [showDropFiles, setShowDropFiles] = useState(false);
  const { user } = useUserContext();
  const Navigate = useNavigate();
  const images = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&h=700&fit=crop",
      width: 500,
      height: 700,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
      width: 500,
      height: 600,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
      width: 500,
      height: 500,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&h=750&fit=crop",
      width: 500,
      height: 750,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=600&fit=crop",
      width: 500,
      height: 600,
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&h=700&fit=crop",
      width: 500,
      height: 700,
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&h=600&fit=crop",
      width: 500,
      height: 600,
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500&h=750&fit=crop",
      width: 500,
      height: 750,
    },
    {
      id: 9,
      url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&h=500&fit=crop",
      width: 500,
      height: 500,
    },
    {
      id: 10,
      url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&h=700&fit=crop",
      width: 500,
      height: 700,
    },
    {
      id: 11,
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
      width: 500,
      height: 600,
    },
    {
      id: 12,
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&h=500&fit=crop",
      width: 500,
      height: 500,
    },
  ];

  const handleAddImage = () => {
    setShowDropFiles((prev) => !prev); // Handle image addition logic here
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="bg-[#f9f9f9] text-[#37003C] p-4 shadow-lg shadow-[#37003C]">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl md:text-3xl">
            <span className="font-normal">Photo</span> <span className="font-bold">gallery</span>
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4 mb-5">
        {images.map((image) => (
          <div key={image.id} className="break-inside-avoid">
            <img
              src={image.url}
              alt={`Gallery image ${image.id}`}
              className="w-full h-auto rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
              loading="lazy"
            />
          </div>
        ))}
      </div>
      {showDropFiles && <DropFiles />}
      {/* Add Button - Fixed position with different placement based on screen size */}
      <button
        onClick={user ? handleAddImage : () => {Navigate('/login')}}
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:right-8 lg:bottom-8 lg:mb-8 lg:left-auto w-14 h-14 bg-Purple text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors"
        aria-label="Add image"
      >
        <Plus size={26} />
      </button>
    </div>
  );
};
const DropFiles = () => {
  return (
    <StyledWrapper className="fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out">
      <form
        className="file-upload-form shadow-lg transition-transform duration-300 ease-in-out"
        style={{ opacity: DropFiles ? 1 : 0 }}
      >
        <label htmlFor="file" className="file-upload-label">
          <div className="file-upload-design">
            <svg viewBox="0 0 640 512" height="1em">
              <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z" />
            </svg>
            <p>Drag and Drop</p>
            <p>or</p>
            <span className="browse-button">Browse Photos</span>
          </div>
          <input id="file" type="file" />
        </label>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .file-upload-form {
    width: fit-content;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .file-upload-label input {
    display: none;
  }
  .file-upload-label svg {
    height: 50px;
    fill: var(--accent-color);
    margin-bottom: 20px;
  }
  .file-upload-label {
    cursor: pointer;
    background-color: #ddd;
    padding: 30px 70px;
    border-radius: 40px;
    border: 2px dashed var(--accent-color);
    box-shadow: 0px 0px 200px -50px rgba(0, 0, 0, 0.719);
  }
  .file-upload-design {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .browse-button {
    background-color: var(--purple-color);
    padding: 5px 15px;
    border-radius: 10px;
    color: white;
    transition: all 0.3s;
  }
  .browse-button:hover {
    background-color: rgb(14, 14, 14);
  }
`;
export default Gallery;
