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
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session, status } = useSession();
  const [allRecipes, setAllRecipes] = useState([]);
  const { choosenMenu, setRequestError, setRequestStatus } = useMainContext();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/users');

        if (!response.ok) {
          // Handle non-successful response (e.g., server error)
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const users = await response.json();

        // Check if the user is an admin
        const isAdmin = users.users.find(user => user.email === session.user?.email)?.isAdmin;

        if (!isAdmin) {
          // Redirect to the homepage with an error message
          router.replace('/');
          setRequestError('You don\'t have access to the admin page.');
          setRequestStatus('error');
        } else {
          // Set the status to success if the user is an admin
          setRequestStatus('success');
        }
      } catch (error) {
        console.error(error);
        // Handle other errors here, e.g., network issues
        setRequestError('An error occurred while fetching data.');
        setRequestStatus('error');
      }
    };

    fetchData();
  }, [session, router]);

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
      {
        session?.user?.email ?
        <>
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
        </>
        :
        <div>Loading...</div>
      }
    </div>
  );
};

export default Login;
