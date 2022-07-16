import { Avatar } from "@mui/material";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { useData } from "../utilities";

export const Header = () => {
  const [{ user }] = useData();

  return (
    <div className="header">
      <div className="header_left">
        <FiSearch />
        <input
          type="text"
          placeholder="Search for Artists, Songs, or Podcasts"
        />
      </div>
      <div className="header_right">
        {user && (
          <>
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <h4>{user?.display_name}</h4>
          </>
        )}
      </div>
    </div>
  );
};
