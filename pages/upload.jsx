import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import UploadForm from "../components/upload/upload-form";
import { useMainContext } from '@/lib/maincontext'

function Upload() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  
  const { setRequestError, setRequestStatus } = useMainContext();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
          setIsLoading(false);
        } else {
          router.replace("/auth");
          setTimeout(() => {
              setRequestError("You must be logged in to upload recipes.");
              setRequestStatus("error");
          }, 1000);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <UploadForm />;
}

export default Upload;
