import { useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import "./App.css";
import { Login } from "./components/Login";
import { Player } from "./components/Player";
import { getTokenFromUrl } from "./spotify";
import { useData } from "./utilities";

const spotifyWebApi = new SpotifyWebApi();

function App() {
  const [{ token }, dispatch] = useData();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const _token = getTokenFromUrl();
      window.location.hash = "";

      if (_token) {
        dispatch({ type: "SET_TOKEN", token: _token });

        dispatch({ type: "SET_SPOTIFY", spotify: spotifyWebApi });

        spotifyWebApi.setAccessToken(_token);
        spotifyWebApi.getMe().then((user) => {
          dispatch({ type: "SET_USER", user });
        });

        spotifyWebApi.getUserPlaylists().then((playlists) => {
          dispatch({ type: "SET_PLAYLISTS", playlists });
        });

        spotifyWebApi.getPlaylist("6ehdSiG3d2TinBXr1r7ZK0").then((resp) => {
          dispatch({ type: "SET_DISCOVER_WEEKLY", discover_weekly: resp });
        });

        spotifyWebApi
          .getMyTopArtists()
          .then((resp) =>
            dispatch({ type: "SET_TOP_ARTISTS", top_artists: resp })
          );
      }
    }
  }, [token, dispatch]);

  return (
    <div className="App">
      {token ? <Player spotifyWebApi={spotifyWebApi} /> : <Login />}
    </div>
  );
}

export default App;
