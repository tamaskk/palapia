import { useSession } from 'next-auth/react';
import React, { createContext, useState, useContext, useEffect } from 'react';

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
    const { data: session, status } = useSession();

    const [requestStatus, setRequestStatus] = useState();
    const [requestError, setRequestError] = useState();
    const [likedFoods, setLikedFoods] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/users/users');
            const data = await response.json();
    
            // Find the user whose email matches the session user's email
            const user = data.users.find((user) => user.email === session?.user.email);
    
            if (user) {
              setLikedFoods(user.likedFoods);
            } else {
              console.log('User not found.');
            }
          } catch (error) {
            console.error('Error fetching users:', error);
          }
        };
    
        fetchData();
      }, [session?.user.email]);

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
        setRequestError,
        likedFoods,
        setLikedFoods,
    }

    return (
        <MainContext.Provider value={value}>
            {children}
        </MainContext.Provider>
    )
}