import Image from 'next/image';
import React from 'react';

const MainPageCard = () => {
    return (
        <div className='w-auto h-auto border-white border-2 flex-shrink hover:border-gray-300 rounded-lg transition-all flex flex-col lg:flex-row cursor-pointer duration-300 bg-white'>
            <div className='max-w-full max-h-full lg:max-w-[300px] lg:max-h-[300px] overflow-hidden'>
                <Image src='https://images.unsplash.com/photo-1481070555726-e2fe8357725c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='food' width={200} height={200} className='w-full h-full lg:w-[200px] lg:h-[200px] object-cover rounded-lg hover:scale-110 transition-all duration-300' />
            </div>
            <div className='flex flex-col lg:flex-row items-center justify-center p-4 h-auto'>
                <div className='flex flex-col items-center justify-between gap-4 lg:gap-8 mb-5 lg:mb-0'>
                    <h1 className='text-xl lg:text-2xl font-bold'>Hamburger</h1>
                    <p className='text-sm lg:text-lg text-gray-600 text-center' style={{ wordWrap: 'break-word', maxWidth: '200px' }}>
                        Extremly delicious hamburger with cheese and bacon
                    </p>
                </div>
                <div className='flex flex-row lg:flex-col items-center lg:items-start justify-center gap-4 pb-3 lg:pb-0'>
                    <Image src="https://flagicons.lipis.dev/flags/4x3/br.svg" alt="Brazil" width={50} height={50} />
                    <div className='flex flex-row items-center justify-center gap-2 lg:gap-3'>
                        <Image src="/icons/user.svg" alt="User" width={18} height={18} />
                        <p className='text-md lg:text-xl text-bold'>2</p>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-2 lg:gap-3'>
                        <Image src="/icons/clock.svg" alt="Clock" width={18} height={18} />
                        <p className='text-md min-w-fit lg:text-xl text-bold'>1h 30m</p>
                    </div>
                    <div className='flex flex-row items-center justify-center gap-2 lg:gap-3'>
                        <Image src="/icons/bomb.svg" alt="Diff" width={18} height={18} />
                        <p className='text-md lg:text-xl text-bold'>SEasy</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPageCard;
