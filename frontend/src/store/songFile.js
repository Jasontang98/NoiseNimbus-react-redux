import { csrfFetch } from "./csrf";

const PLAY_SONGS = "/api/PLAYSONGS";
const ADD_SONG = "/api/ADDSONG";
const EDIT_SONG = "/api/EDITSONG";
const DELETE_SONG = "/api/DELETESONG";

const playSongs = (songs) => ({
    type: PLAY_SONGS,
    songs,
  });

  const addSong = (songFile) => ({
    type: ADD_SONG,
    songFile,
  });

  const editSong = (song) => ({
    type: EDIT_SONG,
    song,
  });

  const deleteSong = (song) => ({
    type: DELETE_SONG,
    song,
  });


  export const playAllSongs = () => async (dispatch) => {
    const response = await csrfFetch("/api/songs", {
        method:"GET",
    });

    if (response.ok) {
        const songs = await response.json();
        dispatch(playSongs(songs));
        return songs;
    };
  };


  export const addNewSong = (songFile) => async (dispatch) => {
    const formData = new FormData();
    formData.append('song', songFile.file);
    formData.append('fileName', songFile.fileName);
    formData.append('userId', songFile.userId);

    const response = await csrfFetch("/api/songs", {
        method:"POST",
        headers: {
            "Content-Type": "multipart/form-data"
        },
        body:formData
    });

    if (response.ok) {
        const newSong = await response.json();
        dispatch(addSong(newSong));
        dispatch(playAllSongs());
        return true;
    };
  };


  export const editCurrentSong = (song) => async (dispatch) => {

    const { id, title } = song;

    const response = await csrfFetch(`/api/songs/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
          title
        }),
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(editSong(data));
        return true;
    };
  };


  export const deleteCurrentSong = (song) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${song.id}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(deleteSong(song));
    }
  };


  const initialState = {};

  const songReducer = (state = initialState, action) => {
    const newState = {...state};
    switch (action.type) {
        case PLAY_SONGS:
            action.songs.forEach((song) => (newState[song.id]= song));
            return newState;

        case ADD_SONG:
            return {...state, [action.songFile.id]: {...action.songFile}};

        case EDIT_SONG:
            return {...state, [action.song.id]: {...action.song}};

        case DELETE_SONG:
            delete newState[action.song.id];
            return newState;

        default:
            return state;
    };
  };


  export default songReducer;


//todo define types
// CRUD
//CREATE
// const CREATE_NOTEBOOK = 'notebooks/createNotebooks'
// //READ
// const GET_NOTEBOOK = 'notebooks/getNotebooks'
// //UPDATE
// const UPDATE_NOTEBOOK = 'notebooks/updateNotebooks'
// //DELETE
// const DELETE_NOTEBOOK = 'notebooks/deleteNotebooks'

// import { csrfFetch } from "./csrf";

// //todo action creators
// const actionCreateNotebook =(notebook) => {
//     return {
//         type: CREATE_NOTEBOOK,
//         notebook
//     }
// }

// const actionGetNotebook =(notebooks) => {
//     return {
//         type: READ_NOTEBOOK,
//         notebooks
//     }
// }

// const actionUpdateNotebook =(notebook) => {
//     return {
//         type: UPDATE_NOTEBOOK,
//         notebook
//     }
// }

// const actionDeleteNotebook =(notebookId) => {
//     return {
//         type: DELETE_NOTEBOOK,
//         notebookId
//     }
// }


//todo thunks
// in backend/routes/api/index.js prefixed with a path
// export const thunkGetAllNotebooks = (user) => async (disptch) => {

//     const response = await csrfFetch(`/api/notebooks/user/${userId}`)

//     if (response.ok) {
//         const data = await response.json();
//         dispatch(actionGetNotebook(data));
//         return response;
//     } else {
//         return await response.json()
//     }
// }

// export const login = (user) => async(disptch) => {
//     const { credential, password } = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// }

// export const login = (user) => async(disptch) => {
//     const { credential, password } = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// }

// export const login = (user) => async(disptch) => {
//     const { credential, password } = user;
//     const response = await csrfFetch('/api/session', {
//         method: 'POST',
//         body: JSON.stringify({
//             credential,
//             password
//         }),
//     });
//     const data = await response.json();
//     dispatch(setUser(data.user));
//     return response;
// }


//todo reducer add it to the reducer in store/index.js and import

//  const notebooks = (state = {}, action) => {
//     let newState = {...state}
//     switch (action.type) {
//       case CREATE_NOTEBOOK:
//         newState = Object.assign({}, state);
//         newState.user = action.payload;
//         return newState;

//       case GET_NOTEBOOK:
//         //normalization
//        action.notebooks.forEach(notebook => {
//             newState[notebook.id] = notebook
//        })
//         return newState;

//       case UPDATE_NOTEBOOK:
//         newState = Object.assign({}, state);
//         newState.user = action.payload;
//         return newState;

//       case DELETE_NOTEBOOK:

//         delete newState[action.notebookId]
//         return newState;

//       default:
//         return state;
//     }
//   };

//   export default notebooks


// after full crud go back to the component and make it use redux

// import { useDispatch, useSelector} from 'react-redux';

// async function onDelete(notebookId) {
//     console.log('BYE')
// }

// const dispatch = useDispatch;
// const selectorNotebooks = useSelector(state => state.notebooks)

// import thunkGetAllNotebooks from '../store/notebooks'
// inside
// useEffect(()=> {
//     dispatch(thunkGetAllNotebooks(notebookId))
// }, [dispatch])

// useEffect(()=> {
//     if (selectorNotebooks) {
//     selectorNotebooks(Object.values(selectorNotebooks))
// }
// }, [selectorNotebooks])
