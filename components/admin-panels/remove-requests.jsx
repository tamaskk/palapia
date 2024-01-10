import React, { useEffect, useState } from 'react'
import { useMainContext } from '../../lib/maincontext'
import { useSession } from 'next-auth/react';

const RemoveRequests = () => {
    const { data: session, status } = useSession();

    const { loading, allRemoveRequests } = useMainContext();

    const removeItem = async (id) => {
        try {
            const response = await fetch('/api/recipes/removeFromAdmin', {
                method: 'DELETE',
                body: JSON.stringify({ id: id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
    
            if (!response.ok) {
                alert('Failed to decline the recipe. Please try again later.')
                return
            }
        } catch (error) {
            console.error('Failed to remove recipe:', error);
            alert('Failed to remove recipe. Please try again later.');
        }
    }

  return (
    <div className='w-full h-full items-center justify-center p-4'>
        {loading && <h1>Loading...</h1>}
        <div className='grid grid-cols-1 bg-white rounded-md shadow-lg overflow-y-auto'>
        <div className='flex flex-row items-center justify-between p-4'>
            <h1 className='font-semibold'>Recipe name</h1>
            <p className='font-semibold'>Owner s email</p>
            <button disabled className='bg-red-600 text-white rounded-md p-2'>Delete</button>
            </div>
        {allRemoveRequests.length > 0 ? allRemoveRequests.map((request, index) => (
            <div key={request._id} className={`flex flex-row items-center justify-between p-4 ${index % 2 === 0 && "bg-gray-200"} `}>
            <h1 className='font-semibold'>{request.name}</h1>
            <p className='font-semibold'>{request.email}</p>
            <button className='bg-red-600 text-white rounded-md p-2' onClick={() => removeItem(request.id)}>Delete</button>
            </div>
        )) : <div className='text-6xl w-full text-center font-bold p-4'>
        No recipe to remove
    </div>}
        </div>
    </div>
  )
}

export default RemoveRequests