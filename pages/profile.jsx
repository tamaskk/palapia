import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMainContext } from "@/lib/maincontext";
import UserProfile from "../components/profile/user-profile";

function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { setRequestStatus, setRequestError } = useMainContext();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        setIsLoading(false);
      } else {
        router.replace("/auth");
        setRequestError('You must be signed in to see your profile.');
        setRequestStatus('error');
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <UserProfile />;
}

export default ProfilePage;
