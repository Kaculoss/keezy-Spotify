import React from "react";
import { useData } from "../utilities";
import { Header } from "./Header";
import { FaPlayCircle } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { FiMoreHorizontal } from "react-icons/fi";
import { SongRow } from "./SongRow";

export const Body = ({ spotifyWebApi }) => {
  const [{ discoverWeekly, dispatch }] = useData();

  const playPlaylist = () => {
    spotifyWebApi
      .play({
        context_uri: `spotify:playlist:6ehdSiG3d2TinBXr1r7ZK0`,
      })
      .then((resp) => {
        spotifyWebApi.getMyCurrentPlayingTrack().then((res) => {
          dispatch({ type: "SET_ITEM", item: res?.item });
          dispatch({ type: "SET_PLAYING", playing: true });
        });
      });
  };

  const playSong = (id) => {
    spotifyWebApi.play({ uris: [`spotify:track:${id}`] }).then((resp) => {
      spotifyWebApi.getMyCurrentPlayingTrack().then((res) => {
        dispatch({ type: "SET_ITEM", item: res?.item });
        dispatch({ type: "SET_PLAYING", playing: true });
      });
    });
  };

  return (
    <div className="body">
      <Header />
      <div className="body_info">
        {discoverWeekly && (
          <>
            <img src={discoverWeekly?.images[0].url} alt="" />
            <div className="body_infoText">
              <strong>PLAYLIST</strong>
              <h2>Discover Weekly</h2>
              <p>{discoverWeekly?.description}</p>
            </div>
          </>
        )}
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <FaPlayCircle
            size={"4.5rem"}
            className="body_shuffle body_icon"
            onClick={playPlaylist}
          />
          <MdFavorite size={"3rem"} className="body_icon" />
          <FiMoreHorizontal size={"2rem"} className="body_icon" />
        </div>
        {discoverWeekly && (
          <>
            {discoverWeekly?.tracks?.items?.map((item, index) => {
              return (
                <SongRow key={index} track={item.track} playSong={playSong} />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
