import { Fragment, useEffect, useState } from "react";
import RecipeContent from "../../components/recipe/recipe-content";
import { getAllRecipe } from "@/lib/db";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

const SingleRecipePage = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setLoading(false);
        } else {
          router.replace("/auth");
          setTimeout(() => {
              setRequestError("You must be logged in see recipes.");
              setRequestStatus("error");
          }, 1000);
      }
    });
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Fragment>
      <RecipeContent recipe={props.recipe} />
    </Fragment>
  );
};

export async function getStaticPaths() {
  const recipeSlugs = await getAllRecipe();
  const paths = recipeSlugs.map((slug) => ({
    params: { slug: slug.name.toLowerCase().split(' ').join('-') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
    const slug = context.params.slug;
  
    const recipe = await getAllRecipe();
  
    const filteredRecipes = recipe.filter((recipe) => recipe.name.toLowerCase().split(' ').join('-') === slug);
  
    if (filteredRecipes.length === 0) {
      return {
        notFound: true,
      };
    }
  
    const { _id, ...rest } = filteredRecipes[0];
    const serializedRecipe = {
      ...rest,
      _id: _id.toString(), // Convert ObjectId to string
    };
  
    return {
      props: {
        recipe: serializedRecipe,
      },
      revalidate: 30,
    };
  }
  


export default SingleRecipePage;
