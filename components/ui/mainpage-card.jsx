import React from 'react';
import { Card, CardContent, Typography, Box, Grid, Avatar } from '@mui/material';
import Image from 'next/image';

const MainPageCard = ({ name, description, flag, people, time, difficulity, picture }) => {
    const backgroundSettings = {
        backgroundImage: `url("${picture}")`,  // Background image URL
        backgroundPosition: 'center center',  // Background position (e.g., 'center center')
        backgroundRepeat: 'no-repeat',       // Background repeat (e.g., 'repeat', 'no-repeat')
        backgroundSize: 'cover',             // Background size (e.g., 'cover', 'contain')
    };

    return (
        <article className="border-2 border-white max-w-[350px] cursor-pointer shadow-xl bg-white hover:border-gray-300 transition-all duration-300 rounded-lg">
            <div className="w-[350px] h-[350px] overflow-hidden relative">
                <div style={backgroundSettings} className="w-full h-full hover:scale-110 transition-all duration-300"></div>
                <Image src="/icons/star.svg" width={35} height={35} className="absolute top-5 left-5" />
                <Image src="https://flagicons.lipis.dev/flags/4x3/br.svg" width={35} height={35} className="absolute top-5 right-5" />
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="text-center flex flex-col items-center justify-center gap-4 py-4">
                    <h1 className="text-xl font-black max-w-[250px]">{name}</h1>
                    <p className="max-w-[250px] text-md text-gray-600 break-words">{description}</p>
                </div>
                <div className="flex flex-row items-center justify-evenly gap-4 w-full max-w-[350px]">
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/user.svg" width={25} height={25} />
                        <p className="text-sm text-gray-600">{people}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/clock.svg" width={25} height={25} />
                        <p className="text-sm text-gray-600">{time}</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2">
                        <Image src="/icons/bomb.svg" width={25} height={25} />
                        <p className="text-sm text-gray-600">{difficulity}</p>
                    </div>
                    </div>
            </div>
        </article>
    );
};

export default MainPageCard;
