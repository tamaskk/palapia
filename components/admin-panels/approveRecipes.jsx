import Image from 'next/image'
import emailjs from 'emailjs-com';
import React, { useEffect, useState } from 'react'

const ApproveRecipes = ({ allRecipe }) => {
    const [openPanel, setOpenPanel] = useState(false)
    const [checkingRecipe, setCheckingRecipe] = useState({})

    useEffect(() => {
        console.log(checkingRecipe)
    }, [checkingRecipe])

    const panelHandler = () => {
        setOpenPanel(!openPanel)
    }

    const approveHandler = async (id, email) => {

        const responseForApprove = await fetch('/api/recipes/approveRecipe', {
            method: 'PATCH',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!responseForApprove.ok) {
            alert('Failed to approve the recipe. Please try again later.')
            return
        }

        const response = await fetch('/api/recipes/allRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const recipes = await response.json()
        const recipe = recipes.recipes?.filter((recipe) => recipe._id === id)[0].name
        const link = `https://palapia.vercel.app/recipes/${recipe?.replace(/\s+/g, '-').toLowerCase()}`;
        try {
            const templateParams = {
                to_email: email,
                link: link
            };

            const response = await emailjs.send(
                'service_ld2kgsl',
                'template_uklelpn',
                templateParams,
                'm7KF6JVhAXeRyhv8J'
            );

            console.log('Email sent successfully:', response);
            alert('Successfully approved the recipe!');
        } catch (error) {
            console.error('Failed to approve the recipe:', error.message);
            alert('Failed to approve the recipe. Please try again later.');
        }
    };


    const declineHandler = async (id, email) => {
        const extraInfo = prompt("Please enter the reason for declining the recipe:", "It's not good enough")

        const responseForDecline = await fetch('/api/recipes/removeFromAdmin', {
            method: 'DELETE',
            body: JSON.stringify({ id: id }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (!responseForDecline.ok) {
            alert('Failed to decline the recipe. Please try again later.')
            return
        }

        alert(extraInfo)
    }

    const checkHandler = async (id) => {
        const response = await fetch('/api/recipes/allRecipe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const recipes = await response.json()
        const recipe = recipes.recipes?.filter((recipe) => recipe._id === id)
        setCheckingRecipe(recipe[0])
        panelHandler()
    }

    if (allRecipe.recipes.length === 0) {
        return (
            <div className='text-6xl w-full text-center font-bold'>
                No recipe to approve
            </div>
        )
    }

    return (
        <div className='w-full h-full flex flex-row items-start justify-center relative'>
            {
                openPanel &&
                <div className='w-[95%] h-[95%] text-xl font-semibold absolute flex flex-col items-center justify-start p-4 gap-4 bg-white left-[2.5%] top-[2.5%] right-[2.5%] border-2 border-black z-[9999] overflow-x-hidden overflow-y-auto'>
                    <div onClick={panelHandler} className='cursor-pointer text-3xl font-black text-red-600 absolute top-5 right-5 gap-10'>X</div>
                    <h1>Name: {checkingRecipe?.name}</h1>
                    <h1>Description: {checkingRecipe?.description}</h1>
                    <h1>Nationality: {checkingRecipe?.nationality}</h1>
                    <h1>Type: {checkingRecipe?.type}</h1>
                    <h1>Time: {checkingRecipe?.time}</h1>
                    <h1>User email: {checkingRecipe?.userEmail}</h1>
                    <h1>Peoples: {checkingRecipe?.peoples}</h1>
                    <Image src={checkingRecipe?.image} width={300} height={300} />
                    <h1>Ingredients:</h1>
                    <ul>
                        {checkingRecipe?.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <h1>Steps:</h1>
                    <ul>
                        {checkingRecipe?.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ul>
                </div>
            }
            <div className='grid grid-cols-4 w-full h-full gap-4 overflow-y-auto overflow-x-hidden p-4'>
                {allRecipe.recipes.filter((recipe) => recipe.isApproved === false).length > 0 ? allRecipe.recipes.filter((recipe) => recipe.isApproved === false).map((recipe, index) => (
                    <div key={index} className='relative flex flex-col items-center justify-center gap-3 border-2 border-black rounded-lg text-xl font-bold '>
                        <h1>{recipe.name}</h1>
                        <h1>{recipe.userEmail}</h1>
                        <h1>{recipe.nationality}</h1>
                        <h1>{recipe.type}</h1>
                        <h1 className={`${recipe.isApproved === true ? "text-green-600" : "text-red-600"}`}>{recipe.isApproved === true ? "Approved" : "Not Approved"}</h1>
                        <div className='flex flex-row items-center justify-center gap-4'>
                            <button onClick={() => approveHandler(recipe._id, recipe.userEmail)} className='font-bold text-xl text-green-600 border-2 border-green-600 p-1 rounded-md hover:text-white hover:bg-green-600 transition-all duration-300'>Approve</button>
                            <button onClick={() => checkHandler(recipe._id)} className='font-bold text-xl text-yellow-600 border-2 border-yellow-600 p-1 rounded-md hover:text-white hover:bg-yellow-600 transition-all duration-300'>Check</button>
                            <button onClick={() => declineHandler(recipe._id, recipe.userEmail)} className='font-bold text-xl text-red-600 border-2 border-red-600 p-1 rounded-md hover:text-white hover:bg-red-600 transition-all duration-300'>Decline</button>

                        </div>
                    </div>
                )) : <div className='text-6xl w-full text-center font-bold'>
                    No recipe to approve
                </div>}
            </div>
        </div>
    )
}

export default ApproveRecipes