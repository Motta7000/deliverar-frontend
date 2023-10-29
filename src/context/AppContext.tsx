'use client'
import React, {createContext, useState} from 'react'

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [user, setUser] = useState<object>(null);

    function deleteCookie(key) {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }


    const addUser = (newUser) => {
        setUser(newUser);
        if (user !== null) {
            //localStorage.removeItem('user')
            //deleteCookie('user');
        }
    }

    const updateUser = (updatedUser) => {
        //console.log("updatedUser", updatedUser)
        //localStorage.removeItem('user')
        //deleteCookie('user');
        setUser(updatedUser);
    }

    return (
        <AppContext.Provider value={({user, addUser, updateUser})}>
            <div>{children}</div>
        </AppContext.Provider>
    )
}