// playerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getPlayers } from "../../Api/ApiList";

const initialState = {
  players: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

// Async Thunks
export const fetchPlayers = createAsyncThunk("players/fetchPlayers", async () => {
  const response = await getPlayers();
  return response.data;
});

export const createPlayer = createAsyncThunk("players/createPlayer", async (playerData) => {
  const response = await axios.post("/api/players", playerData);
  return response.data;
});

export const updatePlayer = createAsyncThunk(
  "players/updatePlayer",
  async ({ id, updatedData }) => {
    const response = await axios.patch(`/api/players/${id}`, updatedData);
    return response.data;
  }
);

export const deletePlayer = createAsyncThunk("players/deletePlayer", async (playerId) => {
  await axios.delete(`/api/players/${playerId}`);
  return playerId;
});

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // Fetch Players
      .addCase(fetchPlayers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.players = action.payload;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Create Player
      .addCase(createPlayer.fulfilled, (state, action) => {
        state.players.push(action.payload);
      })

      // Update Player
      .addCase(updatePlayer.fulfilled, (state, action) => {
        const index = state.players.findIndex((player) => player._id === action.payload._id);
        if (index !== -1) {
          state.players[index] = action.payload;
        }
      })

      // Delete Player
      .addCase(deletePlayer.fulfilled, (state, action) => {
        state.players = state.players.filter((player) => player._id !== action.payload);
      });
  },
});

export const selectAllPlayers = (state) => state.players.players;
export const getPlayersStatus = (state) => state.players.status;
export const getPlayersError = (state) => state.players.error;

export default playerSlice.reducer;
