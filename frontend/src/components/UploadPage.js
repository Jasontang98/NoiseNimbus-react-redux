import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { playAllSongs, addNewSong } from "../store/songFile";
import Navigation from "./Navigation";
import * as sessionActions from '../store/session';

function UploadSong() {
    const dispatch = useDispatch();
    const history = useHistory();
    const sessionUser = useSelector(state => state.session.user);

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
    }, [dispatch]);

    if (!sessionUser) return <Redirect to='/' />;



    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const userId = sessionUser.id;
        const payload = {
            userId,
            fileName,
            file
        };
        const createNewSong = await dispatch(addNewSong(payload)).catch(
            async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                } else if (data && data.message) {
                    setErrors([data.message]);
                }
            }
        );
        if (createNewSong) {
            await dispatch(playAllSongs());
            history.push('/songs') //needs to be changed
        }
    };

    const handleChange = async (e) => {
        const uploadFile = e.target.files[0];
        setFile(uploadFile)
    }



    return (
        <>
            <div>
                <Navigation user={sessionUser} />
                <div>
                    <form className="songForm" onSubmit={handleSubmit}>
                        {errors.map((error) => (
                            <div key={error}>{error}</div>
                        ))}
                        <label>
                            Song Title
                            <input
                                type="text"
                                value={fileName}
                                required
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        </label>
                        <div>
                            <div>Select a Song</div>
                            <p>Please add a mp3/mp4</p>
                            <input
                                type="file"
                                name="song"
                                onChange={handleChange}
                                accept=".mp3, .mp4"
                            />
                        </div>
                        <div>
                            <button type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UploadSong;
