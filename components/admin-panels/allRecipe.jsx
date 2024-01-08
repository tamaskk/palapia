import Link from 'next/link';
import React from 'react';

const AllRecipe = ({ allRecipe }) => {

    const deleteHandler = async (id) => {
        alert(id)
    }

  return (
    <div className='w-full h-full flex flex-row items-start justify-center'>
      <div className='grid grid-cols-4 w-full h-full gap-4 overflow-y-auto overflow-x-hidden p-4'>
        {allRecipe.recipes?.map((recipe, index) => (
          <div key={index} className='relative flex flex-col items-center justify-center gap-3 border-2 border-black rounded-lg text-xl font-bold '>
            <h1>{recipe.name}</h1>
            <h1>{recipe.userEmail}</h1>
            <h1>{recipe.nationality}</h1>
            <h1>{recipe.type}</h1>
            <h1 className={`${recipe.isApproved === true ? "text-green-600" : "text-red-600"}`}>{recipe.isApproved === true ? "Approved" : "Not Approved"}</h1>
            <Link className='p-2 border border-black' href={`/recipes/${recipe.name.replace(/\s+/g, '-').toLowerCase()}`}>To the recipe</Link>
            <button onClick={() => deleteHandler(recipe._id)} className='absolute top-2 right-2 rounded-lg text-red-600 p-2 border border-red-600 font-bold'>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRecipe;
