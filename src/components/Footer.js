import React, { useEffect } from "react";
import {
  FaRegPlayCircle,
  FaRegPauseCircle,
  FaVolumeDown,
} from "react-icons/fa";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { BiShuffle, BiRepeat } from "react-icons/bi";
import { Slider, Stack } from "@mui/material";
import { RiPlayListFill } from "react-icons/ri";
import { useData } from "../utilities";

export function Footer({ spotifyWebApi }) {
  const [{ item, playing }, dispatch] = useData();

  useEffect(() => {
    spotifyWebApi.getMyCurrentPlaybackState().then((resp) => {
      console.log(resp);

      dispatch({ type: "SET_PLAYING", playing: resp?.is_playing });

      dispatch({ type: "SET_ITEM", item: resp?.item });
    });
  }, [spotifyWebApi, dispatch]);

  const handlePlayPause = () => {
    if (playing) {
      spotifyWebApi.pause();
      dispatch({ type: "SET_PLAYING", playing: false });
    } else {
      spotifyWebApi.play();
      dispatch({ type: "SET_PLAYING", playing: true });
    }
  };

  const skipNext = () => {
    spotifyWebApi.skipToNext();
    spotifyWebApi.getMyCurrentPlayingTrack().then((resp) => {
      dispatch({ type: "SET_ITEM", item: resp?.item });
      dispatch({ type: "SET_PLAYING", playing: true });
    });
  };

  const skipPrevious = () => {
    spotifyWebApi.skipToPrevious();
    spotifyWebApi.getMyCurrentPlayingTrack().then((resp) => {
      dispatch({ type: "SET_ITEM", item: resp?.item });
      dispatch({ type: "SET_PLAYING", playing: true });
    });
  };

  return (
    <div className="footer">
      <div className="footer_left">
        <img
          src={item?.album.images[0].url}
          alt={item?.name}
          className="footer_albumLogo"
        />
        {item ? (
          <div className="footer_songInfo">
            <h4>{item.name}</h4>
            <p>{item.artists.map((artist) => artist.name).join(", ")}</p>
          </div>
        ) : (
          <div className="footer_songInfo">
            <h4>No song is playing</h4>
            <p>...</p>
          </div>
        )}
      </div>

      <div className="footer_center">
        <BiShuffle className="footer_green" size={"2rem"} />
        <MdSkipPrevious
          className="footer_icon"
          size={"2rem"}
          onClick={skipNext}
        />
        {playing ? (
          <FaRegPauseCircle
            className="footer_icon"
            fontSize={"large"}
            size={"3rem"}
            onClick={handlePlayPause}
          />
        ) : (
          <FaRegPlayCircle
            className="footer_icon"
            fontSize={"large"}
            size={"3rem"}
            onClick={handlePlayPause}
          />
        )}
        <MdSkipNext
          className="footer_icon"
          size={"2rem"}
          onClick={skipPrevious}
        />
        <BiRepeat className="footer_green" size={"2rem"} />
      </div>
      <div className="footer_right">
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1 }}
          alignItems="center"
          marginBottom={"0rem"}
          width={"100%"}
          color={"#ffffff"}
          maxWidth={"300px"}
        >
          <RiPlayListFill size={"2rem"} />
          <FaVolumeDown size={"2rem"} />
          <Slider aria-label="Volume" />
        </Stack>
      </div>
    </div>
  );
}
