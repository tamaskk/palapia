import React, { createContext, useState, useContext, useEffect } from 'react';

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();

    useEffect(() => {
        const timer = setTimeout(() => {
            setRequestError(null);
            setRequestStatus(null);
        }, 3000);

        return () => clearTimeout(timer);
    }, [requestError, requestStatus]);

    const value = {
        requestStatus,
        setRequestStatus,
        requestError,
        setRequestError
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}