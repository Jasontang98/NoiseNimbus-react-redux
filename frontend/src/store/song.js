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
