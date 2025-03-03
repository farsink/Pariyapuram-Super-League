import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X } from "lucide-react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  addNewsAsync,
  updateNewsAsync,
  deleteNewsAsync,
} from "../../Redux/slices/NewsSlice";
import { Slide, toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const NewsContainer = styled.div`
  .news-form {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
    transition: all 0.3s ease;
  }

  .news-card {
    background: #1f2937;
    border-radius: 0.75rem;
    border: 1px solid #374151;
  }
`;

const NewsAdmin = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);

  const dispatch = useDispatch();
  const { news, status, error } = useSelector((state) => state.news);

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newsData = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: formData.get("image"),
      category: formData.get("category"),
    };

    try {
      let response;
      if (editingNews) {
        response = await dispatch(
          updateNewsAsync({ id: editingNews._id, newsData })
        );
        toast.success("News updated");
      } else {
        response = await dispatch(addNewsAsync(newsData));
        toast.success("News added");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    dispatch(fetchNews());
    setShowForm(false);
    setEditingNews(null);
    setSelectedNews(null);
  };

  const handleDelete = async (id) => {
    try {
      const confirmation = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#ef4444",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete it!",
      });

      if (confirmation.isConfirmed) {
        const response = await dispatch(deleteNewsAsync(id));

        if (response.meta.requestStatus === "fulfilled") {
          Swal.fire("Deleted!", "News deleted successfully!", "success");
        } else {
          Swal.fire("Error!", "Error deleting news", "error");
        }
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      Swal.fire(
        "Error!",
        "An unexpected error occurred while deleting the news.",
        "error"
      );
    } finally {
      setSelectedNews(null);
    }
  };

  if (status === "error") {
    return (
      <NewsContainer>
        <p className='text-red-500'>An error occurred: {error}</p>
      </NewsContainer>
    );
  }

  return (
    <NewsContainer>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme='dark'
      />
      <div className='flex justify-between items-center mb-6'>
        <div>
          <h1 className='text-2xl font-bold text-white'>News Management</h1>
          <p className='text-gray-400'>Manage news articles and updates</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className='bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg flex items-center gap-2'
        >
          <Plus size={18} />
          Add New News
        </button>
      </div>

      {showForm && (
        <div className='news-form p-6 mb-8'>
          <h2 className='text-xl font-semibold mb-4 text-white'>
            {editingNews ? "Edit News" : "New News"}
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm text-gray-300 mb-2'>
                  Title
                </label>
                <input
                  name='title'
                  defaultValue={editingNews?.title}
                  className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                  required
                />
              </div>
              <div>
                <label className='block text-sm text-gray-300 mb-2'>
                  Category
                </label>
                <input
                  name='category'
                  defaultValue={editingNews?.category}
                  className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                  required
                />
              </div>
            </div>
            <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Description
              </label>
              <textarea
                name='description'
                defaultValue={editingNews?.description}
                className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                required
              />
            </div>
            <div>
              <label className='block text-sm text-gray-300 mb-2'>
                Image URL
              </label>
              <input
                name='image'
                defaultValue={editingNews?.image}
                className='w-full bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-600'
                required
              />
            </div>
            <div className='flex justify-end gap-3 mt-6'>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false);
                  setEditingNews(null);
                }}
                className='px-4 py-2 text-gray-300 hover:text-white'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg'
              >
                {editingNews ? "Update" : "Create"} News
              </button>
            </div>
          </form>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {news &&
          news.map((newsItem) => (
            <div
              key={newsItem._id}
              className='news-card p-6 cursor-pointer'
              onClick={() => {
                setSelectedNews(newsItem);
                setShowForm(false);
              }}
            >
              <div className='flex items-center space-x-4 mb-4'>
                <img
                  src={newsItem.image}
                  alt={newsItem.title}
                  className='w-16 h-16 rounded-full'
                />
                <div>
                  <h3 className='text-lg font-semibold text-white'>
                    {newsItem.title}
                  </h3>
                  <p className='text-sm text-gray-400'>{newsItem.category}</p>
                </div>
              </div>
              <div className='text-sm text-gray-400 space-y-2'>
                <p>{newsItem.description}</p>
              </div>
              <div className='flex justify-end gap-3 mt-4'>
                <button
                  onClick={() => {
                    setEditingNews(newsItem);
                    setShowForm(true);
                  }}
                  className='text-indigo-400 hover:text-indigo-300'
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => handleDelete(newsItem._id)}
                  className='text-red-400 hover:text-red-300'
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </NewsContainer>
  );
};

export default NewsAdmin;
