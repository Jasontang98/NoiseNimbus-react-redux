import { csrfFetch } from "./csrf";

const GET_COMMENTS = "/api/GETCOMMENTS";
const ADD_COMMENT = "/api/ADDCOMMENT";
const DELETE_COMMENT = "/api/DELETECOMMENT";

const getComments = (comments) => ({
    type: GET_COMMENTS,
    comments
})

const addComment = (comment) => ({
    type: ADD_COMMENT,
    comment
})

const deleteComment = (id) => ({
    type: DELETE_COMMENT,
    id
})

export const getAllComments = (songId) => async (dispatch) => {
    const response = await csrfFetch(`/api/songs/${songId}/comments`, {
        method: "GET"
    });

    if (response.ok) {
        const data = await response.json();
        dispatch(getComments(data));
    }
};

export const createComment = (comments) => async (dispatch) => {
    const { userId, songId, comment} = comments;
    const response = await csrfFetch(`/api/songs/${songId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json" },
        body: JSON.stringify({
            userId,
            songId,
            body: comment
        })
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(addComment(data));
        return data;
    }
}

export const removeComment = (data) => async(dispatch) => {
    const {songId, comment} = data

    const response = await csrfFetch(`/api/songs/${songId}/comments/${comment.id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(deleteComment(comment.id))
    }

}


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case GET_COMMENTS:
            newState = {...state};
            action.comments.forEach(comment => (newState[comment.id] = comment));
            return newState;

        case ADD_COMMENT:
            newState = {...state}
            newState[action.comment.id]= action.comment
            return newState;

        case DELETE_COMMENT:
            newState = {...state}
            delete newState[action.id];
            return newState

        default:
            return state;
    }
}

export default commentReducer;
