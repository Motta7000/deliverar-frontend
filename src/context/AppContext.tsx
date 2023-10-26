'use client'
import React, {createContext, useState} from 'react'

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const [user, setUser] = useState<object>(null);

    const addUser = (newUser) => {
        setUser(newUser);
    }

    const updateUser = (updatedUser) => {
        console.log("updatedUser", updatedUser)
        setUser(updatedUser);
    }

    return (
        <AppContext.Provider value={({user, addUser, updateUser})}>
            <div>{children}</div>
        </AppContext.Provider>
    )
}