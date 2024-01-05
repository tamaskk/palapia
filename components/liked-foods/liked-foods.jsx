import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import MainPageCard from "@/components/ui/mainpage-card";
import { useMainContext } from "@/lib/maincontext";

const LikedFoodsPage = ({ recipes }) => {
  const { data: session, status } = useSession();
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    if (recipes) {
      setLikedRecipes(recipes);
    }
  }, [recipes]);

  return (
    <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-start justify-between px-5 pt-14 gap-10 self-start">
      <h1 className="text-4xl font-semibold w-full text-center">Your favourite recipe</h1>
      <div className="flex flex-wrap items-center justify-center w-full gap-12 max-w-full lg:mt-0">
      {
      likedRecipes?.map((recipe, index) => (
        <MainPageCard
          key={index}
          id={recipe._id}
          name={recipe.name}
          description={recipe.description}
          people={recipe.peoples}
          time={recipe.time}
          difficulity={recipe.difficulty}
          picture={recipe.image}
          flag={recipe.flag}
          liked={true}
        />
      ))}
      </div>
    </div>
  );
};

export default LikedFoodsPage;
