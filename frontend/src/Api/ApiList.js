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


{"News"}

// fetch all news

export const getNews = async (page = 1, limit = 10) => {
  const response = await AxiosConfig(`${serverurl}/api/news/getall?page=${page}&limit=${limit}`, "GET", null, null);

  return await response;
};


export const addNews = async (newsData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/news/create`,
    "POST",
    { }, // Set the content type to JSON
    newsData // Send newsData directly as JSON
  );
  return response;
};

export const updateNews = async (newsId, newsData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/news/${newsId}`,
    "PUT",
    { }, // Set the content type to JSON
    newsData // Send newsData directly as JSON
  );
  return response;
};

export const deleteNewsID = async (newsId) => {
  const response = await AxiosConfig(`${serverurl}/api/news/${newsId}`, "DELETE");
  return await response;
};


{"Seat Availablity"}

// fetch match seat availability

export const getSeatAvailability = async (matchId) => {
  const response = await AxiosConfig(`${serverurl}/api/seats/${matchId}`, "GET", null, null);

  return await response;
};


{"Ticket"}

// fetch all tickets

export const getTickets = async () => {
  const response = await AxiosConfig(`${serverurl}/api/ticket/GetAll`, "GET", null, null);

  return await response;
};

// create a new ticket

export const createTicket = async (formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/ticket/create`,
    "POST",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};

//getbyID

export const getTicketByID = async (ticketId) => {
  const response = await AxiosConfig(`${serverurl}/api/ticket/${ticketId}`, "GET", null, null);

  return await response;
};
//update ticket by id

export const updateTicket = async (ticketId, formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/ticket/${ticketId}`,
    "PUT",
    {}, // Empty headers object
    formData // Send FormData directly
  );
  return response;
};


{"videos"}

// fetch all videos

export const fetchVideos = async () => {
  const response = await AxiosConfig(`${serverurl}/api/video/fetch`, "GET", null, null);

  return await response;
};

// get videos

export const getVideos = async () => {
  const response = await AxiosConfig(`${serverurl}/api/video/getVideos`, "GET", null, null);

  return await response;
};

{"gallery"}

// fetch all gallery

export const fetchGallery = async () => {
  const response = await AxiosConfig(`${serverurl}/api/gallery/getall`, "GET", null, null);

  return await response;
}

//upload image

export const uploadImage = async (formData) => {
  const response = await AxiosConfig(
    `${serverurl}/api/gallery/upload`,
    "POST",
    { "Content-Type": "multipart/form-data" }, // Set the content type to multipart
    formData // Send FormData directly
  );
  return response;
};