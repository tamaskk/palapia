import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const RecipeContent = ({ recipe }) => {
    const { data: session, status } = useSession();
    const [name, setName] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('/api/users/users');
                if (!res.ok) {
                    throw new Error(`Failed to fetch user data: ${res.status}`);
                }

                const data = await res.json();
                const user = data.users.find(user => user.email === session.user.email);
                if (user) {
                    const { firstName, lastName } = user;
                    setName(`${firstName} ${lastName}`);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                // Handle the error as needed
            }
        };

        fetchData();
    }, [session, setName]);


    return (
        <div className="w-full h-full lg:max-w-[90%] xl:max-w-[95%] flex flex-col items-center justify-between gap-4 mt-2 px-5">
            <div className='max-w-[800px] mt-16'>
                <Image src={recipe.image} layout='responsive' width={800} height={800} alt="Recipe image" className='rounded-lg' />
            </div>
            <h1 className='text-6xl font-bold text-center'>{recipe.name}
                <span className='text-4xl font-normal'> by {name}</span>
            </h1>
            <p className='text-xl text-gray-500 mb-2 text-center'>{recipe.description}</p>
            <Image src={recipe.flag} width={48} height={48} alt="Flag of the recipe" />
            <div className='flex flex-row items-start justify-center gap-10 mb-10'>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p className='text-lg'>Portions</p>
                    <Image src='/icons/user.svg' alt="User icon" width={25} height={25} />
                    <p className='text-lg text-gray-600'>{recipe.peoples}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p className='text-lg'>Time to make it</p>
                    <Image src='/icons/clock.svg' alt="Clock icon" width={25} height={25} />
                    <p className='text-lg text-gray-600'>{recipe.time}</p>
                </div>
                <div className='flex flex-col items-center justify-center gap-4'>
                    <p className='text-lg'>Difficulity</p>
                    <Image src='/icons/bomb.svg' alt='Difficulity icon' width={25} height={25} />
                    <p className='text-lg text-gray-600'>{recipe.difficulty}</p>
                </div>
            </div>
            <div className='flex flex-col items-center lg:items-start justify-center gap-14 lg:gap-0 lg:flex-row w-full'>
                <div className='flex flex-col items-center justify-start gap-10 w-full lg:w-1/2'>
                    <h1 className='text-3xl font-bold'>Ingredients</h1>
                    <ul className='list-disc list-inside gap-5'>
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index} className={`text-lg mb-3 p-4 rounded-lg ${index % 2 !== 0 ? "bg-white" : ""}`}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex flex-col items-center justify-start gap-10 w-full lg:w-1/2'>
                    <h1 className='text-3xl font-bold'>Steps</h1>
                    <ul className='list-decimal list-inside '>
                        {recipe.steps.map((step, index) => (
                            <li key={index} className={`text-lg mb-3 p-4 rounded-lg ${index % 2 !== 0 ? "bg-white" : ""}`}>{step}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export default RecipeContent
