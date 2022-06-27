import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import "./index.css";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Splash from "./components/SplashPage/Splash";
import SongsPage from "./components/SongPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [song, setSong] = useState("");
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentSongName, setCurrentSongName] = useState(
    "No Songs Currently Playing"
  );
  const player = useRef();

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const oneSong = async (singleSong) => {
    setCurrentSongName(singleSong.title);
    await setSong(`${singleSong.songUrl}`);
    setPlaylist([]);
    player.current.song.current.play(song);
  };

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Splash oneSong={oneSong}/>
          </Route>
          <Route path='/songs'>
            <SongsPage />
          </Route>
          <Route >
            Page Not Found
          </Route>
        </Switch>
     )}
    </>
  );
}

export default App;
