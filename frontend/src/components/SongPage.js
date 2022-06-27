import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

// import Navigation from "../Navigation";

function SongsPage({ playSong }) {
    const dispatch = useDispatch();
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
