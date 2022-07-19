import React from "react";
import { SidebarOptions } from "./SidebarOptions";
import { BiLibrary } from "react-icons/bi";
import { AiFillHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { FaSpotify } from "react-icons/fa";
import { useData } from "../utilities";

export const Sidebar = () => {
  const [{ playlists }] = useData();

  return (
    <div className="sidebar">
      <img
        className="sidebar_logo"
        src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg"
        alt="spotify"
      />
      <FaSpotify size={"2.5rem"} className="sidebar_icon" />
      <SidebarOptions title="Home" Icon={AiFillHome} />
      <SidebarOptions title="Search" Icon={FiSearch} />
      <SidebarOptions title="Your Library" Icon={BiLibrary} />
      <br />
      <strong className="sidebar_title">PLAYLISTS</strong>
      <hr />
      {playlists?.items?.map((playlist) => (
        <SidebarOptions key={playlist.id} title={playlist.name} />
      ))}
    </div>
  );
};
