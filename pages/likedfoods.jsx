import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import LikedFoodsPage from "../components/liked-foods/liked-foods";
import { useMainContext } from "@/lib/maincontext";

function LikedFoods() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const { setRequestStatus, setRequestError } = useMainContext();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
          setIsLoading(false);
    } else {
        router.replace("/auth");
        setRequestError('You must be signed in to to see your liked recipes.')
        setRequestStatus('error');
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <LikedFoodsPage />;
}

export default LikedFoods;
