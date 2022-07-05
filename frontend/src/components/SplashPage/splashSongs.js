import React from "react";
import { useSelector} from "react-redux";

function SplashSongs({ playSong }) {
    const songs = useSelector((state) => state.songFile)

    return (
        <div className="song-container">
            <div className="song-box">
                {Object.values(songs).map((song) => {
                    return (
                        <div className="songList">
                           <p>{song.title} added by {song.User.username}</p>
                            <div className="playSong" key={song.id} onClick={(e) => { playSong(song) }}></div>
                        </div>
                    )
                })}
            </div>
        </div>
        )
}

export default SplashSongs;
