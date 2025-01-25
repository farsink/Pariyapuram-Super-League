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
{" "}

// fetch all players
export const getPlayers = async () => {
  const response = await AxiosConfig(`${serverurl}/api/player/getAll`, "GET", null, null);

  return await response;
};