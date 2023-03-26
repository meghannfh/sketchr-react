import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                posts: action.payload
            }
        case 'CREATE_POST':
            return {
                posts: [action.payload, ...state.posts]
            }
        default:
            return state
    }
}

export const PostsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(postsReducer, {
        posts: []
    });


    return (
        <PostsContext.Provider value={{...state, dispatch}}>
            { children }
        </PostsContext.Provider>
    )
}