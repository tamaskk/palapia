import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useMainContext } from '@/lib/maincontext';
import Popup from '@/components/popup/popup';

const MyRecipes = ({ loading, ownRecipes }) => {
  const { data: session, status } = useSession();
  const {setRequestError, setRequestStatus, requestError, requestStatus} = useMainContext();

  const deleteHandler = async (id) => {
    const confirm = window.confirm('Are you sure to delete this recipe?');
    if (!confirm) {
      return;
    }

    try {
      const response = await fetch('/api/recipes/deleteRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, email: session?.user.email }),
      });

      if (!response.ok) {
        setRequestError('Already sended to delete request!');
        setRequestStatus('error');
        throw new Error('Failed to delete recipe');
      }

      const data = await response.json();
      setRequestError(data.message);
      setRequestStatus('success');

    } catch (error) {
      setRequestError('Already sended to delete request!');
      setRequestStatus('error');
    }

  }



  if (loading) {
    return (
      <div className="w-full h-auto">
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-auto">
      {requestError && requestStatus && <Popup message={requestError} status={requestStatus} />  }
      <div className='flex flex-row flex-wrap items-center justify-center'>
        {ownRecipes.map((recipe) => (
          <div key={recipe._id} className='flex flex-col items-center justify-center w-72 h-72 rounded-xl gap-5 border-2 border-white p-4 bg-gradient-to-b from-[#FFFAFA] via-white  to-[#FFFAFA] shadow-lg hover:border-gray-400 transition-all duration-300 relative'>
            <h1 className='text-sm text-gray-600 font-bold'>Click on the cart to see the recipe</h1>
            <h1 className='text-xl font-bold'>{recipe.name}</h1>
            <Link href={`/recipes/${recipe.name.replace(/\s+/g, '-').toLowerCase()}`} className='border border-gray-400 p-2 rounded-lg'>Open the recipe</Link>
            <button onClick={() => deleteHandler(recipe._id)} className='text-white bg-red-500 w-10 h-10 text-xl font-bold rounded-full absolute -top-5 -right-5'>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyRecipes;
