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
            {Object.values(songs).map((singleSong) => {
                return (
                    <div key={singleSong.id} onClick={(e) => { playSong(singleSong) }}>{singleSong.title}</div>
                )
            })}
            </div>
        </div>
    );
}

export default SongsPage;
