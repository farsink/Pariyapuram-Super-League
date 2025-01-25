import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addTeam, deleteTeam, getTeams, updateTeam } from "../../Api/ApiList";

// Async Thunk for fetching teams
export const fetchTeams = createAsyncThunk("teams/fetchTeams", async () => {
  const response = await getTeams(); // Replace with your API endpoint
  return response.data;
});

// Async Thunk for adding a team
export const addTeamAsync = createAsyncThunk("teams/addTeam", async (teamData) => {
  const response = await addTeam(teamData); // Replace with your API endpoint
  return response.data;
});

// Async Thunk for updating a team
export const updateTeamAsync = createAsyncThunk("teams/updateTeam", async ({ id, formData }) => {
  const response = await updateTeam(id, formData); // Replace with your API endpoint
  return response.data;
});

// Async Thunk for deleting a team
export const deleteTeamAsync = createAsyncThunk("teams/deleteTeam", async (teamId) => {
  await deleteTeam(teamId); // Replace with your API endpoint
  return teamId;
});

const teamSlice = createSlice({
  name: "teams",
  initialState: {
    teams: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Teams
      .addCase(fetchTeams.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.teams = action.payload;
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Add Team
      .addCase(addTeamAsync.fulfilled, (state, action) => {
        state.teams.push(action.payload);
      })

      // Update Team
      .addCase(updateTeamAsync.fulfilled, (state, action) => {
        const index = state.teams.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.teams[index] = action.payload;
        }
      })

      // Delete Team
      .addCase(deleteTeamAsync.fulfilled, (state, action) => {
        state.teams = state.teams.filter((t) => t._id !== action.payload);
      });
  },
});

export default teamSlice.reducer;
