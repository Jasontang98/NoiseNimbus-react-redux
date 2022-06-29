import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editCurrentSong, deleteCurrentSong } from "../store/songFile"


function EditSong() {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const songId = useParams().id;

    const song = useSelector((state) => state.songFile[songId]);
    // console.log(song)
    const [songTitle, setSongTitle] = useState(`${song.title}`);

    const history = useHistory();

    if (!sessionUser) return <Redirect to='/' />;

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: song?.id,
            songTitle
        };
        console.log(data)
        await dispatch(editCurrentSong(data));
        history.push(`/songs`)
    }

    const handleDelete = (song) => {
        dispatch(deleteCurrentSong(song))
    }


    return (
        <div>
            <p>{song?.title}</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            <button
            onClick={(e) => handleDelete(song)}
            >Delete
            </button>
        </div>
        )
}


export default EditSong;
