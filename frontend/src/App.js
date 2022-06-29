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


  return (
    isLoaded && (
      <>
      <Switch>
          <Route exact path='/'>
            <Navigation isLoaded={isLoaded} />
            <Splash playSong={playSong}/>
          </Route>
          <Route exact path='/songs'>
            <Navigation />
            <SongsPage playSong={playSong}/>
          </Route>
          <Route path="/upload">
            <Navigation isLoaded={isLoaded} />
            <UploadSong playSong={playSong} />
          </Route>
          <Route path="/songs/:id">
            <Navigation isLoaded={isLoaded} />
            <EditSong playSong={playSong}/>
          </Route>
          <Route >
            Page Not Found
          </Route>
        </Switch>
        <footer >
           <AudioPlayer
            ref={musicPlayer}
            volume={0.1}
            onPlay={(e) => console.log(`${currentSong}`)}
            src={`${song}`}
            layout="horizontal-reverse"
            showSkipControls={true}
            showJumpControls={false}
            autoPlayAfterSrcChange={true}
            header={`${currentSong}`}
            customAdditionalControls={[]}
          />
        </footer>
      </>
     )
  );
}

export default App;
