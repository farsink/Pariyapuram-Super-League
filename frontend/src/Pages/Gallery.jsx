import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchGallery, uploadImage } from "../Api/ApiList";
import { serverurl } from "../Api/ServerURL";
import Loader from "../Components/Customs/Loader";
const Gallery = () => {
  const [images, setimages] = useState([]);
  const [showDropFiles, setShowDropFiles] = useState(false);
  const { user } = useUserContext();
  const Navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetchGallery();
        setimages(response.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    })();
  }, []);

  if (images.length === 0)
    return (
      <div className='w-full max-w-7xl mx-auto'>
        <div className='bg-[#f9f9f9] text-[#37003C] p-4 shadow-lg shadow-[#37003C]'>
          <div className='flex items-center justify-between'>
            <h1 className='text-2xl md:text-3xl'>
              <span className='font-normal'>Photo</span>{" "}
              <span className='font-bold'>gallery</span>
            </h1>
          </div>
        </div>
        <div className='flex justify-center'>
          <Loader />
        </div>
      </div>
    );

  const handleAddImage = async (files) => {
    setShowDropFiles((prev) => !prev); // Toggle the drop files component
    if (files && files.length > 0) {
      const file = files[0]; // Only handle the first file
      const acceptedTypes = ["image/jpeg", "image/heic", "image/png"];
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes

      if (!acceptedTypes.includes(file.type)) {
        alert(`Only ${acceptedTypes.join(", ")} files are accepted.`);
        return;
      }

      if (file.size > maxSize) {
        alert(`File size must be less than ${maxSize / 1024 / 1024}MB.`);
        return;
      }

      try {
        const formData = new FormData();
        formData.append("image", file); // Append the single file
        formData.append("user", user?.username || "USER"); // Append the user ID
        const response = await uploadImage(formData); // Upload the image to the server
        setimages((prevImages) => [...prevImages, response.data]); // Update the images state
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className='w-full max-w-7xl mx-auto'>
      <div className='bg-[#f9f9f9] text-[#37003C] p-4 shadow-lg shadow-[#37003C]'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl md:text-3xl'>
            <span className='font-normal'>Photo</span>{" "}
            <span className='font-bold'>gallery</span>
          </h1>
        </div>
      </div>

      {/* Gallery Grid */}
      <StyledWrapper>
        <div className='columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4 mb-5'>
          {images.map((image) => (
            <div
              key={image._id || image.url}
              className='relative break-inside-avoid group'
            >
              <img
                src={image.url}
                alt={`Gallery image ${image._id}`}
                className='w-full h-auto rounded-lg hover:opacity-90 transition-opacity cursor-pointer'
                loading='lazy'
              />
              <div className='absolute bottom-0 left-0 p-2 bg-black bg-opacity-10 rounded-lg hidden group-hover:block group-hover:opacity-100 transition-opacity duration-300 transform translate-y-full group-hover:translate-y-0'>
                <div className='flex items-center gap-2'>
                  <img
                    src={
                      "https://w7.pngwing.com/pngs/205/731/png-transparent-default-avatar.png"
                    } // Replace 'default-avatar-url' with a default avatar URL if needed
                    alt={image.uploader}
                    className='w-8 h-8 rounded-full object-cover'
                    loading='lazy'
                  />
                  <span className='text-sm text-white'>{image.uploader}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </StyledWrapper>

      {showDropFiles && <DropFiles onAddImage={handleAddImage} />}
      {/* Add Button - Fixed position with different placement based on screen size */}
      <button
        onClick={
          user
            ? () => setShowDropFiles((prev) => !prev)
            : () => {
                Navigate("/login");
              }
        }
        className='fixed bottom-8 left-1/2 transform -translate-x-1/2 lg:right-8 lg:bottom-8 lg:mb-8 lg:left-auto w-14 h-14 bg-Purple text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors border-2 border-accent hover:border-gray-300'
        aria-label='Add image'
      >
        <Plus size={26} />
      </button>
    </div>
  );
};

const DropFiles = ({ onAddImage }) => {
  const handleFileChange = (event) => {
    const files = event.target.files;
    onAddImage(files);
  };
  return (
    <StyledWrapper className='fixed inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out'>
      <form
        className='file-upload-form shadow-lg transition-transform duration-300 ease-in-out'
        style={{ opacity: DropFiles ? 1 : 0 }}
      >
        <label htmlFor='file' className='file-upload-label'>
          <div className='file-upload-design'>
            <svg viewBox='0 0 640 512' height='1em'>
              <path d='M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z' />
            </svg>
            <p>Drag and Drop</p>
            <p>or</p>
            <span className='browse-button'>Browse Photos</span>
          </div>
          <input
            id='file'
            type='file'
            accept='image/jpeg, image/png'
            onChange={handleFileChange}
          />
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
  .relative {
    position: relative;
  }

  .group:hover .opacity-0 {
    opacity: 1;
  }

  .group:hover .translate-y-full {
    transform: translateY(0);
  }

  .transition-opacity {
    transition: opacity 0.3s ease-in-out;
  }

  .transform {
    transform: translateY(100%);
  }

  .group-hover\:translate-y-0:hover {
    transform: translateY(0);
  }
`;
export default Gallery;
