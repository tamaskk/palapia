import Image from "next/image";
import Link from "next/link";
import React from "react";

const LoginForm = () => {
  return (
    <article className="w-screen h-screen overflow-hidden">
      <div className="max-w-[1200px] h-full mx-auto flex flex-row items-center justify-center gap-10">
        <div className="flex flex-col items-center justify-center gap-10">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={500}
            height={500}
            layout="fixed"
          />
          <div className="flex flex-row items-center justify-center gap-8 px-4 py-14 border border-red-400">
            <div className="w-24 h-24 bg-black"></div>
            <div className="w-24 h-24 bg-black"></div>
            <div className="w-24 h-24 bg-black"></div>
            <div className="w-24 h-24 bg-black"></div>
          </div>
        </div>
        <div>
          <form>
            <div>
              <div>
                <label>Email address</label>
                <input type="email" />
              </div>
              <div>
                <label>Password</label>
                <input type="password" />
              </div>
            </div>
            <div>
              <Link href="">Don't have account? Create one</Link>
              <div></div>
            </div>
          </form>
        </div>
      </div>
    </article>
  );
};

export default LoginForm;
