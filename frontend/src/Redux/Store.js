import { configureStore } from "@reduxjs/toolkit";
import teamReducer from "./slices/TeamSlice";
import playerReducer from "./slices/PlayerSlice";

const store = configureStore({
  reducer: {
    teams: teamReducer,
    players: playerReducer,
  },
});

export default store;
