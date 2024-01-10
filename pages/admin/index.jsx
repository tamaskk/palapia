import React, { useState, useEffect } from 'react';
import AdminMenu from '../../components/admin-menu/admin-menu';
import { useSession } from 'next-auth/react';
import AllRecipe from '../../components/admin-panels/allRecipe';
import { useMainContext } from '../../lib/maincontext';
import ApproveRecipes from '../../components/admin-panels/approveRecipes';
import Link from 'next/link';
import RemoveRequests from '../../components/admin-panels/remove-requests';
import AllUsers from '../../components/admin-panels/allUsers';
import Messages from '../../components/admin-panels/messages';

const Login = () => {
  const { data: session, status } = useSession();
  const [allRecipes, setAllRecipes] = useState([]);
  const { choosenMenu } = useMainContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/recipes/allRecipe', {
          method: 'POST',
          body: JSON.stringify({ email: session?.user.email }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (response.ok) {
          setAllRecipes(data);
          console.log(data);
        } else {
          console.log('Error fetching recipes');
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchData();
  }, [session]);

  return (
    <div className='absolute top-0 right-0 left-0 w-screen h-screen max-h-screen flex flex-col items-start justify-start overflow-hidden overflow-y-hidden'>
      <div className='w-screen h-24 bg-black flex flex-row items-center justify-around'>
        <Link href="/" className="text-5xl font-bold text-white">Palapia</Link>
        <h1 className="text-5xl font-bold text-white">Admin</h1>
      </div>
      <div className='w-full h-full flex flex-row items-start justify-start overflow-hidden'>
        <AdminMenu allRecipes={allRecipes} />
        {choosenMenu === "All Recipe" && <AllRecipe allRecipe={allRecipes} />}
        {choosenMenu === "Approve Recipes" && <ApproveRecipes allRecipe={allRecipes} />}
        {choosenMenu === "Remove Request" && <RemoveRequests />}
        {choosenMenu === "All Users" && <AllUsers />}
        {choosenMenu === "Messages" && <Messages />}
      </div>
    </div>
  );
};

export default Login;
