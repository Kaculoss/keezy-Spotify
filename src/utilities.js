import React, { createContext, useContext, useReducer } from "react";

const dataContext = createContext();

export const DataLayer = ({ initialState, reducer, children }) => {
  return (
    <dataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </dataContext.Provider>
  );
};

export const useData = () => useContext(dataContext);

export const initialState = {
  user: null,
  spotify: null,
  playlists: [],
  playing: false,
  item: null,
  discoverWeekly: null,
  top_artists: null,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };

    case "LOGOUT":
      return { ...state, token: "" };

    case "SET_USER":
      return { ...state, user: action.user };

    case "SET_PLAYLISTS":
      return { ...state, playlists: action.playlists };

    case "SET_DISCOVER_WEEKLY":
      return { ...state, discoverWeekly: action.discover_weekly };

    case "SET_PLAYING":
      return { ...state, playing: action.playing };

    case "SET_ITEM":
      return { ...state, item: action.item };

    case "SET_TOP_ARTISTS":
      return { ...state, top_artists: action.top_artists };

    case "SET_SPOTIFY":
      return { ...state, spotify: action.spotify };

    default:
      return state;
  }
};
