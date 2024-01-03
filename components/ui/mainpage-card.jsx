import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useMainContext } from '@/lib/maincontext';
import { useRouter } from 'next/router';
import Link from 'next/link';

const MainPageCard = ({ id, name, flag, description, people, time, difficulity, picture, liked, likedFoodArray, likedFoodArraySet }) => {
    const { data: session } = useSession();
    const { setLikedFoods, likedFoods, setRequestError, setRequestStatus } = useMainContext()
    const router = useRouter();
    
    const backgroundSettings = {
        backgroundImage: `url("${picture}")`,  // Background image URL
        backgroundPosition: 'center center',  // Background position (e.g., 'center center')
        backgroundRepeat: 'no-repeat',       // Background repeat (e.g., 'repeat', 'no-repeat')
        backgroundSize: 'cover',             // Background size (e.g., 'cover', 'contain')
    };

    const likeHandler = async (recipeId) => {
        if (!session) {
          router.push('/auth');
          setRequestError('You must be signed in to like a recipe.')
          setRequestStatus('error');
          return;
        }
      
        try {
          // Update the local state based on the current state
          setLikedFoods((prevLikedFoods) => {
            // Extract the id from the recipeId object
            const id = recipeId;
      
            if (prevLikedFoods.includes(id)) {
              // If the recipe is already liked, unlike it
              const updatedLikedFoods = prevLikedFoods.filter((foodId) => foodId !== id);
      
              // Make a POST request to the API route to update liked foods
              updateLikedFoodsInAPI(updatedLikedFoods);
      
              return updatedLikedFoods;
            } else {
              // If the recipe is not liked, like it
              const updatedLikedFoods = [...prevLikedFoods, id];
      
              // Make a POST request to the API route to update liked foods
              updateLikedFoodsInAPI(updatedLikedFoods);
      
              return updatedLikedFoods;
            }
          });
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
    
      
      const updateLikedFoodsInAPI = async (updatedLikedFoods) => {
        try {
          // Make a POST request to the API route to update liked foods
          const response = await fetch('/api/users/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: session?.user.email,
              likedFoods: updatedLikedFoods,
            }),
          });
      
          if (response.ok) {
            // The API request was successful
            console.log('Liked foods updated successfully');
          } else {
            // Handle error if the API request fails
            console.error('Failed to update liked foods');
          }
        } catch (error) {
          // Handle any network or unexpected errors
          console.error('Error:', error);
        }
      };

      // i want to separete the foods name with - like baked-onion-in-oven
      // then i want to make it lower case
      // then i want to replace the - with a space

      const linkToRecipe = name.toLowerCase().split(' ').join('-');
      

    return (
        <article className="border-2 border-white cursor-pointer shadow-xl bg-white hover:border-gray-300 transition-all duration-300 rounded-lg">
            <div className="w-[350px] h-[350px] max-w-[350px] flex items-center justify-center overflow-hidden relative">
                <Link href={`/recipes/${linkToRecipe}`} style={backgroundSettings} className="overflow-hidden w-[95%] h-[95%] hover:scale-110 transition-all duration-300 rounded-lg"></Link>
                <div className="absolute top-5 left-5" onClick={() => likeHandler(id)}>
                <Image src={`/icons/${likedFoods.includes(id) ? "star": "unliked"}.svg`} width={35} height={35} alt="Like button"/>
                </div>
                <Image src={flag} width={35} height={35} alt="Nationality of the recipe" className="absolute top-5 right-5" />
            </div>
            <Link href={`/recipes/${linkToRecipe}`} className="flex flex-col items-center justify-center gap-4">
                <div className="text-center flex flex-col items-center justify-center gap-4 py-4">
                    <h1 className="text-xl font-black max-w-[250px]">{name}</h1>
                    <p className="max-w-[250px] text-md text-gray-600 break-words">{description}</p>
                </div>
                <div className="flex flex-row items-center justify-evenly gap-4 w-full max-w-[350px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/user.svg" alt="User icon" width={25} height={25} />
                        <p className="text-sm text-gray-600">{people}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/clock.svg" alt="Clock icon" width={25} height={25} />
                        <p className="text-sm text-gray-600">{time}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/bomb.svg" alt="Difficulity icon" width={25} height={25} />
                        <p className="text-sm text-gray-600">{difficulity}</p>
                    </div>
                    </div>
            </Link>
        </article>
    );
};

export default MainPageCard;
