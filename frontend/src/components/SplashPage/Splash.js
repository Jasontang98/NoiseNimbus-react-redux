import React, { useEffect, useState } from "react";
import TopBox from "./TopBox/TopBox";
import Trending from "./Trending";
import AboutMe from "./About";

import { playAllSongs } from "../../store/songFile";
import { useDispatch } from "react-redux";


const Splash = ({playSong}) => {
    const dispatch = useDispatch();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        dispatch(playAllSongs()).then(() => setIsLoaded(true));
    }, [dispatch])

    return (
        isLoaded && (
            <div className="topLine">
                <TopBox />
                <Trending playSong={playSong}/>
                <AboutMe />
            </div>
        )
    )

}

export default Splash;
