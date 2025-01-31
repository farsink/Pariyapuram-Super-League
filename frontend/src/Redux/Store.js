import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./slices/TeamSlice";
import playerReducer from "./slices/PlayerSlice";
import matchReducer from "./slices/MatchSlice";
const store = configureStore({
  reducer: {
    matches: matchReducer,
    teams: teamReducer,
    players: playerReducer,
  },
});

export default store;
