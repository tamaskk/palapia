import React from 'react';

const MyRecipes = ({ ownRecipes }) => {
  const deleteHandler = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this recipe?");
     
    if (confirm) {
    console.log(id)
    }
  }
  
  return (
    <div className="w-full h-auto">
      <div className='flex flex-row flex-wrap items-center justify-center'>
        {ownRecipes.map((recipe) => (
          <div key={recipe._id} className='flex flex-col items-center justify-center w-72 h-72 rounded-xl gap-5 border-2 border-white p-4 bg-gradient-to-b from-[#FFFAFA] via-white  to-[#FFFAFA] shadow-lg hover:border-gray-400 transition-all duration-300 relative'>
            <h1 className='text-sm text-gray-600 font-bold'>Click on the cart to see the recipe</h1>
            <h1 className='text-xl font-bold'>{recipe.name}</h1>
            <button onClick={() => deleteHandler(recipe._id)} className='text-white bg-red-500 w-10 h-10 text-xl font-bold rounded-full absolute -top-5 -right-5'>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
