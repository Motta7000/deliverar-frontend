'use client'
import React, {createContext, useState} from 'react'

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [user, setUser] = useState<object>({
        "code": "",
        "token": "",
        "user": {
            "_id": "",
            "name": "",
            "email": "",
            "isProvider": false,
            "createdOn": "",
            "password": "",
            "__v": ""
        }
    });

    const addUser = (newUser) => {
        setUser(newUser);
    }

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
    }

    /* const editPost = (id, updatedPost) => {
         setPosts(prevPosts => {
             return prevPosts.map(post => {
                 if (post.id === id) {
                     return {...post, ...updatedPost};
                 }
                 return post;
             });
         });
     }*/

    /*const deletePost = (id) => {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
    }*/

    return (
        <AppContext.Provider value={({user, addUser, updateUser})}>
            <div>{children}</div>
        </AppContext.Provider>
    )
}