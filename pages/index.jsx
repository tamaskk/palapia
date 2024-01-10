import Sort from "../components/mainpage/sort";
import MainPageCard from "@/components/ui/mainpage-card";
import { useState, useEffect, Fragment } from "react";
import { getAllRecipe } from "@/lib/db";
import { useMainContext } from "@/lib/maincontext";
import Head from 'next/head'
import CookieConsent from "react-cookie-consent";

export default function Home({ recipes }) {

  const [filteredDatas, setFilteredDatas] = useState([]);
  const [recipeList, setRecipeList] = useState(recipes);

  const { filteredType, filteredTime, filteredCountry, filteredDifficulity } = useMainContext();

  useEffect(() => {
    if (filteredDatas.includes('')) {
      setFilteredDatas(filteredDatas.filter(data => data !== ''));
    }
  }, [filteredDatas])

  const filterDatasHandler = (filterDatas) => {
    setFilteredDatas(filterDatas);
  }

  return (
    <Fragment>
      <Head>
        <title>Palapia</title>
        <meta name="description" content="Palapia is the social media for recipes of international cuisines" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-start justify-between px-5">
        <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-row items-start mt-2 justify-between px-0 lg:px-10">
          <Sort filterDatasHandler={filterDatasHandler} />
          <div className="flex flex-wrap px-2 items-center justify-center w-full gap-12 max-w-full lg:max-w-[85%] mt-14 lg:mt-0">
            {filteredDatas.filter((item) => item !== undefined).length !== 0 && (
              <div className="w-full h-10 self-center flex flex-row flex-wrap items-center justify-center gap-2 lg:gap-8 text-center pl-0 lg:pl-10 mb-20 lg:mb-0">
                <h1 className="text-xl font-semibold">Filters:</h1>
                {filteredDatas
                  .filter((data) => data !== undefined)
                  .filter((data) => data.length > 0)
                  .map((data, index) => (
                    <p
                      className="min-w-fit cursor-pointer text-black p-2 border border-black rounded-lg"
                      key={index}
                    >
                      {data}
                    </p>
                  ))}
              </div>
            )}

            {filteredCountry || filteredDifficulity || filteredTime || filteredType ? (
              recipeList
                .filter(recipe => (
                  (filteredCountry?.length === 0 || (filteredCountry && filteredCountry.includes(recipe.nationality))) &&
                  (filteredType?.length === 0 || (filteredType && filteredType.includes(recipe.type))) &&
                  (filteredTime?.length === 0 || (filteredTime && filteredTime.includes(recipe.time))) &&
                  (recipe.isApproved === true) &&
                  (filteredDifficulity?.length === 0 || (filteredDifficulity && filteredDifficulity.includes(recipe.difficulty)))
                ))
                .map((recipe, index) => (
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
                  />
                ))
            ) : (
              recipeList.filter((recipe) => recipe.isApproved === true).map((recipe, index) => (
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
                />
              ))
            )}
          </div>
        </div>
        <CookieConsent 
        location="bottom"
        buttonText="I understand"
        style={{ background: "#2B373B" }}
        buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
        >
          By using our website, you consent to the use of cookies for a better browsing experience. For more information, please review our Privacy Policy.
        </CookieConsent>
      </div>
    </Fragment>
  );
}

export async function getServerSideProps() {
  try {
    const recipes = await getAllRecipe();

    // Convert ObjectId to string for each recipe
    const serializedRecipes = recipes.map(recipe => {
      return {
        ...recipe,
        _id: recipe._id.toString(), // Convert ObjectId to string
      };
    });

    return {
      props: { recipes: serializedRecipes },
    };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return {
      props: { recipes: [] },
    };
  }
}
