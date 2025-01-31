import { AxiosConfig } from "./AxiosConfig";
import { serverurl } from "./ServerURL";

// TEAM API'S
// fetch all
export const getTeams = async () => {
  const response = await AxiosConfig(`${serverurl}/api/team/GetAll`, "GET", null, null);

  return await response;
};

//add team

export const addTeam = async (formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/team/create`,
    "POST",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};

// delete team by id
export const deleteTeam = async (teamId) => {
  const response = await AxiosConfig(`${serverurl}/api/team/${teamId}`, "DELETE");
  return await response;
};

// update team by id
export const updateTeam = async (teamId, formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/team/${teamId}`,
    "PUT",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};

//Player API'S
{
  (" ");
}

// fetch all players
export const getPlayers = async () => {
  const response = await AxiosConfig(`${serverurl}/api/player/getAll`, "GET", null, null);

  return await response;
};
// create a new player

export const createPlayer = async (formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/player/create`,
    "POST",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};
// Delete By id
export const deletePlayerID = async (playerId) => {
  const response = await AxiosConfig(`${serverurl}/api/player/${playerId}`, "DELETE");
  return await response;
};
//update player by id

export const updatePlayer = async (playerId, formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/player/${playerId}`,
    "PUT",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};

{
  ("Matches");
}

// fetch all matches

export const getMatches = async () => {
  const response = await AxiosConfig(`${serverurl}/api/match/getAll`, "GET", null, null);

  return await response;
};

// add match

export const addMatch = async (matchData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/match/create`,
    "POST",
    { "Content-Type": "application/json" }, // Set the content type to JSON
    matchData // Send matchData directly as JSON
  );
  return response;
};

// delete match by id

export const deleteMatchID = async (matchId) => {
  const response = await AxiosConfig(`${serverurl}/api/match/${matchId}`, "DELETE");
  return await response;
};

// update match by id

export const updateMatch = async (matchId, matchData) => {
 const response = await AxiosConfig(
   `${serverurl}/api/match/${matchId}`,
   "PUT",
   { "Content-Type": "application/json" }, // Set the content type to JSON
   matchData // Send matchData directly as JSON
 );
 return response;
};
