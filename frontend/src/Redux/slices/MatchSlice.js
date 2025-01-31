import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getMatches, addMatch, updateMatch, deleteMatchID } from "../../Api/ApiList";

// Initial state
const initialState = {
  matches: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async Thunks
export const fetchMatches = createAsyncThunk("matches/fetchMatches", async () => {
  const response = await getMatches();
  return response.data;
});

export const addMatchAsync = createAsyncThunk("matches/addMatch", async (matchData) => {
  const response = await addMatch(matchData);
  return response.data;
});

export const updateMatchAsync = createAsyncThunk(
  "matches/updateMatch",
  async ({ id, matchData }) => {
    const response = await updateMatch(id, matchData);
    return response.data;
  }
);

export const deleteMatchAsync = createAsyncThunk("matches/deleteMatch", async (matchId) => {
  await deleteMatchID(matchId);
  return matchId;
});

// Slice
const matchSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Matches
      .addCase(fetchMatches.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.matches = action.payload;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Match
      .addCase(addMatchAsync.fulfilled, (state, action) => {
        state.matches.push(action.payload);
      })

      // Update Match
      .addCase(updateMatchAsync.fulfilled, (state, action) => {
        const index = state.matches.findIndex((match) => match._id === action.payload._id);
        if (index !== -1) {
          state.matches[index] = action.payload;
        }
      })

      // Delete Match
      .addCase(deleteMatchAsync.fulfilled, (state, action) => {
        state.matches = state.matches.filter((match) => match._id !== action.payload);
      });
  },
});

export default matchSlice.reducer;
