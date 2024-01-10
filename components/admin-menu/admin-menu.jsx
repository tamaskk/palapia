import React, { useState } from 'react'
import { useMainContext } from '../../lib/maincontext'

const AdminMenu = ({ allRecipes }) => {
    const { choosenMenu, setChoosenMenu, allRemoveRequests, allUsers, messages } = useMainContext()


    
    return (
        <div className='bg-gray-400 h-full w-72 min-w-72'>
            <ul className='w-full h-full'>
                <li onClick={() => setChoosenMenu("Dashboard")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Dashboard" ? "bg-yellow-400" : ""} `}>
                    Dashboard
                </li>
                <li onClick={() => setChoosenMenu("All Recipe")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "All Recipe" ? "bg-yellow-400" : ""} `}>
                    All Recipe <span className="text-sm font-bold text-white bg-green-500 rounded-full w-6 h-6 flex flex-row items-center justify-center">{allRecipes.recipes?.length}</span>
                </li>
                <li onClick={() => setChoosenMenu("Approve Recipes")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Approve Recipes" ? "bg-yellow-400" : ""} `}>
                    Approve Recipes <span className="text-sm font-bold text-white bg-red-600 rounded-full w-6 h-6 flex flex-row items-center justify-center">{allRecipes.recipes?.filter((recipe) => recipe.isApproved === false).length}</span>
                </li>
                <li onClick={() => setChoosenMenu("Remove Request")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Remove Request" ? "bg-yellow-400" : ""} `}>
                    Remove Request <span className="text-sm font-bold text-white bg-red-600 rounded-full w-6 h-6 flex flex-row items-center justify-center">{allRemoveRequests?.length}</span>
                </li>
                <li onClick={() => setChoosenMenu("All Users")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "All Users" ? "bg-yellow-400" : ""} `}>
                    All Users <span className="text-sm font-bold text-white bg-green-600 rounded-full w-6 h-6 flex flex-row items-center justify-center">{allUsers?.length}</span>
                </li>
                <li onClick={() => setChoosenMenu("Messages")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center gap-2 cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Messages" ? "bg-yellow-400" : ""} `}>
                    Messages <span className="text-sm font-bold text-white bg-red-600 rounded-full w-6 h-6 flex flex-row items-center justify-center">{messages?.filter(message => message.answered === false).length}</span>
                </li>
                <li onClick={() => setChoosenMenu("Lorem")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Lorem" ? "bg-yellow-400" : ""} `}>
                    Lorem
                </li>
                <li onClick={() => setChoosenMenu("Lorem")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Lorem" ? "bg-yellow-400" : ""} `}>
                    Lorem
                </li>
                <li onClick={() => setChoosenMenu("Lorem")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Lorem" ? "bg-yellow-400" : ""} `}>
                    Lorem
                </li>
                <li onClick={() => setChoosenMenu("Lorem")} className={`w-full h-[10%] border border-black text-2xl font-bold flex flex-row items-center justify-center cursor-pointer hover:bg-white transition-all duration-300 ${choosenMenu === "Lorem" ? "bg-yellow-400" : ""} `}>
                    Lorem
                </li>
            </ul>
        </div>
    )
}


export default AdminMenu