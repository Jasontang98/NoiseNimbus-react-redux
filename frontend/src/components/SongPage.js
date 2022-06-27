import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, NavLink } from "react-router-dom";

// import Navigation from "../Navigation";

function SongsPage({ oneSong }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const songs = useSelector((state) => state.songFile);
    // const [selectedPlaylist, setSelectedPlaylist] = useState("");

    if (!sessionUser) return <Redirect to='/' />


    return (
        <div>
            <h2>HELLO</h2>
        </div>
    //     <div>
    //         {Object.values(songs).map((singleSong) => {
    //             return (
    //                 // <div key={singleSong.id}>
    //                 // </div>
    //                 <div key={singleSong.id} onClick={(e) => {oneSong(singleSong)}}></div>
    //             )
    //         })}
    //     </div>
    );
}

export default SongsPage;
