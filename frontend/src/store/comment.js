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
    console.log(comments, "-------------------------------")
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

export const removeComment = (songId, commentId) => async(dispatch) => {
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
            console.log(action, "this is the action from the reducer")
            return { ...state, [action.comment.id]: action.comment };

        case DELETE_COMMENT:
            return delete { ...state, [action.id]: action.id };

        default:
            return state;
    }
}

export default commentReducer;
