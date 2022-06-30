import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editCurrentSong, deleteCurrentSong } from "../store/songFile"

import { getAllComments, createComment, removeComment } from "../store/comment"


function EditSong() {

    const dispatch = useDispatch();
    const songId = useParams().id;
    const sessionUser = useSelector((state) => state.session.user);
    const song = useSelector((state) => state.songFile[songId]);
    const comments = useSelector((state) => state.songFile[songId].Comments);
    console.log(comments)
    const [title, setTitle] = useState(`${song.title}`);
    const [comment, setComment] = useState('');

    const history = useHistory();

    useEffect(() => {
        dispatch(getAllComments(songId))
    }, [dispatch])

    if (!sessionUser) return <Redirect to='/' />;

    const handleComment = async (e) => {
        e.preventDefault();
        const data = {
           userId: sessionUser?.id,
           songId,
           comment
        }
       await dispatch(createComment(data));
       setComment('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = {
            id: song?.id,
            title
        };

        await dispatch(editCurrentSong(data));
        history.push(`/songs`)
    }

    const handleDelete = (song) => {
        dispatch(deleteCurrentSong(song))
    }


    return (
        <>
            <div>
                <p>{song?.title}</p>
                <div>
                    {Object.values(comments).map((comment) => {
                        return (
                            <div key={comment.id}>{comment.body}</div>
                        )
                    })}
                </div>
                <form onSubmit={handleComment}>
                    <textarea
                    placeholder="Add a comment"
                    value={comment}
                    required
                    onChange={(e) => setComment(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>

                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>
                <button
                    onClick={(e) => handleDelete(song)}
                >Delete
                </button>
            </div>
        </>
    )
}


export default EditSong;
