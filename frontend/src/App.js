import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { playAllSongs } from "./store/songFile";
import Navigation from "./components/Navigation";
import "./index.css";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Splash from "./components/SplashPage/Splash";
import SongsPage from "./components/SongPage";
import UploadSong from "./components/UploadPage";

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
    dispatch(playAllSongs());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const playSong = async (singleSong) => {
    setCurrentSongName(singleSong.title);
    await setSong(`${singleSong.url}`);
    setPlaylist([]);
    player.current.song.current.play(song);
  };

  return (

      isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Splash playSong={playSong}/>
          </Route>
          <Route path='/songs'>
            <SongsPage playSong={playSong}/>
            <AudioPlayer
            id="musicPlayer"
            src={`${song}`}
            onPlay={(e) => console.log("Playing")}
            ref={player}
            volume={0.05}
            layout="horizontal-reverse"
            showSkipControls={true}
            showJumpControls={false}
            autoPlayAfterSrcChange={true}
            header={`Playing: ${currentSongName}`}
            customAdditionalControls={[]}
          />
          </Route>
          <Route path="upload">
            <UploadSong />
          </Route>
          <Route >
            Page Not Found
          </Route>
        </Switch>
     )
  );
}

export default App;
