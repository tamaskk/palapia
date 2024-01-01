import Image from "next/image";
import Sort from "../components/mainpage/sort";
import MainPageCard from "@/components/ui/mainpage-card";
import { useState, useEffect } from "react";
import { getAllRecipe } from "@/lib/db";

export default function Home({ recipes }) {
  const [filteredDatas, setFilteredDatas] = useState([])
  const [recipeList, setRecipeList] = useState(recipes);

  const filterDatasHandler = (filterDatas) => {
    setFilteredDatas(filterDatas.filter(data => data !== undefined));
  }

  const flex = {
    flex: "1 1 100px"
  }

  return (
    <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-start justify-between px-5">
      <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-row items-start mt-2 justify-between px-0 lg:px-10">
        <Sort filterDatasHandler={filterDatasHandler} />
        <div className="flex flex-wrap px-2 items-center justify-center w-full gap-12 max-w-full lg:max-w-[85%] mt-14 lg:mt-0">
          {filteredDatas
            .filter((data) => data !== undefined)
            .length > 0 &&
            filterDatasHandler && (
              <>
                <div className="w-full h-10 self-center flex flex-row flex-wrap items-center justify-center gap-2 lg:gap-8 text-center pl-0 lg:pl-10 mb-20 lg:mb-0">
                  <h1 className="text-xl font-semibold">Filters:</h1>
                  {filteredDatas
                    .filter((data) => data !== undefined)
                    .filter((data) => data.length > 0)
                    .map((data, index) => (
                      <p
                        className="min-w-fit cursor-pointer text-black p-2 border border-black rounded-lg"
                        key={index}
                        onClick={() => setFilteredDatas(filteredDatas.filter((item) => item !== data))}
                      >
                        {data}
                      </p>
                    ))}
                </div>
              </>
            )}

          {recipeList.map((recipe, index) => (
            <MainPageCard
              key={index}
              name={recipe.name}
              description={recipe.description}
              people={recipe.peoples}
              time={recipe.time}
              difficulity={recipe.difficulty}
              picture={recipe.image}
            />
          ))}
        </div>

      </div>
    </div>
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