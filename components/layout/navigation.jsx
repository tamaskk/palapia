"use client";
import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Navigation = () => {
  const [navOpened, setNavOpened] = useState(false);
  const { data: session, status } = useSession();

  const navToggle = () => {
    setNavOpened(!navOpened);
  }

  function logoutHandler() {
    signOut();
    navToggle();
  }

  return (
    <>
      <nav className="hidden lg:block sticky max-w-screen overflow-x-hidden right-0 bg-[#ffffff] h-auto w-screen rounded-b-xl px-10 ">
        <div className="lg:max-w-full xl:max-w-[1200px] mx-auto flex flex-row items-center justify-between py-4">
          <Link href="/" className="text-orange-800 text-5xl font-black font-primary">Palapia</Link>
          <ul className="flex flex-row items-center justify-center gap-10">
            <li
              className={`font-bold text-xl cursor-pointer`}
            >
              <Link href="/upload">
                <Image src="/icons/upload.svg" alt="star" width={24} height={24} className="hover:scale:105 transition-all duration-300" />
              </Link>
            </li>
            <li className={`font-bold text-xl cursor-pointer`}>
              <Image src="/icons/star.svg" alt="star" width={24} height={24} />
            </li>
            <li
              className={`flex flex-col items-center justify-center gap-1 font-bold text-xl cursor-pointer group`}
            >
              <div className="flex flex-row items-center justify-center gap-1">
                {
                  status === "authenticated" ?
                    <h1 onClick={logoutHandler}>Logout</h1>
                    :
                    <Link href="/auth">Sign In / Log In</Link>
                }

                <Image
                  src="/icons/caret-down.svg"
                  alt="caret-down"
                  width={12}
                  height={12}
                />
              </div>
              <div className="w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300"></div>
            </li>
          </ul>
        </div>
      </nav>
      <div className="fixed lg:hidden top-5 right-5 z-[9999] flex flex-col gap-1" onClick={navToggle}>
        <div className="w-7 h-1 bg-black"></div>
        <div className="w-7 h-1 bg-black"></div>
        <div className="w-7 h-1 bg-black"></div>
      </div>
      <nav className={`lg:hidden w-screen h-screen fixed z-[9998] max-w-screen flex flex-col items-center justify-center gap-5 overflow-x-hidden right-0 bg-[#ffffff] rounded-b-xl px-10 ${navOpened ? "translate-x-0" : "translate-x-[2000px]"} transition-all duration-300 `}>
        <Link href="/" onClick={navToggle} className="text-orange-800 text-5xl font-black font-primary mb-16">Palapia</Link>
        <Link href="/upload" onClick={navToggle}>
          <Image src="/icons/upload.svg" alt="star" width={24} height={24} className="hover:scale:105 transition-all duration-300" />
        </Link>
        <Image onClick={navToggle} src="/icons/star.svg" alt="star" width={24} height={24} />
        <div className="flex flex-row items-center justify-center gap-1 font-bold text-xl">
          {
            status === "authenticated" ?
            <h1 onClick={logoutHandler}>Logout</h1>
              :
              <Link onClick={navToggle} href="/auth">Sign In / Log In</Link>
          }

          <Image
            src="/icons/caret-down.svg"
            alt="caret-down"
            width={12}
            height={12}
          />
        </div>
      </nav>
    </>
  );
};

export default Navigation;
