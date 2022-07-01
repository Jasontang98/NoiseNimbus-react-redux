import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

function Trending({ playSong }) {
    const songs = useSelector((state) => state.songFile)

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
        )
}

export default Trending;
