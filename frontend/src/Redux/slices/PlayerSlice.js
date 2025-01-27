// playerSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deletePlayerID, getPlayers, createPlayer, updatePlayer } from "../../Api/ApiList";

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

export const createPlayerAsyncThunk = createAsyncThunk("players/createPlayer", async (playerData) => {
  const response = await createPlayer(playerData);
  return response.data;
});

export const updatePlayerAsyncThunk = createAsyncThunk(
  "players/updatePlayer",
  async ({ id, updatedData }) => {
    const response = await updatePlayer(id, updatedData);
    return response.data;
  }
);

export const deletePlayer = createAsyncThunk("players/deletePlayer", async (playerId) => {
  await deletePlayerID(playerId);
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
      .addCase(createPlayerAsyncThunk.fulfilled, (state, action) => {
        state.players.push(action.payload);
      })

      // Update Player
      .addCase(updatePlayerAsyncThunk.fulfilled, (state, action) => {
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
