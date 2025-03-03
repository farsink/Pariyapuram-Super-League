import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getTickets, updateTicket } from "../../Api/ApiList";

// Async Thunk for fetching tickets
export const fetchTickets = createAsyncThunk("tickets/fetchTickets", async () => {
  const response = await getTickets(); // Replace with your API endpoint
  return response.data;
});

// Async Thunk for updating a ticket
export const updateTicketAsync = createAsyncThunk("tickets/updateTicket", async ({ id, formData }) => {
  const response = await updateTicket(id, formData); // Replace with your API endpoint
  return response.data;
});

const ticketSlice = createSlice({
  name: "tickets",
  initialState: {
    tickets: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Tickets
      .addCase(fetchTickets.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update Ticket
      .addCase(updateTicketAsync.fulfilled, (state, action) => {
        const index = state.tickets.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      });
  },
});

export default ticketSlice.reducer;