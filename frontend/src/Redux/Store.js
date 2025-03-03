import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./slices/TeamSlice";
import playerReducer from "./slices/PlayerSlice";
import matchReducer from "./slices/MatchSlice";
import ticketReducer from "./slices/TicketSlices";
import newsReducer from "./slices/NewsSlice"; // Import the news slice

const store = configureStore({
  reducer: {
    matches: matchReducer,
    teams: teamReducer,
    players: playerReducer,
    tickets: ticketReducer,
    news: newsReducer, // Add the news reducer
  },
});

export default store;