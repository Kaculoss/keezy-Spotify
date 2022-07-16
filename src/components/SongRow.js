import React from "react";

export const SongRow = ({ track, playSong }) => {
  return (
    <div className="songRow" onClick={() => playSong(track.id)}>
      <img
        src={track?.album.images[0].url}
        alt="album"
        className="songRow_album"
      />
      <div className="songRow_info">
        <h1>{track?.name}</h1>
        <p>
          {track?.artists?.map((artist) => artist?.name).join(", ")} -{" "}
          {track?.album?.name}
        </p>
      </div>
    </div>
  );
};
