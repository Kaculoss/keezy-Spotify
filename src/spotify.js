const clientID = "a16a11477d0d41d29b7f60ace1be9438";
const redirectURI = "https://keezy-spotify.netlify.app";
// const redirectURI = "http://localhost:3000";
const authEndpoint = "https://accounts.spotify.com/authorize";
const responseType = "token";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
];

export const loginURL = `${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&scope=${scopes.join(
  "%20"
)}&response_type=${responseType}&show_dialog=true`;

export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .find((elem) => elem.startsWith("access_token"))
    .split("=")[1];
};
