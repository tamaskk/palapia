import React from 'react'

const PersonalInformation = ({ loading, user }) => {
  console.log(user?.dateOfRegister)

  const getDate = user?.dateOfRegister

  const date = new Date(getDate);

const year = date.getFullYear();
const month = date.getMonth() + 1; // Month is zero-based, so we add 1
const day = date.getDate();

const formattedDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;

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
        <div className='grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-10 lg:gap-0'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">First Name</h1>
          <p>{user?.firstName}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">Last Name</h1>
          <p>{user?.lastName}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">Your email address</h1>
          <p>{user?.email}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">Nationality</h1>
          <p>{user?.nationality}</p>
        </div>
        <div className='flex flex-col items-center justify-center'>
          <h1 className="text-2xl font-bold">Date of register</h1>
          <p>{formattedDate}</p>
        </div>
        </div>
    </div>
  )
}

export default PersonalInformation