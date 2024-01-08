import { useSession } from 'next-auth/react';
import React, { createContext, useState, useContext, useEffect } from 'react';

const MainContext = createContext();

export const useMainContext = () => useContext(MainContext);

export const MainProvider = ({ children }) => {
  const { data: session, status } = useSession();

  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();
  const [likedFoods, setLikedFoods] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState();
  const [filteredTime, setFilteredTime] = useState();
  const [filteredType, setFilteredType] = useState();
  const [filteredDifficulity, setFilteredDifficulity] = useState();
  const [choosenMenu, setChoosenMenu] = useState();
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allRemoveRequests, setAllRemoveRequests] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/recipes/removeRequests');
            
            if (response.ok) {
                const data = await response.json();
                console.log(data.recipes)
                setAllRemoveRequests(data.recipes);
                setLoading(false);
                console.log(allRemoveRequests.length)
            } else {
                console.log('Error fetching recipes');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching recipes:', error);
            setLoading(false);
        }
    };

    fetchData();
}, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recipes/allRecipe', {
          method: 'POST',
          body: JSON.stringify({ email: session?.user.email }),
          headers: {
            'Content-Type': 'application/json',
          },
        
        });
        const data = await response.json();

        if (response.ok) {
          setAllRecipes(data.recipes);
        } else {
          console.log('Error fetching recipes');
        }

      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }

    fetchData();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/users');
        const data = await response.json();
        setAllUsers(data.users);

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
    filteredCountry,
    setFilteredCountry,
    filteredTime,
    setFilteredTime,
    filteredType,
    setFilteredType,
    filteredDifficulity,
    setFilteredDifficulity,
    choosenMenu,
    setChoosenMenu,
    allRecipes,
    loading,
    allRemoveRequests,
    allUsers
  }

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  )
}