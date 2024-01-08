import { useSession } from "next-auth/react";
import { useState, useEffect, Fragment } from "react";
import MainPageCard from "@/components/ui/mainpage-card";
import { useMainContext } from "@/lib/maincontext";
import Head from 'next/head'

const LikedFoodsPage = ({ recipes }) => {
  const { data: session, status } = useSession();
  const [likedRecipes, setLikedRecipes] = useState([]);

  useEffect(() => {
    if (recipes) {
      setLikedRecipes(recipes);
    }
  }, [recipes]);

  return (
    <Fragment>
      <Head>
        <title>Liked Recipes</title>
        <meta name="description" content="Your favourite liked recipes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex mx-auto flex-col items-start justify-between px-5 pt-4 gap-10 self-start">
        <h1 className="text-4xl font-semibold w-full text-center">Your favourite recipes</h1>
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
    </Fragment>
  );
};

export default LikedFoodsPage;
