// import { signIn } from 'next-auth/react';
// import React, { useState } from 'react'
// import { useMainContext } from '../../lib/maincontext';
// useMainContext

// const login = () => {
//     const [email, setEmail] = useState()
//     const [password, setPassword] = useState();

//     const { setRequestError, setRequestStatus, setLoggedInToAdmin, isAdmin } = useMainContext();




//     return (
//         <div className='h-screen w-screen min-h-screen px-5 bg-cover bg-center bg-no-repeat bg-opacity-60 filter inset-0 flex justify-center items-center font-basic' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D` }}>
//             <div className='w-screen md:w-1/2 h-auto bg-slate-700 bg-opacity-90 flex flex-col justify-center items-center rounded-lg'>
//                 <div className='mt-5 mb-20'>
//                     <div className='w-24 h-24 rounded-full bg-white'></div>
//                 </div>
//                 <h1 className='text-2xl text-white mb-5'>Email cím</h1>
//                 <input type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Email címed' className='px-4 py-2 rounded-lg focus:outline-none bg-transparent text-white border border-white text-center mb-16' />
//                 <h1 className='text-2xl text-white mb-5'>Jelszó</h1>
//                 <input type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Jelszavad' className='px-4 py-2 rounded-lg focus:outline-none bg-transparent text-white border border-white text-center mb-16' />
//                 <button onClick={loginHandler} className='px-4 py-2 bg-green-400 text-black border border-green-400 hover:bg-transparent hover:text-white transition-all duration-200 rounded-lg mb-14'>
//                     Bejelentkezés
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default login