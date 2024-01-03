import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import LikedFoodsPage from "../components/liked-foods/liked-foods";
import { useMainContext } from "@/lib/maincontext";
import useLikedRecipes from "../lib/getLikedRecipes";

function LikedFoods() {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const { setRequestStatus, setRequestError } = useMainContext();

  const recipeList = useLikedRecipes();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/auth");
        setRequestError('You must be signed in to see your liked recipes.');
        setRequestStatus('error');
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <LikedFoodsPage recipes={recipeList} />;
};

export default LikedFoods;
