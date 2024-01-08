import React from 'react';
import { useMainContext } from '../../lib/maincontext';

const AllUsers = () => {
    const { allUsers } = useMainContext();

    return (
        <div className='w-full h-full p-4 max-h-screen overflow-y-auto overflow-x-hidden relative'>
            <div className='grid grid-cols-1 gap-2 overflow-y-auto'>
            <div className='flex text-center w-full max-w-full flex-row items-center text-sm justify-between p-4 bg-white rounded-md shadow-lg'>
                <p className='w-1/6'>First and Lastname</p>
                <p className='w-1/6'>Nationality</p>
                <p className='w-1/6'>Numbers of liked recipe</p>
                <p className='w-1/6'>Numbers of own recipe</p>
                <p className='w-1/6'>Date of Register</p>
                <p className='w-1/6'>Email address</p>
            </div>
                {allUsers.map(({ id, firstName, secondName, email, nationality, likedFoods, ownFoods, dateOfRegister }) => (
                    <div key={id} className='flex text-center flex-row items-center text-sm justify-between p-4 bg-white rounded-md shadow-lg'>
                        <p className='w-1/6'>{firstName} {secondName}</p>
                        <p className='w-1/6'>{nationality}</p>
                        <p className='w-1/6'>{likedFoods?.length}</p>
                        <p className='w-1/6'>{ownFoods?.length}</p>
                        <p className='w-1/6'>{dateOfRegister}</p>
                        <p className='w-1/6'>{email}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllUsers;
