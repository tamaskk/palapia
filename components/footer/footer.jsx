import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <div className='bg-gray-800 flex flex-col lg:flex-row gap-y-5 items-center justify-between text-center lg:text-left h-auto w-screen py-10 px-20'>
            <div className='flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-start gap-16'>
                <h1 className='text-5xl font-black text-white'>Palapia</h1>
                <div className='flex flex-col items-start justify-center text-white font-semibold gap-2'>
                    <Link href='/privacy-policy' className='hover:text-gray-600 transition-all duration-300'>Privacy Policy</Link>
                    <Link href='/terms-and-conditions' className='hover:text-gray-600 transition-all duration-300'>Terms of Service</Link>
                </div>
            </div>
            <div className='flex flex-col items-center lg:items-end justify-center gap-2'>
                <p className='text-white font-semibold'>Made with ❤️ in Hungary</p>
                <p className='text-white font-semibold'>Do you have any idea for feature or do you see any bug?</p>
                <Link href="/contact" className='text-white font-semibold border-b-2 border-gray-200'>Contact Us</Link>
            </div>
        </div>
    )
}

export default Footer