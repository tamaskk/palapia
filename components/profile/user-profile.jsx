import { useSession } from "next-auth/react";
import { Fragment, useEffect, useState } from "react";
import PersonalInformation from "./personal-information";
import Settings from "./settings";
import MyRecipes from "./my-recipes";
import Head from 'next/head'

const UserProfile = () => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState();
  const [page, setPage] = useState("personal");
  const [ownRecipes, setOwnRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(ownRecipes);
  }, [ownRecipes]);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/users/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        const user = data.users?.filter((user) => user.email === session?.user.email);
        setUser(user[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error.message);
      }
    };
    fetchUser();
  }, [session]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/recipes/getOwnRecipes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: session?.user.email }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch recipes");
        }

        const data = await response.json();
        setOwnRecipes(data.ownRecipes);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipes:", error.message);
      }
    };

    fetchRecipes();
  }, [session]);


  // Loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }



  return (
    <Fragment>
            <Head>
        <title>Profile</title>
        <meta name="description" content="Your user profile with setting, personal informations and your recipes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    <section className="w-screen h-auto flex justify-center items-center">
      <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-center justify-between px-5 pt-14 gap-10 self-start">
        <h1 className="text-5xl font-bold text-center">Your User Profile</h1>
        <div className="w-full grid grid-cols-3 gap-2 lg:gap-8 items-center">
          <button
            onClick={() => setPage("settings")}
            className={`h-full text-sm lg:text-lg font-semibold rounded-lg p-3 hover:bg-gray-200 transition-all duration-300 ${page === "settings" ? "bg-gray-200" : "bg-white"}`}
          >
            Settings
          </button>
          <button
            onClick={() => setPage("personal")}
            className={`h-full text-sm lg:text-lg font-semibold rounded-lg p-3 hover:bg-gray-200 transition-all duration-300 ${page === "personal" ? "bg-gray-200" : "bg-white"}`}
          >
            Personal Informations
          </button>
          <button
            onClick={() => setPage("recipe")}
            className={`h-full text-sm lg:text-lg font-semibold rounded-lg p-3 hover:bg-gray-200 transition-all duration-300 ${page === "recipe" ? "bg-gray-200" : "bg-white"}`}
          >
            My recipes
          </button>
        </div>
        {page === "personal" ? (
          <PersonalInformation loading={loading} user={user} />
        ) : page === "settings" ? (
          <Settings loading={loading} ownRecipes={ownRecipes} />
        ) : page === "recipe" ? (
          <MyRecipes ownRecipes={ownRecipes} />
        ) : (
          <p>No page found</p>
        )}
      </div>
    </section>
    </Fragment>
  );
};

export default UserProfile;
