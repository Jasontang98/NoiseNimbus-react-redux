import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import Navigation from "./Navigation";
import { playAllSongs } from "../store/songFile";
import * as sessionActions from '../store/session'


function SongsPage({ playSong }) {
    const sessionUser = useSelector((state) => state.session.user);
    const songs = useSelector((state) => state.songFile);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(playAllSongs());

      }, [dispatch]);

    if (!sessionUser) return <Redirect to='/' />


    return (
        <>
            <div>
                <Navigation user={sessionUser} />
                <div>
                {Object.values(songs).map((song) => {
                    return (
                        <div>
                            <NavLink to={`/songs/${song.id}`}>{song.title}</NavLink>
                            <div key={song.id} onClick={(e) => { playSong(song) }}>{song.title}</div>
                        </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}

export default SongsPage;
