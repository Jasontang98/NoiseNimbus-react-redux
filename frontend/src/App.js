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

  return (
    isLoaded && (
      <Switch>
          <Route exact path='/'>
            <Navigation isLoaded={isLoaded} />
            <Splash playSong={playSong}/>
          </Route>
          <Route path='/songs'>
            <Navigation />
            <SongsPage playSong={playSong}/>
            <AudioPlayer
            ref={musicPlayer}
            volume={0.05}
            onPlay={(e) => console.log(`${currentSong}`)}
            src={`${song}`}
            layout="horizontal-reverse"
            showSkipControls={true}
            showJumpControls={false}
            autoPlayAfterSrcChange={true}
            header={`Playing: ${currentSong}`}
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
