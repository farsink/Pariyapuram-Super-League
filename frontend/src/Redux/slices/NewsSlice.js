import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNews, updateNews, deleteNewsID, getallNews } from "../../Api/ApiList";

// Async Thunks
export const fetchNews = createAsyncThunk("news/fetchNews", async () => {
  const response = await getallNews();
  return response.data;
});

export const addNewsAsync = createAsyncThunk("news/addNews", async (newsData) => {
  const response = await addNews(newsData);
  return response.data;
});

export const updateNewsAsync = createAsyncThunk("news/updateNews", async ({ id, newsData }) => {
  const response = await updateNews(id, newsData);
  return response.data;
});

export const deleteNewsAsync = createAsyncThunk("news/deleteNews", async (newsId) => {
  await deleteNewsID(newsId);
  return newsId;
});

// Slice
const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch News
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add News
      .addCase(addNewsAsync.fulfilled, (state, action) => {
        state.news.push(action.payload);
      })

      // Update News
      .addCase(updateNewsAsync.fulfilled, (state, action) => {
        const index = state.news.findIndex((news) => news._id === action.payload._id);
        if (index !== -1) {
          state.news[index] = action.payload;
        }
      })

      // Delete News
      .addCase(deleteNewsAsync.fulfilled, (state, action) => {
        state.news = state.news.filter((news) => news._id !== action.payload);
      });
  },
});

export default newsSlice.reducer;