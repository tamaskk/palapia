import { useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";

const getLikedRecipes = async (session) => {
  try {
    if (session) {
      const response = await fetch('/api/recipes/getLikedRecipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      if (response.ok) {
        const data = await response.json();
        const likedFoods = data.user.likedFoods;
        const recipesData = data.recipes;
        const filteredRecipes = recipesData.filter(recipe => likedFoods.includes(recipe._id));
        return filteredRecipes;
      } else {
        console.error('Failed to fetch liked recipes');
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

const useLikedRecipes = () => {
  const { data: session, status } = useSession();
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    const fetchLikedRecipes = async () => {
      const recipes = await getLikedRecipes(session);
      setLikedRecipes(recipes);
    };

    fetchLikedRecipes();
  }, [session]);

  return likedRecipes;
};

export default useLikedRecipes;
