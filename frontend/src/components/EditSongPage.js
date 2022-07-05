import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { playAllSongs, editCurrentSong, deleteCurrentSong } from "../store/songFile"
// import * as sessionActions from '../store/session'
import { getAllComments, createComment, removeComment, clearComments } from "../store/comment"
import Navigation from "./Navigation";


function EditSong() {

    const dispatch = useDispatch();
    const songId = useParams().id;
    const sessionUser = useSelector((state) => state.session.user);

    const song = useSelector((state) => state.songFile[songId]);

    const comments = useSelector((state) => state.comment);

    const [title, setTitle] = useState(`${song.title}`);
    const [comment, setComment] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);

    const history = useHistory();

    useEffect(() => {
        dispatch(playAllSongs(songId)).then(async () => await dispatch(getAllComments(songId)))

        return () => {
            dispatch(clearComments())
        }
    }, [dispatch, songId])

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

    const handleDeleteComment = async (e, comment) => {
        e.preventDefault();
        const data = {
            songId,
            comment
        }
        await dispatch(removeComment(data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationErrors([]);
        const errors = [];

        if (title.length > 20) errors.push('Title is too long');
        if (title.length < 1) errors.push('Must provide a title')

        if (errors.length) {
            setValidationErrors(errors);
            return;
        }

        const data = {
            id: song?.id,
            title
        };


        await dispatch(editCurrentSong(data));
        history.push(`/songs`)
    }

    const handleDelete = (song) => {
        dispatch(deleteCurrentSong(song))
        history.push('/songs')
    }


    return (
        <>
            <div>
                <Navigation user={sessionUser} />
                <div className="commentForm">
                    <div>
                        <p id="songTitle">{song?.title}</p>
                        <div>
                            {Object.values(comments).map((comment) => {
                                return (
                                    <div className="commentBox" key={comment.id}>
                                        <p id="commentBody">{comment.body}</p>
                                        <p>{comment.User.username}</p>
                                        {comment.User.username === sessionUser.username ? (
                                            <button className="button" onClick={(e) => handleDeleteComment(e, comment)}>Delete</button>
                                        ) : <></>}
                                    </div>
                                )
                            })}
                        </div>
                        <form onSubmit={handleComment}>
                            <textarea
                                id="commentSubmit"
                                value={comment}
                                required
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <button className="button" type="submit">Submit</button>
                        </form>
                        <div>
                            {song?.User?.username === sessionUser?.username ? (
                                <div>
                                    <div id="changeNameTitle">
                                        Update Name
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        {validationErrors.map((error ,idx) => (
                                            <div className="uploadError" key={idx}>{error}</div>
                                        ))}
                                        <input
                                            id="nameChange"
                                            type="text"
                                            value={title}

                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                        <button className="button" type="submit">Submit</button>
                                    </form>
                                    <div>
                                        <button
                                            className="button" onClick={(e) => handleDelete(song)}
                                        >Delete
                                        </button>
                                    </div>
                                </div>
                            ) : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default EditSong;
