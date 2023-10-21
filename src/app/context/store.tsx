'use client';

import {createContext, useContext, useState} from "react";

const GlobalContext = createContext({
    user: {}
})

export const GlobalContextProvider = ({children}) => {
    const [data, setData] = useState({});

    return (
        <GlobalContext.Provider value={{setData, data}}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => useContext(GlobalContext);