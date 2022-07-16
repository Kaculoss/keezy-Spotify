import React from "react";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { Sidebar } from "./Sidebar";

export const Player = ({ spotifyWebApi }) => {
  return (
    <div className="player">
      <div className="player_body">
        <Sidebar />
        <Body spotifyWebApi={spotifyWebApi} />
      </div>
      <Footer spotifyWebApi={spotifyWebApi}  />
    </div>
  );
};
