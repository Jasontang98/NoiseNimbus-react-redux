import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import { playAllSongs } from "./store/songFile";

import "./index.css";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import Splash from "./components/SplashPage/Splash";
import SongsPage from "./components/SongPage";
import UploadSong from "./components/UploadPage";
import EditSong from "./components/EditSongPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const [song, setSong] = useState("");
  const [currentSong, setCurrentSong] = useState("");

  const musicPlayer = useRef();

  useEffect(() => {
    dispatch(playAllSongs());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const playSong = async (singleSong) => {
    setCurrentSong(singleSong.title);
    await setSong(`${singleSong.url}`);
    musicPlayer.current.audio.current.play(song);
  };

  //hello

  return (
    <>
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <Splash playSong={playSong} />
          </Route>
          <Route exact path='/songs'>
            <SongsPage playSong={playSong} />
          </Route>
          <Route path="/upload">
            <UploadSong />
          </Route>
          <Route path="/songs/:id">
            <EditSong playSong={playSong} />
          </Route>
          <Route >
            Page Not Found
          </Route>
        </Switch>
      )}
      <footer id="footer">
        <AudioPlayer
          ref={musicPlayer}
          volume={0.1}
          onPlay={(e) => console.log(`${currentSong}`)}
          src={`${song}`}
          layout="horizontal-reverse"
          showSkipControls={false}
          showJumpControls={false}
          header={`${currentSong}`}
          customAdditionalControls={[]}
        />
      </footer>
    </>
  );
}

export default App;
