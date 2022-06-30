import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

// import Navigation from "../Navigation";

function SongsPage({ playSong }) {
    const sessionUser = useSelector((state) => state.session.user);
    const songs = useSelector((state) => state.songFile);


    if (!sessionUser) return <Redirect to='/' />


    return (

        <div>
            <div>
            {Object.values(songs).map((song) => {
                return (
                    <div key={song.id} onClick={(e) => { playSong(song) }}>{song.title}</div>
                )
            })}
            </div>
        </div>
    );
}

export default SongsPage;
