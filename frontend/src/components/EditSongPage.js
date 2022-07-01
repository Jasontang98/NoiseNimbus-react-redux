import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editCurrentSong, deleteCurrentSong } from "../store/songFile"
import * as sessionActions from '../store/session'
import { getAllComments, createComment, removeComment } from "../store/comment"
import Navigation from "./Navigation";


function EditSong() {

    const dispatch = useDispatch();
    const songId = useParams().id;
    const sessionUser = useSelector((state) => state.session.user);
    const song = useSelector((state) => state.songFile[songId]);
    // console.log(song)
    const comments = useSelector((state) => state.comment);

    const [title, setTitle] = useState(`${song.title}`);
    const [comment, setComment] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    const history = useHistory();

    useEffect(() => {
        dispatch(getAllComments(songId))
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
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
                <div>
                    <p>{song?.title}</p>
                    <div>
                        {Object.values(comments).map((comment) => {
                            return (
                                <div key={comment.id}>
                                    <p>{comment.body}</p>
                                    <p>{comment.User.username}</p>
                                    {comment.User.username === sessionUser.username ? (
                                        <button onClick={(e) => handleDeleteComment(e, comment)}>Delete</button>
                                    ) : <></>}
                                </div>
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
                    <div>
                        {song.User.username === sessionUser.username ? (
                            <div>
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                    <button type="submit">Submit</button>
                                </form>
                                <div>
                                    <button
                                        onClick={(e) => handleDelete(song)}
                                    >Delete
                                    </button>
                                </div>
                            </div>
                        ) : <></>}
                    </div>
                </div>
            </div>
        </>
    )
}


export default EditSong;
